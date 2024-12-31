"use client";
import BloodBankDetails from "@/components/BloodBankDetails";
import { useState, useEffect } from "react";
import { Map, NavigationControl, Marker, Popup } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css"; // Import MapLibre GL CSS

const TestApiPage = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/bloodBank"); // Replace with your API
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setData(json.data);
      } catch (err: any) {
        setError(err.message || "Error occurred while fetching data.");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_MAP_API_KEY; // MapTiler API key from environment variables

    // Initialize the map
    const map = new Map({
      container: "map", // Map container ID
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${apiKey}`, // MapTiler style URL
      center: [0, 0], // Default center (longitude, latitude)
      zoom: 2, // Default zoom level
    });

    map.addControl(new NavigationControl(), "top-right");

    // Geolocate the user and recenter the map
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.setCenter([longitude, latitude]); // Recenter the map on the user's location
          map.setZoom(12); // Zoom level for town-level view
        },
        (error) => {
          console.error("Error fetching location:", error.message);
        },
        { enableHighAccuracy: true } // Options for better accuracy
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    // Add markers for blood banks
    if (data && Array.isArray(data)) {
      data.forEach((bloodBank: any) => {
        const { latitude, longitude, name, address, contact } = bloodBank;

        // Create a marker
        const marker = new Marker({ color: "red" })
          .setLngLat([longitude, latitude])
          .addTo(map);

        // Create a popup
        const popup = new Popup({ offset: 25 })
          .setHTML(`
            <div>
              <h3 class="font-bold text-lg">${name}</h3>
              <p class="text-sm">${address}</p>
              <p class="text-sm font-medium">Contact: ${contact}</p>
            </div>
          `);

        // Show popup on hover
        marker.getElement().addEventListener("mouseenter", () => {
          popup.addTo(map).setLngLat([longitude, latitude]);
        });

        // Hide popup when not hovering
        marker.getElement().addEventListener("mouseleave", () => {
          popup.remove();
        });
      });
    }

    return () => {
      map.remove();
    };
  }, [data]);

  return (
    <div className="flex flex-col p-6 h-screen">
      <div className="flex flex-grow flex-col md:flex-row">
        {/* 2/3 Section - Map */}
        <div className="w-full md:w-3/5 bg-white p-6 overflow-y-auto mb-6 md:mb-0">
          <h1 className="text-3xl font-bold text-center mb-6">Blood Bank Location Map</h1>
          <div
            id="map"
            className="h-96 md:h-full bg-gray-300 rounded-lg" // Map container with responsive height
          ></div>
        </div>

        {/* 1/3 Section - Blood Bank Details */}
        <div className="w-full md:w-2/5 bg-gray-100 p-4 overflow-y-auto">
          {error && <p className="text-red-500">Error: {error}</p>}

          {!error && !data && <p>Loading data...</p>}

          {data && (
            <div>
              {/* Check if data is an array and display individual blood bank details */}
              {Array.isArray(data) ? (
                data.map((bloodBank: any, index: number) => (
                  <BloodBankDetails
                    key={index}
                    name={bloodBank.name}
                    address={bloodBank.address}
                    contact={bloodBank.contact}
                    email={bloodBank.email}
                    A_positive={bloodBank.A_positive}
                    A_negative={bloodBank.A_negative}
                    B_positive={bloodBank.B_positive}
                    B_negative={bloodBank.B_negative}
                    AB_positive={bloodBank.AB_positive}
                    AB_negative={bloodBank.AB_negative}
                    O_positive={bloodBank.O_positive}
                    O_negative={bloodBank.O_negative}
                  />
                ))
              ) : (
                <BloodBankDetails
                  name={data.name}
                  address={data.address}
                  contact={data.contact}
                  email={data.email}
                  A_positive={data.A_positive}
                  A_negative={data.A_negative}
                  B_positive={data.B_positive}
                  B_negative={data.B_negative}
                  AB_positive={data.AB_positive}
                  AB_negative={data.AB_negative}
                  O_positive={data.O_positive}
                  O_negative={data.O_negative}
                  lastUpdated={data.lastUpdated}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestApiPage;

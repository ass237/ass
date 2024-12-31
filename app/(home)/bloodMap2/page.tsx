"use client";
import { useState, useEffect } from "react";
import BloodBankDetails from "@/components/BloodBankDetails";
import { Map, NavigationControl, Marker, Popup } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css"; // Import MapLibre GL CSS
import { getDistance } from "geolib"; // Import geolib to calculate distances
import { HiFilter } from "react-icons/hi"; // Importing an icon for the filter button
import { BloodBank } from "@prisma/client";

const TestApiPage = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [filter, setFilter] = useState<{ bloodType: string; distance: number }>({
    bloodType: "",
    distance: 50, // Default distance 50 km
  });
  const [showFilter, setShowFilter] = useState(false); // State to toggle filter window

  useEffect(() => {
    // Fetch user geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lon: longitude });
        },
        (error) => {
          console.error("Error fetching location:", error.message);
        },
        { enableHighAccuracy: true } // Options for better accuracy
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (!userLocation) return; // Wait for the user's location

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/bloodBank`);
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
  }, [userLocation]);

  useEffect(() => {
    if (!userLocation || !data) return; // Wait for the user's location and data

    // Filter blood banks based on the user's location and selected blood type
    const filteredBloodBanks = data.filter((bloodBank: any) => {
      // Filter by blood type if selected
      if (filter.bloodType && bloodBank[filter.bloodType] <= 0) {
        return false;
      }

      // Calculate the distance between the user's location and the blood bank
      const distanceToUser = getDistance(
        { latitude: userLocation.lat, longitude: userLocation.lon },
        { latitude: bloodBank.latitude, longitude: bloodBank.longitude }
      );

      // Convert the distance to kilometers
      const distanceInKm = distanceToUser / 1000;

      // Filter by the maximum distance selected
      return distanceInKm <= filter.distance;
    });

    setData(filteredBloodBanks);
  }, [filter, userLocation, data]);

  // Handle filter change
  const handleFilterChange = (type: string, value: string | number) => {
    setFilter((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_MAP_API_KEY;

    if (userLocation) {
      const map = new Map({
        container: "map", // The DOM container for the map
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${apiKey}`, // Use MapTailor tiles
        center: [userLocation.lon, userLocation.lat], // Set initial position to user's location
        zoom: 13, // Initial zoom level
      });

      map.addControl(new NavigationControl(), "top-right");

      // Add a marker for the user's location
      new Marker({ color: "blue" }) // Blue color for the user's marker
        .setLngLat([userLocation.lon, userLocation.lat])
        .setPopup(new Popup().setHTML("<h3>Your Location</h3>"))
        .addTo(map);

      // Add markers for each blood bank location
      data?.forEach((bloodBank: any) => {
        const { latitude, longitude, name } = bloodBank;
        new Marker()
          .setLngLat([longitude, latitude])
          .setPopup(new Popup().setHTML(`<h3>${name}</h3>`)) // Popup with blood bank name
          .addTo(map);
      });

      return () => map.remove(); // Cleanup the map on component unmount
    }
  }, [userLocation, data]);

  return (
    <div className="flex flex-col p-6 h-screen">
      <div className="flex flex-grow flex-col md:flex-row">
        {/* 2/3 Section - Map */}
        <div className="w-full md:w-3/5 bg-white p-6 overflow-y-auto mb-6 md:mb-0">
          <h1 className="text-3xl font-bold text-center mb-6">Blood Bank Location Map</h1>

          {/* Filter Section Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="p-2 bg-red-500 text-white rounded-full focus:outline-none"
            >
              <HiFilter className="text-white" size={24} />
            </button>
          </div>

          {/* Filter Window */}
          {showFilter && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
              onClick={() => setShowFilter(false)}
            >
              <div
                className="bg-white p-6 rounded-md w-full sm:w-96"
                onClick={(e) => e.stopPropagation()} // Prevent click from closing when interacting with the filter
              >
                <h2 className="text-lg font-bold mb-4">Filter Blood Banks</h2>

                {/* Dropdown for blood type selection */}
                <select
                  onChange={(e) => handleFilterChange("bloodType", e.target.value)}
                  value={filter.bloodType}
                  className="mt-2 p-2 border rounded w-full"
                >
                  <option value="">Select Blood Type</option>
                  <option value="A_positive">A+</option>
                  <option value="A_negative">A-</option>
                  <option value="B_positive">B+</option>
                  <option value="B_negative">B-</option>
                  <option value="O_positive">O+</option>
                  <option value="O_negative">O-</option>
                  <option value="AB_positive">AB+</option>
                  <option value="AB_negative">AB-</option>
                </select>

                {/* Slider for distance selection */}
                <div className="mt-4">
                  <label className="block text-sm font-medium">Distance (km)</label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={filter.distance}
                    onChange={(e) => handleFilterChange("distance", Number(e.target.value))}
                    className="w-full mt-2"
                  />
                  <div className="flex justify-between">
                    <span>1 km</span>
                    <span>100 km</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowFilter(false)}
                  className="mt-4 p-2 bg-red-500 text-white rounded w-full"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          <div id="map" className="h-96 md:h-full bg-gray-300 rounded-lg"></div>
        </div>

        {/* 1/3 Section - Blood Bank Details */}
        <div className="w-full md:w-2/5 bg-gray-100 p-4 overflow-y-auto">
          {error && <p className="text-red-500">Error: {error}</p>}

          {!error && !data && <p>Loading data...</p>}

          {data && (
            <div>
              {Array.isArray(data) ? (
                data.map((bloodBank: BloodBank, index: number) => (
                  <BloodBankDetails
                    key={index}
                    name={bloodBank.name}
                    address={bloodBank.address}
                    contact={bloodBank.phone}
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

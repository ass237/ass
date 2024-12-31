// Import necessary modules
import "react-calendar/dist/Calendar.css";
import Image from "next/image";
import prisma from "@/lib/prisma"; // Import the Prisma client

// EventCalendar Component
const EventCalendar = async () => {
  // Fetch up to 5 event data entries from the database
  const events = await prisma.event.findMany({
    orderBy: {
      stopDate: "asc", // Order events by stop date
    },
    take: 5, // Limit to 5 entries
  });

  return (
    <div className="bg-white p-4 rounded-lg md:h-[500px]">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold my-4">Event</h1>
        <Image src="/moreDark.png" alt="More options" width={20} height={20} />
      </div>

      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <div
            className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-[#bfdbfe] even:border-t-[#f87171]"
            key={event.id}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{event.name}</h1>
              <span className="text-gray-300 text-xs">
                {event.startDate} - {event.stopDate}
              </span>
            </div>
            <p className="mt-2 text-gray-400 line-clamp-2">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;

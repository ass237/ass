// Import necessary modules
import "react-calendar/dist/Calendar.css";
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
        <h1 className="text-xl font-semibold items-center my-4">Upcoming Event</h1>
        {/* <Image src="/moreDark.png" alt="More options" width={20} height={20} /> */}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {events.map((event) => (
          <div
            className="p-10 rounded-md border-2 min-w-[100px] border-gray-100 border-t-4 odd:border-t-[#bfdbfe] even:border-t-[#f87171]"
            key={event.id}
          >
            <div className="flex items-center gap-10 justify-between">
              <div className="font-semibold text-gray-600">{event.name}</div>
              <div className="text-gray-300 text-xs">
                {event.startDate} - {event.stopDate}
              </div>
            </div>
            <p className="mt-2 text-gray-400 line-clamp-2">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;

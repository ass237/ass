
import UserCard from "@/components/UserCard";
import DemandeSupplyChart from "@/components/DemandeSupplyChart";
import EventCalendar from "@/components/EventCalendar";

export default function Dashboard() {
  return (
    <div className="p-4 flex flex-col gap-8 md:flex-row">
      {/* Left Section */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="User" />
          <UserCard type="Donor" />
          <UserCard type="Admin" />
          <UserCard type="Bank" />
          <UserCard type="Guest" />
          <UserCard type="Requests" />
        </div>

        {/* Middle Charts */}
        {/* <div className="flex gap-4 flex-col w-full lg:w-1/3 lg:flex-row">
         
          <div className=" h-[450px]">
            <CountChart />
          </div>
          
          <div className=" h-[450px]">
            <DonorCountChart />
          </div>
        </div> */}

        {/* Bottom Charts */}
        <div className="w-full flex flex-col gap-4">
          <div className="h-[400px]">
            {/* <DemandeSupplyChart /> */}
          </div>
          {/* <div className="h-[420px]">
            <OverallChart />
          </div> */}
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <div className="h-[500px] lg:h-auto">
          <EventCalendar />
        </div>
        <div className="h-[1800px] lg:h-auto">
          {/* <Announcement />  */}
        </div>
      </div>
    </div>
  );
}

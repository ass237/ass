// import { useRouter } from "next/router";
import Image from "next/image";
import UserRequestHistory from "@/components/UserRequestHistory";
import FormModel from "@/components/FormModel";
import prisma from "@/lib/prisma";
import EventCalendar from "@/components/EventCalendar";

const SingleUserPage = async ({ params }: { params: { id: string } }) => {
  const { id: Id } = params; // Extract the Id from the query
  const user = await prisma.user.findUnique({ where: { id: Id } });
  const user1 = await prisma.bloodRequest.findMany({
    where: { email: user?.email },
    select: {
      name: true,
      email: true,
      bloodType: true,
      note: true,
      date: true,
      bloodQty: true,
      status: true,
    },
  });

  const formattedUserRequests = user1.map(request => ({
    ...request,
    date: request.date.toISOString(), // Convert the Date object to a string
    note: request.note ?? undefined, // Convert null to undefined
  }));

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* top */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* user card */}
          <div className="bg-[#e33535e3] py-6 px-6 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src={user?.image || "/default-user.png"}
                alt="user"
                width={100}
                height={100}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <FormModel
                  table={"user"}
                  type={"update"}
                  data={{
                    id: user?.id,
                    name: user?.name,
                    firstName: user?.firstname,
                    lastName: user?.lastname,
                    bio: user?.bio,
                    address: user?.address,
                    age: user?.age,
                    bloodType: user?.bloodType,
                    email: user?.email,
                    phone: user?.phone,
                  }}
                />
              </div>
              <p className="text-sm text-gray-500">{user?.bio}</p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="flex items-center gap-2">
                  <span className="font-bold">ID: </span>
                  <span>{user?.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/blood.png" alt="Blood type" width={16} height={16} />
                  <span>{user?.bloodType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/mail.png" alt="Email" width={16} height={16} />
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/phone.png" alt="Phone" width={16} height={16} />
                  <span>{user?.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* small card */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            <div className="bg-white rounded-md flex w-full gap-4 p-4 items-center">
              <Image src="/singleAttendance.png" alt="Donations" width={24} height={24} />
              <h1 className="text-xl font-semibold">{user?.numDon}</h1>
              <span className="text-sm text-gray-400">Total Donations</span>
            </div>
            <div className="bg-white rounded-md flex w-full gap-4 p-4 items-center">
              <Image src="/singleClass.png" alt="Requests" width={24} height={24} />
              <h1 className="text-xl font-semibold">{user?.numDon}</h1>
              <span className="text-sm text-gray-400">Total Requests</span>
            </div>
          </div>
        </div>

        {/* bottom sections */}
        <div className="mt-4 bg-white rounded-md p-4 h-[420px]">
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold">Blood Request Status</h1>
            <span className="text-sm text-gray-500 cursor-pointer">View All</span>
          </div>
          <UserRequestHistory data={formattedUserRequests} limit={10} />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <EventCalendar />
        </div>
      </div>
    </div>
  );
};

export default SingleUserPage;

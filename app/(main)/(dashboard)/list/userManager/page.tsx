import FormModel from "@/components/FormModel";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/setting";

// Mapping object for blood types
const bloodTypeMapping: { [key: string]: string } = {
  A_positive: "A+",
  A_negative: "A-",
  B_positive: "B+",
  B_negative: "B-",
  AB_positive: "AB+",
  AB_negative: "AB-",
  O_positive: "O+",
  O_negative: "O-",
  Unknow: "UnKnown"
};

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Role",
    accessor: "role",
    className: "hidden md:table-cell",
  },
  {
    header: "Blood type",
    accessor: "bloodType",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden md:table-cell",
  },
  {
    header: "N° Req",
    accessor: "nReq",
    className: "hidden lg:table-cell",
  },
  {
    header: "N° Don",
    accessor: "nDon",
    className: "hidden lg:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    header: "Donor Status",
    accessor: "donorStatus",
    className: "hidden md:table-cell",
  },
  {
    header: "Action",
    accessor: "action",
  },
];

const UserList = async ({ searchParams }: { searchParams: { [key: string]: string } | undefined }) => {
  const { page  } = searchParams ?? {};
  const p: number = page ? parseInt(page) : 1;

  const renderRow = (item: User) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-blue-300">
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.image || "/noAvatar.png"}
          alt="User"
          width={50}
          height={50}
          className="md:hidden lg:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semi">{item.name}</h3>
          <p className="text-sm text-gray-500">{item.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.role}</td>
      <td className="hidden md:table-cell">{bloodTypeMapping[item.bloodType] || item.bloodType}</td> {/* Blood type mapping */}
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden lg:table-cell">{item.numDon}</td>
      <td className="hidden lg:table-cell">{item.numReq}</td>
      <td className="hidden lg:table-cell">{item.address}</td>
      <td className="hidden md:table-cell">
        <span
          className={`inline-block w-3 h-3 items-center rounded-full ${
            item.donorStatus ? "bg-green-500" : "bg-red-500"
          }`}
        ></span>
      </td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/userManager/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-200">
              <Image src="/view.png" alt="View" width={15} height={15} />
            </button>
          </Link>
          
            <>
              <FormModel table={"user"} type={"update"} data={item} />
              <FormModel table={"user"} type={"delete"} id={item.id} />
            </>
         
        </div>
      </td>
    </tr>
  );

  const [data, count] = await prisma.$transaction([
    prisma.user.findMany({
      take: ITEM_PER_PAGE,
      skip: (p - 1) * ITEM_PER_PAGE,
    }),
    prisma.user.count(),
  ]);

  return (
    <div className="bg-white p-4 rounded-md m-4 mt-0">
      {/* Top Row: Title and Controls */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="hidden md:block text-lg font-semibold">User Management</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-400">
              <Image src="/filter.png" alt="Filter" width={20} height={20} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-400">
              <Image src="/sort.png" alt="Sort" width={20} height={20} />
            </button>
            <FormModel table={"user"} type={"create"} />
          </div>
        </div>
      </div>

      {/* List */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* Pagination */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default UserList;

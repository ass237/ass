import FormModel from "@/components/FormModel";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { BloodBank } from "@prisma/client";
import Image from "next/image";
import prisma from "@/lib/prisma"
import { ITEM_PER_PAGE } from "@/lib/setting";




const columns = [
  {
    header: "Info",
    accessor: "info"
  },
  {
    header: "A+",
    accessor: "A_positive",
    className: "hidden md:table-cell",
  },
  {
    header: "A-",
    accessor: "A_negative",
    className: "hidden md:table-cell",
  },
  {
    header: "B+",
    accessor: "B_positive",
    className: "hidden md:table-cell",
  },
  {
    header: "B-",
    accessor: "B_negative",
    className: "hidden md:table-cell",
  },
  {
    header: "AB+",
    accessor: "AB_positive",
    className: "hidden md:table-cell",
  },
  {
    header: "AB-",
    accessor: "AB_negative",
    className: "hidden md:table-cell",
  },
  {
    header: "O+",
    accessor: "O_positive",
    className: "hidden md:table-cell",
  },
  {
    header: "O-",
    accessor: "O_negative",
    className: "hidden md:table-cell",
  },
  {
    header: " Contact",
    accessor: "contact",
    className: "hidden md:table-cell",
  },
  {
    header: "Latitude",
    accessor: "latitude",
    className: "hidden lg:table-cell",
  },
  {
    header: "Longitude",
    accessor: "longitude",
    className: "hidden lg:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden md:table-cell",
  },

  {
    header: "Action",
    accessor: "action",
  },
];
const BloodBankList = async ({ searchParams }: { searchParams: { [key: string]: string } | undefined }) => {
  const { page } = searchParams ?? {};
  const p: number = page ? parseInt(page) : 1;

  const renderRow = (item: BloodBank) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-blue-300">
      <td className="flex items-center gap-4 p-4">
        <Image src={/*item.photo ||*/ "/noAvatar.png"} alt="User" width={50} height={50} className="md:hidden lg:block w-10 h-10 rounded-full object-cover" />
        <div className="flex flex-col">
          <h3 className="font-semi">{item.name}</h3>
          <p className="text-sm text-gray-500">{item.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.A_positive}</td>
      <td className="hidden md:table-cell">{item.A_negative}</td>
      <td className="hidden md:table-cell">{item.B_positive}</td>
      <td className="hidden md:table-cell">{item.B_negative}</td>
      <td className="hidden md:table-cell">{item.AB_positive}</td>
      <td className="hidden md:table-cell">{item.AB_negative}</td>
      <td className="hidden md:table-cell">{item.O_positive}</td>
      <td className="hidden md:table-cell">{item.O_negative}</td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden lg:table-cell">{item.latitude}</td>
      <td className="hidden lg:table-cell">{item.longitude}</td>
      <td className="hidden md:table-cell">{item.address}</td>

      <td>
        <div className="flex items-center gap-2">
          {/* <Link href={`/list/bloodBankManager/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-200">
              <Image src="/view.png" alt="View" width={15} height={15} />
            </button>
          </Link> */}
          

            <>
              <FormModel table={"bloodBank"} type={"update"} data={item} />
              <FormModel table={"bloodBank"} type={"delete"} id={item.id} />
            </>
         
        </div>
      </td>
    </tr>
  );



  const [data, count] = await prisma.$transaction([

    prisma.bloodBank.findMany({

      take: ITEM_PER_PAGE,
      skip: (p - 1) * ITEM_PER_PAGE,

    }),
    prisma.bloodBank.count(),


  ])
  //  console.log(data,count)
  return (
    <div className="bg-white p-4 rounded-md m-4 mt-0">
      {/* Top Row: Title and Controls on the Same Line */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="hidden md:block text-lg font-semibold">Blood Manager</h1>
        {/* Controls: Search and Buttons */}
        <div className="flex  flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          {/* <TableSearch /> */}
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-400">
              <Image src="/filter.png" alt="Filter" width={20} height={20} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-400">
              <Image src="/sort.png" alt="Sort" width={20} height={20} />
            </button>
            {/* <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-400">
              <Image src="/plus.png" alt="Add" width={20} height={20} />
            </button> */}
            <FormModel table={"bloodBank"} type={"create"} />
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

export default BloodBankList; 

import FormModel from "@/components/FormModel";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { Event } from "@prisma/client";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/setting";
import { format } from "date-fns";

const columns = [
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Description",
    accessor: "description",
  },
  {
    header: "Start Date",
    accessor: "startTime",
    className: "hidden md:table-cell",
  },
  {
    header: "End Date",
    accessor: "endTime",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const BloodBankList = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string } | undefined;
}) => {
  const { page } = searchParams ?? {};
  const p: number = page ? parseInt(page) : 1;

  const renderRow = (item: Event) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-blue-300"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semi">{item.name}</h3>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.description}</td>
      <td className="hidden md:table-cell">
        {item.startDate ? format(new Date(item.startDate), "dd/MM/yyyy") : "N/A"}
      </td>
      <td className="hidden md:table-cell">
        {item.stopDate ? format(new Date(item.stopDate), "dd/MM/yyyy") : "N/A"}
      </td>
      <td>
        <div className="flex items-center gap-2">
          <>
            <FormModel table={"event"} type={"update"} data={item} />
            <FormModel table={"event"} type={"delete"} id={item.id} />
          </>
        </div>
      </td>
    </tr>
  );

  const [data, count] = await prisma.$transaction([
    prisma.event.findMany({
      take: ITEM_PER_PAGE,
      skip: (p - 1) * ITEM_PER_PAGE,
    }),
    prisma.event.count(),
  ]);

  return (
    <div className="bg-white p-4 rounded-md m-4 mt-0">
      {/* Top Row: Title and Controls on the Same Line */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="hidden md:block text-lg font-semibold">All Events</h1>
        {/* Controls: Search and Buttons */}
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          {/* <TableSearch /> */}
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-400">
              <Image src="/filter.png" alt="Filter" width={20} height={20} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-400">
              <Image src="/sort.png" alt="Sort" width={20} height={20} />
            </button>
            <FormModel table={"event"} type={"create"} />
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

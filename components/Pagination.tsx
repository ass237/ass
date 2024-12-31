"use client"
import { ITEM_PER_PAGE } from "@/lib/setting"
import { useRouter } from "next/navigation"

const Pagination = ({page,count}:{page:number,count:number}) => {


  const router = useRouter()
  const hasPrev = ITEM_PER_PAGE * (page - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (page - 1 )+ ITEM_PER_PAGE < count;
 
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(window.location.search)
    params.set("page", newPage.toString())
    router.push(`${window.location.pathname}?${params}`);
  }
  
    

  return (
        <div className="p-4 flex items-center justify-between text-gray-500">
            <button 
              disabled={!hasPrev}
              onClick={()=>(handlePageChange(page - 1))} 
              className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disable:cursor-not-allowed"
              >
                Prev
              </button>
            <div className="text-sm  flex items-center gap-2 ">
              {Array.from({length: Math.ceil(count / ITEM_PER_PAGE)}, (_, index) => {
                const pageIdex = index + 1;
                return (
                  <button 
                    
                    key={pageIdex} 
                    onClick={()=>(handlePageChange(pageIdex))} 
                    className={`px-2 rounded-sm ${page === pageIdex ? "bg-blue-200" : "bg-slate-200"}`}>
                    {pageIdex}
                  </button>
                )
              })}
                
              
            </div>
            <button 
              disabled={!hasNext}
              onClick={()=>(handlePageChange(page + 1))} 
              className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disable:cursor-not-allowed">
                Next
              </button>
        </div>
  )
}

export default Pagination
const UserItem = ()=>{
    return(
       <div className="flex item-center justify-center gap-2 border rounded-[10px] p-2">
        <div className="avatar rounded-full min-h-12 min-w-12 bg-emerald-700 text-white font-[700]
        flex items-center justify-center">
            <p>FN</p>
        </div>
        <div>
            <p className="text-[20px] font-bold">Full name </p>
            <p className="text-[12px] text-neutral-500">email@email.com</p></div>
        
       </div>
    );
}
export default UserItem;
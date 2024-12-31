



export  const ITEM_PER_PAGE = 10;


type RouteAccessMap = {
    [key: string]: string[];
};

export const routeAccessMap: RouteAccessMap = {
    "/admin(.*)": ["admin"],
    "/user(.*)": ["user"],
    "/list/userManager": ["admin"],
    "/list/bloodBankManager": ["admin"],
    "/list/event": ["admin","user"],
    "/list/announcement": ["admin","user"],
   

}
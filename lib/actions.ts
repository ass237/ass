"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma  from "@/lib/prisma"
import { bloodSchema, eventSchema, userSchema , bloodFormSchema} from "./formValidation"

type currentState = {success: boolean,error: boolean}

export const createUser = async(currentState: currentState, data:userSchema) =>{
    try{
        await prisma.user.create({data});
        return{success: true, error: false}
    }catch(err){
        console.log(err)
        return{success: false, error: true}
    }
}
export const updateUser = async(currentState: currentState, data:userSchema, id: string) =>{
    try{
        await prisma.user.update({
            where: {id: id,},data});
        return{success: true, error: false}
    }catch(err){
        console.log(err)
        return{success: false, error: true}

    }
}
export const deleteUser = async(currentState: currentState, data:FormData) =>{
    const id = data.get("id") as string;
    try{
        await prisma.user.delete({
            where: {id: String(id)},
             
        } );
        return{success: true, error: false}
    }catch(err){
        console.log(err)
        return{success: false, error: true}

    }
}
export const createEvent = async(currentState: currentState, data:eventSchema) =>{
    try{
        await prisma.event.create({data});
        return{success: true, error: false}
    }catch(err){
        console.log(err)
        return{success: false, error: true}

    }
}
export const updateEvent = async(currentState: currentState, data:eventSchema,id:string) =>{
    try{
        await prisma.event.update({
            where: {id: id,},data});
        return{success: true, error: false}
    }catch(err){
        console.log(err)
        return{success: false, error: true}

    }
}
export const deleteEvent = async(currentState: currentState, data:FormData) =>{
    const id = data.get("id") as string;
    try{
        await prisma.event.delete({
            where: {id: String(id)}} );
        return{success: true, error: false}
    }catch(err){
        console.log(err)
        return{success: false, error: true}

    }
}
///////////////////////////////////////////////////////////////////////
export const createBloodBank = async(currentState: currentState, data:bloodSchema) =>{
    try{
        await prisma.bloodBank.create({data});
        return{success: true, error: false}
    }catch(err){
        console.log(err)
        return{success: false, error: true}

    }
}
export const updateBloodBank  = async(currentState: currentState, data:bloodSchema,id:string) =>{
    try{
        await prisma.bloodBank.update({
            where: {id:id,},data});
        return{success: true, error: false}
    }catch(err){
        console.log(err)
        return{success: false, error: true}

    }
}
export const deleteBloodBank  = async(currentState: currentState, data:FormData) =>{
    const id = data.get("id") as string;
    try{
        await prisma.bloodBank.delete({
            where: {id: String(id)}} );
        return{success: true, error: false}
    }catch(err){
        console.log(err)
        return{success: false, error: true}

    }
}
///////////////////////////////////////////////////////////////////////
export const createBloodRequest= async(currentState: currentState, data:bloodFormSchema) =>{
    try{
        await prisma.bloodRequest.create({data});
        return{success: true, error: false}
    }catch(err){
        console.log(err)
        return{success: false, error: true}

    }
}
export const updateBloodRequest= async(currentState: currentState, data:bloodFormSchema, id:string) =>{
    try{
        await prisma.bloodRequest.update({
            where: {id: id,},data});
        return{success: true, error: false}
    }catch(err){
        console.log(err)
        return{success: false, error: true}

    }
}



export const checkPendingRequest = async (email: string): Promise<boolean> => {
  try {
    const pendingRequest = await prisma.bloodRequest.findFirst({
      where: {
        email: email,
        status: "pending",
      },
    });
    return !!pendingRequest; // Return true if a pending request exists, false otherwise
  } catch (error) {
    console.error("Error checking pending request:", error);
    throw new Error("Failed to check pending requests.");
  }
};
export const checkUserSetRole = async (email: string): Promise<boolean> => {
  try {
    const userData = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    return !!userData; // Return true if a pending request exists, false otherwise
  } catch (error) {
    console.error("Error checking pending request:", error);
    throw new Error("Failed to check pending requests.");
  }
};


// export const updateBloodRequest  = async(currentState: currentState, data:userSchema,id:string) =>{
//     try{
//         await prisma.bloodRequest.update({
//             where: {id:id,},data});
//         return{success: true, error: false}
//     }catch(err){
//         console.log(err)
//         return{success: false, error: true}

//     }
// }
// export const deleteBloodRequest = async(currentState: currentState, data:FormData) =>{
//     const id = data.get("id") as string;
//     try{
//         await prisma.bloodRequest.delete({
//             where: {id: String(id)}} );
//         return{success: true, error: false}
//     }catch(err){
//         console.log(err)
//         return{success: false, error: true}

//     }
// }
// export const fetchedData = async (email: string) => {
//     try {
//       const user = await prisma.user.findFirst({
//         where: { email: email },
//         select: { 
//           id: true, 
//           // Add other fields as needed
//         },
//       });
//       return user; // Return the fetched user
//     } catch (error) {
//       console.error("Error fetching user:", error);
//       throw new Error("Failed to fetch user data");
//     }
//   };
  
//   export const handleTransaction = async (email: string, requestData: any) => {
//     try {

//       const transactionResult = await prisma.$transaction(async (prisma) => {
//         // Fetch user data
//         const user = await prisma.user.findFirst({
//           where: { email: email },
//           select: {
//             id: true,
//           },
//         });
  
//         if (!user) {
//           throw new Error("User not found");
//         }
  
//         // Create a new blood request using the user's ID
//         // const bloodRequest = await prisma.bloodRequest.create({
//         //   data: {
//         //     recipientId: user.id, // Associate the request with the user's ID
//         //     urgency: requestData.urgency,
//         //     bloodType: requestData.bloodType,
//         //     notes: requestData.notes,
//         //     status: "pending", // Example status
//         //   },
//         // });
  
//         // Return both user and blood request data as the transaction result
//         return { user, bloodRequest };
//       });
  
//       console.log("Transaction succeeded:", transactionResult);
//       return transactionResult;
//     } catch (error) {
//       console.error("Transaction failed:", error);
//       throw new Error("Failed to complete the transaction");
//     }
//   };
  
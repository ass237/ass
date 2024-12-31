import connect from "@/lib/db";
import { user } from "@/lib/models/user";
import { NextRequest, NextResponse } from "next/server";


interface Params {
  id: string; // Adjust based on your dynamic route's structure
}
export async function GET(req:NextRequest,{params}:{params:Params}) {
    const userId = req.nextUrl.searchParams.get("id")
    await connect();
    if(userId){
      
      const data =await user.findById(userId);
      return NextResponse.json({data},{status:200});
    }
    const data =await user.find();
    
    return NextResponse.json({data},{status:200});
  }

  export async function DELETE(req:NextRequest) {

    const userId = req.nextUrl.searchParams.get("id")
    await connect();
    await user.findByIdAndDelete(userId);
    
    return NextResponse.json({message:"user deleted"},{status:200});
  }




// // POST request handler for updating user data
// export async function POST (req: NextApiRequest, res: NextApiResponse) {
//     try {
//       // Extract the updated user data from the request body
//       const updatedUserData = req.body;

//       // Ensure that the user ID is provided
//       if (!updatedUserData.id) {
//         return res.status(400).json({ message: "User ID is required to update" });
//       }

//       // Update the user data in the database using Prisma
//       const updatedUser = await prisma.user.update({
//         where: { id: updatedUserData.id }, // Find the user by ID
//         data: {
//           name: updatedUserData.name,
//           firstname: updatedUserData.firstname,
//           lastname: updatedUserData.lastname,
//           sex: updatedUserData.sex,
//           bloodType: updatedUserData.bloodType,
//           age: updatedUserData.age,
//           bio: updatedUserData.bio,
//           phone: updatedUserData.phone,
//         }, // Only update the fields that are provided
//       });

//       // Return the updated user data
//       return res.status(200).json(updatedUser);
//     } catch (error) {
//       console.error("Error updating user:", error);
//       return res.status(500).json({ message: "Failed to update user data" });
//     }
// }

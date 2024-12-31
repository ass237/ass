import connect from '@/lib/db';
import { bloodRequest } from '@/lib/models/bloodRequest';
import { NextRequest, NextResponse } from 'next/server';
interface Params {
  id: string; // Adjust based on your dynamic route's structure
}

export async function POST(req: NextRequest,{params}:{params:Params}) {
 
  const {
    name,
    email,
    phone,
    address,
    age,
    sex,
    bloodType,
    bloodQty,
    urgency,
    status,
    role,
  } =await req.json();
  await connect();
  await bloodRequest.create({name,
    email,
    phone,
    address,
    age,
    sex,
    bloodType,
    bloodQty,
    urgency,
    status,
    role,})
  return NextResponse.json({ message: 'Request submitted successfully!' },{status:201});
}
export async function GET(req: NextRequest,{params}:{params:Params}) {
  
  const id = req.nextUrl.searchParams.get("id")
  await connect();
  
  if(id){
    
    const data =await bloodRequest.findById(id);
    return NextResponse.json({data},{status:200});
  }
  const data =await bloodRequest.find();
  
  return NextResponse.json({data},{status:200});
}

export async function PUT(req: NextRequest,{params}:{params:Params}) {
  const id = req.nextUrl.searchParams.get("id")
  const { status, note } = await req.json();
  await connect();
  await bloodRequest.findByIdAndUpdate(id,{status,note},{new:true})
  return NextResponse.json({ message: "Updated" });
 
}

// export async function POST(req: NextRequest) {
//   try {
//     const { name, email, phone, bloodType, urgency } = await req.json(); // Parse JSON body

//     // Check if required fields are provided
//     if (!name || !phone || !bloodType || !urgency) {
//       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
//     }

//     // Check if the email is provided and if the user is registered
//     let user;

//     if (email) {
//       user = await prisma.user.findUnique({
//         where: { email },
//       });
//     }

//     // If the user doesn't exist, create a new guest user
//     if (!user && email) {
//       user = await prisma.user.create({
//         data: {
//           name,
//           email,
//           role: 'GUEST', // Assign the GUEST role to the new user
//           phone, // Use the contact information
//           bloodType: bloodType || 'Unknown', // Default to 'Unknown' if bloodType is not provided
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//       });
//     }

//     // If no email is provided, we cannot link a guest user, we still need to create the request
//     if (!email && !user) {
//       return NextResponse.json({ error: 'Email is required for creating a guest user.' }, { status: 400 });
//     }

//     // Create a new BloodSubmittedHistory entry for the user (whether guest or registered)
//     const userRequest = await prisma.bloodSubmittedHistory.create({
//       data: {
//         recipientName: name,
//         phone,
//         bloodType,
//         urgency,
//         recipientId: user.id, // Associate the blood request with the user (guest or registered)
//       },
//     });

//     return NextResponse.json({ message: 'Request submitted successfully!', userRequest });
//   } catch (error) {
//     console.error('Error saving request:', error);
//     return NextResponse.json({ error: 'Failed to save the request.' }, { status: 500 });
//   }
// }

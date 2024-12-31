/* eslint-disable @typescript-eslint/no-explicit-any */
import connect from '@/lib/db';
import {bloodBank} from '@/lib/models/bloodBank';
;
import {  NextResponse } from 'next/server';


export async function GET() {

  await connect();
  const data =await bloodBank.find();
  
  return NextResponse.json({data},{status:200});
}
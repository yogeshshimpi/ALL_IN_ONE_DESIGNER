import { connectionSrt } from "@/app/lib/connection";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    try{mongoose.connect(connectionSrt, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
        return NextResponse.json({result:true})
    }catch(error){
        return NextResponse.json({result:false})        
    }
}
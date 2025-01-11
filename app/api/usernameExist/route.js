import { connectionSrt } from "@/app/lib/connection";
import { userinfos } from "@/models/userinfo";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await mongoose.connect(connectionSrt)
        const data = await request.json()
        const result = await userinfos.findOne({name: data.username})
        if(!result){
            return NextResponse.json({success:true,data:true})
        }else{

            return NextResponse.json({success:false,data:false})
            
        }
            
    } catch (error) {
        return NextResponse.json({success:false , data: error.message})
    }
}
import mongoose from "mongoose";
import { connectionSrt } from "@/app/lib/connection";
import { NextResponse } from "next/server";
import { userinfos } from "@/models/userinfo"; // Uncomment and use if needed

export async function POST(request) {
    try {
        // Connect to MongoDB
        mongoose.connect(connectionSrt, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
              })

        

        const data = await request.json();

     

        const user = await userinfos.create({ name:data.name ,  email:data.email,password:data.password });
        

        return NextResponse.json({ success: true, data :user});
        
    } catch (error) {
        return NextResponse.json({ success: false, data: error.message });
    }
}

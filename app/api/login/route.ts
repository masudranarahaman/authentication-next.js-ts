import { COnnectDB } from "@/lib/config/db.config";
import { UserModel } from "@/lib/models/User.models";
import { GenerateToken } from "@/lib/services/Token.service";
import { NextRequest, NextResponse } from "next/server";

COnnectDB()
export const POST = async(request:NextRequest)=>{
    try {
        const {email,password} = await request.json(); 
        const existUser = await UserModel.findOne({email});
        if(!existUser){
          return   NextResponse.json({error:"User Not Found"},{
                    status:404
                }) 
        }
        // password
        const isMatch = await existUser.comparePassword(password);

 if(!isMatch){
          return   NextResponse.json({error:"Invalid Crendetials"},{
                    status:401
                }) 
        }
        const token = await GenerateToken(existUser._id);

const response =  NextResponse.json({msg:"user login successfully"},{
                    status:201
                }) 

                response.cookies.set("authentication",token,{
                     httpOnly:true
                });

                return response;

    } catch (error:any) {
               return  NextResponse.json({error:error.message},{
                    status:500
                })
    }
    
}
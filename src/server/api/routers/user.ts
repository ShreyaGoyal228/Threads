import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { registerFormSchema } from "~/index";


export const userRouter=createTRPCRouter({
    user:publicProcedure
    .input(registerFormSchema)
    .mutation(async({ctx,input})=>{
       const {name , username , password ,email} = input;

       //email already exists
       const isEmailExists=await ctx.db.user.findFirst({
         where:{
            email:email
         }
       })
       if(isEmailExists)
       {
         return{
            error:"User with this email already exists . Try to register with different one."
         }
       }

       //username already exists
       const isUsernameExists=await ctx.db.user.findFirst({
         where:{
            username:username
         }
       })
       if(isUsernameExists)
       {
         return{
            error:"User with this username already exists."
         }
       }

       try{
await ctx.db.user.create({
 data:{
    name:name,
    email:email,
    username:username,
    password:password
 }
})
return{
    message:"User registered successfully"
}
       }
       catch(err)
       { 
         return{
            error:"Error in user registration"
         }
       }
    })
})

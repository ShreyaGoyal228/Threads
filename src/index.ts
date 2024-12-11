import { z } from "zod";

export const registerFormSchema = z.object({
    name: z
      .string()
      .min(1,{message:"Name is required"})
      .min(3, { message: "Name should contain atleast 3 chars" }),
    username: z
      .string()
      .min(1,{message:"Username is required"})
      .min(2, { message: "Username should contain atleast 2 chars" }),
    email: z
      .string()
      .min(1,{message:"Email is required"})
      .email(),
    password: z
      .string()
      .min(1,{message:"Password is required"})
      .min(5,{message:"Password should contain min of 5 chars"})
      .max(8, {message: "Password should contain max of 8 chars"}),
    confirmPassword: z
      .string()
      .min(1,{message:"Confirm password is required"})
      .min(5,{message:"Password should contain min of 5 chars"})
      .max(8, {message: "Password should contain max of 8 chars"})
  })
  .refine((data)=>data.password === data.confirmPassword , {
      message:"Passwords don't match",
      path:["confirmPassword"]
  });

export const loginFormSchema=z.object({
    email:z.string()
    .min(1,{message:"Email is required"})
    .email(),
    password:z.string()
    .min(1,{message:"Password is required"})
    .min(5,{message:"Passowrd should contain min of 5 chars"})
    .max(8,{message:"Passowrd should contain max of 8 chars"})
})
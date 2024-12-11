'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form"
import { Form , FormControl,FormField,FormLabel,FormItem,FormMessage} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { registerFormSchema } from "~/index";
import { toast } from "sonner";



export default function Register() {
  const router=useRouter();
  const createUserMutation=api.profile.user.useMutation();
    const form=useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues:{
            name:"",
            username:"",
            email:"",
            password:"",
            confirmPassword:""
        }
    })
    const onSubmit=(values:z.infer<typeof registerFormSchema>)=>{
      createUserMutation.mutate({
        name:values.name,
        username:values.username,
        password:values.password,
        email:values.email,
        confirmPassword:values.confirmPassword
      },
      {
        onSuccess:(resp:any)=>{
          toast(resp.message);
          console.log("registration successfull");
          router.push(`/login?message=${resp.message}`);
        },
        onError:(resp:any)=>{
          toast.error(resp.error)
        }
      }
    )}
        const onerror=(err:any)=>{
console.log("Error is",err);
        }
    return(
      <>
      <div className="h-screen flex items-center justify-center">
         <div className="w-1/3 h-[90vh] overflow-y-auto">
        <div className="relative aspect-square w-10 mx-auto">
          <Image src={"/images/logo.svg"} alt="logo-image" fill={true}/>
        </div>
          <div className="flex flex-col p-4">
          <h1 className="text-xl font-semibold">Register</h1>
          <div className="mb-3">Welcome to threads</div>
        
<Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit,onerror)} className="space-y-8">
        {/* name */}
  <FormField
    control={form.control}
    name="name"
    render={({field}) => (
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
        <Input placeholder="Enter your name" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  {/* username */}
   <FormField
    control={form.control}
    name="username"
    render={({field}) => (
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
        <Input placeholder="Enter your username" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  {/* email */}
  <FormField
    control={form.control}
    name="email"
    render={({field}) => (
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
        <Input placeholder="Enter your email" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  {/* password */}
   <FormField
    control={form.control}
    name="password"
    render={({field}) => (
      <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
        <Input type="password" placeholder="Enter your password" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />

  {/* confirmPassword */}
  <FormField
    control={form.control}
    name="confirmPassword"
    render={({field}) => (
      <FormItem>
        <FormLabel>Confirm Password</FormLabel>
        <FormControl>
        <Input placeholder="Enter password for confirmation" type="password" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
    <Button type="submit" className="">Register</Button>
  </form>
</Form>
<div className="mt-3">Already have an account ? <span className="text-orange-400 cursor-pointer" onClick={()=>router.push("/login")}>Login</span></div>
</div>
</div>
</div>
</>

    )
}

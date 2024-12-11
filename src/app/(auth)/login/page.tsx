'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { Form , FormControl,FormField,FormLabel,FormItem,FormMessage} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { loginFormSchema } from "~/index";
import { signIn } from "~/server/auth";


export default function Login() {
    const router=useRouter()
    const form=useForm<z.infer<typeof loginFormSchema>>({
        resolver:zodResolver(loginFormSchema),
        defaultValues:{
            email:"",
            password:""
        }
    })
    const onSubmit=async(values:z.infer<typeof loginFormSchema>)=>{
        const resp=await signIn('credentials',{
            email:values.email,
            password:values.password,
            redirect:false,
        })
        
        
 
    }
    const onerror=(err:any)=>{
console.log("eror is",err);
    }
    return(
        <>
        <div className="h-screen flex items-center justify-center">
         <div className="w-1/3 h-[50vh] overflow-y-auto">
        <div className="relative aspect-square w-10 mx-auto">
          <Image src={"/images/logo.svg"} alt="logo-image" fill={true}/>
        </div>
          <div className="flex flex-col p-4">
          <h1 className="text-xl font-semibold">Login</h1>
          <div className="mb-3">Welcome back</div>
        
<Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit,onerror)} className="space-y-8">

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

    <Button type="submit" className="">Login</Button>
  </form>
</Form>
<div className="mt-3">Don't have an account ? <span className="text-orange-400 cursor-pointer" onClick={()=>router.push("/register")}>Register</span></div>
</div>
</div>
</div>
        </>
    )
}
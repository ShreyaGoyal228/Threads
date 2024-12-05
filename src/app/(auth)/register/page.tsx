'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { useForm } from "react-hook-form"
import { Form , FormControl , FormDescription ,FormField,FormLabel,FormItem,FormMessage} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

const registerFormSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(3, { message: "Name should contain atleast 3 chars" }),
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(2, { message: "Username should contain atleast 2 chars" }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(5,{message:"Password should contain min of 5 chars"})
    .max(8, {
      message: "Password should contain max of 8 chars",
    }),
  confirmPassword: z
    .string({
      required_error: "Password is required",
    })
    .min(5,{message:"Password should contain min of 5 chars"})
    .max(8, {
      message: "Password should contain max of 8 chars",
    })
})
.refine((data)=>data.password === data.confirmPassword , {
    message:"Passwords don't match",
    path:["confirmPassword"]
});


export default function Register() {
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
        console.log("values are",values)
        }
        const onerror=(err:any)=>{
console.log("Error is",err);
        }
    return(
        <div className="h-screen flex justify-center items-center">
<Form {...form} >
    <form onSubmit={form.handleSubmit(onSubmit,onerror)} className="space-y-8 w-1/3 p-4 h-[75vh] overflow-y-auto">
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
    <Button type="submit">Submit</Button>
  </form>
</Form>
</div>
    )
}

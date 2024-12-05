import { z } from "zod";

const loginFormSchema=z.object({
    email:z.string({
        required_error:"Email is required"
    }).email(),
    password:z.string({
        required_error:"Password is required"
    }).min(5).max(8,{message:"Passowrd should be min of 5 chars and max of 8 chars"})
})

export default function Login() {
    return(
        <>
        heyyy
        </>
    )
}
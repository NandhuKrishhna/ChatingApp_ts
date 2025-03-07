import { z } from "zod";


const nameSchema = z.string()
  .nonempty({ message: "Name is required" }) 
  .min(3, { message: "Name must be at least 3 characters long" }) 

.regex(/^[a-zA-Z\s]+$/, { message: "Name should only contain letters and spaces" })

export const emailSchema = z.string().email({ message: "Email is required" })
export const passwordSchema = z.string()
.min(1, { message: "Password is required" })
  .min(6, { message: "Password must be at least 6 characters long" })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" })
export const userAgentSchema =  z.string().optional()



//register schema
export const userRegisterSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password:passwordSchema,
  })
  

//login schema
  export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
  })




export const otpVerificationSchema = z.object({
  code: z.string().min(5, {
    message: "OTP must be at least 5 characters long",
  }),
});

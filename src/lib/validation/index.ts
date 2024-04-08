import * as z from "zod"

export const SignUpPageValidSchema = z.object({
    fullname: z.string().min(2, { message: "Username must be at least 2 characters long" }),
    lastname: z.string().min(2, { message: "Username must be at least 2 characters long" }),
    username: z.string().min(2, { message: "Username must be at least 2 characters long" }),
    email: z.string().email({ message: "Invalid email format" }).regex(/@ashesi.edu.gh$/, { message: "Email must end with @ashesi.edu.gh" }),
    pword: z.string().min(2, { message: "Username must be at least 2 characters long" }),
    repeatpword: z.string().min(2, { message: "Username must be at least 2 characters long" }),

});
 
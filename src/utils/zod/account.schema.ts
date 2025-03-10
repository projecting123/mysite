import { z } from "zod";

export const loginSchema = z.object({
    email: z.string({required_error: "Email is required"}).email("Invalid email address"),
    password: z.string({required_error: "Password is required"}).min(6),
});


export const signupSchema = z.object({
    name: z.string({ required_error: "Name is required" }).min(3).max(30).transform((name) => name.trim().replace(/\s+/g, ' ')),
    email: z.string({ required_error: "Email is required" }).email("Invalid email address").transform((email) => email.toLowerCase().trim()),
    password: z.string({ required_error: "Password is required" }).min(6),
})
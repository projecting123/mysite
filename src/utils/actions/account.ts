"use server";

import { ZodError } from "zod";
import { createClient } from "@/utils/supabase/server";
import { loginSchema, signupSchema } from "@/utils/zod/account.schema";
import { AuthError, Session, User } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export interface FormState {
    formType?: string;
    statusText?: string;
    user?: User | null;
    session?: Session | null;
    message?: string;
    email?: string;
    name?: string;
    nameErrorMessage?: string;
    emailErrorMessage?: string;
    passwordErrorMessage?: string;
}

export async function loginAction(state: FormState | undefined, formData: FormData): Promise<FormState | undefined> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
        await loginSchema.parseAsync({ email, password });
        const supabase = await createClient();
        const { data: { session, user }, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw new AuthError(error.message, error.status);
        revalidatePath("/", 'layout');
        redirect('/dashboard');
    } catch (error) {
        if (error instanceof ZodError) {
            const errors = error.flatten().fieldErrors;
            const emailErrorMessage = errors.email?.[0]!;
            const passwordErrorMessage = errors.password?.[0]!;
            return ({ statusText: 'zoderror', email, emailErrorMessage, passwordErrorMessage });
        }
        else if (error instanceof AuthError) return ({ statusText: 'supabaseerror', email, message: error.message });
    }
}

export async function signupAction(state: FormState | undefined, formData: FormData): Promise<FormState | undefined> {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
        await signupSchema.parseAsync({ email, password, name });
        const supabase = await createClient();
        const { data: { user }, error } = await supabase.auth.signUp({ email, password, options: { data: { name: name } } });
        if (error) throw new AuthError(error.message, error.status);
        else {
            return ({ statusText: 'success', user, message: "Signup successful" });
        };
    } catch (error) {
        if (error instanceof ZodError) {
            const errors = error.flatten().fieldErrors;
            const emailErrorMessage = errors.email?.[0];
            const passwordErrorMessage = errors.password?.[0];
            const nameErrorMessage = errors.name?.[0];
            return ({ statusText: 'zoderror', email, name, emailErrorMessage, passwordErrorMessage, nameErrorMessage });
        }
        else if (error instanceof AuthError) return ({ statusText: 'supabaseerror', email, message: error.message });
    }
}

export async function signInWithProvider(provider: any) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        },
    })

    if (data.url) redirect(data.url);
}

export async function logoutAction() {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw new AuthError(error.message, error.status);
    revalidatePath("/", 'layout');
    redirect("/?isLoginPage=true");
}
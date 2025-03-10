"use server";

import { ZodError } from "zod";
import { createClient } from "@/utils/supabase/server";
import { authAccountSchema } from "@/utils/zod/account.schema";
import { AuthError, Session, User } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export interface FormState {
    formType?: 'login' | 'signup';
    statusText: string;
    user?: User | null;
    session?: Session | null;
    message?: string;
    email?: string;
    emailErrorMessage?: string;
    passwordErrorMessage?: string;
}

export async function accountAction(state: FormState | undefined, formData: FormData): Promise<FormState | undefined> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
        await authAccountSchema.parseAsync({ email, password });
        const supabase = await createClient();
        if (state?.formType == 'login') {
            const { data: { session, user }, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw new AuthError(error.message, error.status);
            else return ({ statusText: 'success', user, session, message: "Login successful", formType: 'login' });
        }
        else if (state?.formType == 'signup') {
            const { error } = await supabase.auth.signUp({ email, password });
            if (error) throw new AuthError(error.message, error.status);
            else return ({ statusText: 'success', email, message: "Signup successful", formType: 'signup' });
        }
    } catch (error) {
        if (error instanceof ZodError) {
            const errors = error.flatten().fieldErrors;
            const emailErrorMessage = errors.email?.[0]!;
            const passwordErrorMessage = errors.password?.[0]!;
            return ({ statusText: 'zoderror', email, emailErrorMessage, passwordErrorMessage });
        };

        if (error instanceof AuthError) return ({ statusText: 'supabaseerror', email, message: error.message });
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
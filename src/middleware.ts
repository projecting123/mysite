import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export default async function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if(!session && url.pathname.includes("dashboard")) return NextResponse.redirect(new URL("/", request.url));
    if(session && !url.pathname.includes("dashboard")) return NextResponse.redirect(new URL("/dashboard", request.url));
    else return NextResponse.next();
}

export const config = {
    matcher: ["/", "/dashboard", "/dashboard/:path*"],
}
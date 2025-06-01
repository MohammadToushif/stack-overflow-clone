import { NextResponse } from "next/server";
import getOrCreateDatabase from "./models/server/db-setup";
import getOrCreateStorage from "./models/server/storage-setup";

export async function middleware() {
  await Promise.all([getOrCreateDatabase(), getOrCreateStorage()]);

  return NextResponse.next();
}

export const config = {
  // This middleware runs on all paths except for API routes, static files, and the favicon
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

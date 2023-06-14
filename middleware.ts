import {
  NextFetchEvent,
  NextRequest,
  NextResponse,
  userAgent,
} from "next/server";

export const config = {
  matcher: ["/((?!login|sign-up|api|_next/static|_next/image|favicon.ico).*)"],
};

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const ua = userAgent(req);
  if (ua.isBot) {
    return NextResponse.json(
      { message: "Bot is not allowed." },
      { status: 403 }
    );
  }
  if (
    !req.cookies.has("accessToken") &&
    !req.nextUrl.pathname.startsWith("/login")
  ) {
    console.log("NO TOKEN FOUND, REDIRECT TO LOGIN PAGE.");
    req.nextUrl.pathname = "/login";
    return NextResponse.redirect(req.nextUrl);
  }
}

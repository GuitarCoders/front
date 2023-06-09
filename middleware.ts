import {
  NextFetchEvent,
  NextRequest,
  NextResponse,
  userAgent,
} from "next/server";

export const config = {
  matcher: "/",
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
    req.nextUrl.pathname = "/login";
    return NextResponse.redirect(req.nextUrl);
  }
}

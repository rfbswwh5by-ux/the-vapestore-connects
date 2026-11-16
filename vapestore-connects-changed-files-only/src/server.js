// Base44 managed file: error-capture v1, adapted for Nitro/Vercel. The server
// entry wraps TanStack Start's default handler so a page's loader and
// beforeLoad errors are reported. What a visitor gets back is unchanged.
import { createStartHandler, defaultStreamHandler } from "@tanstack/react-start/server";
import { recordRouteError } from "@/lib/error-capture.server";

// Runs once the router has loaded the page.
const handler = createStartHandler((ctx) => {
  for (const match of ctx.router.state.matches) {
    if (match.status === "error") recordRouteError(ctx.request, match.error, match.routeId);
  }
  return defaultStreamHandler(ctx);
});

export default { fetch: handler };

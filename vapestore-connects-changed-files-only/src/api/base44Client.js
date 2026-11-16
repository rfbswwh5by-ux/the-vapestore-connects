import { createClient } from "@base44/sdk";
import { getAppParams } from "@/lib/app-params";

const { appId, token, functionsVersion, appBaseUrl } = getAppParams();

// In local/Base44 dev, VITE_BASE44_APP_BASE_URL is the local (or sandbox) backend
// and is used for both API calls and auth redirects. Off Base44 (e.g. Vercel),
// leave serverUrl and appBaseUrl unset so the SDK talks to Base44's hosted
// backend. An empty serverUrl would send API calls to this app's own origin.
export const base44 = createClient({
  appId,
  token: token ?? undefined,
  functionsVersion,
  ...(appBaseUrl ? { serverUrl: appBaseUrl, appBaseUrl } : {}),
});

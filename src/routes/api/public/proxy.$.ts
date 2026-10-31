import { createFileRoute } from "@tanstack/react-router";

const UPSTREAM =
  import.meta.env.VITE_API_UPSTREAM ??
  "https://srikrishna-seva-niketan-backend-99zi.onrender.com/api/v1";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With, Accept, Origin",
  "Access-Control-Max-Age": "86400",
};

async function proxy(request: Request, splat: string) {
  try {
    const inUrl = new URL(request.url);
    const cleanSplat = (splat || "").replace(/^\/+/, "");
    const upstream = new URL(`${UPSTREAM}/${cleanSplat}`);
    inUrl.searchParams.forEach((v, k) => upstream.searchParams.set(k, v));

    const headers = new Headers();
    const ct = request.headers.get("content-type");
    if (ct) headers.set("content-type", ct);
    const auth = request.headers.get("authorization");
    if (auth) headers.set("authorization", auth);
    headers.set("accept", "application/json");

    const init: RequestInit = {
      method: request.method,
      headers,
      signal: AbortSignal.timeout(25000),
    };
    if (!["GET", "HEAD"].includes(request.method)) {
      init.body = await request.arrayBuffer();
    }

    const res = await fetch(upstream.toString(), init);
    const outHeaders = new Headers();
    const outCt = res.headers.get("content-type");
    if (outCt) outHeaders.set("content-type", outCt);
    for (const [k, v] of Object.entries(CORS)) outHeaders.set(k, v);

    return new Response(res.body, { status: res.status, headers: outHeaders });
  } catch (err: any) {
    console.error("[public-proxy-error]", err);
    return new Response(
      JSON.stringify({
        success: false,
        message: err?.message || "Service is currently busy. Please try again in a few seconds.",
        data: null,
        errors: null,
      }),
      {
        status: 503,
        headers: {
          "Content-Type": "application/json",
          ...CORS,
        },
      }
    );
  }
}

export const Route = createFileRoute("/api/public/proxy/$")({
  server: {
    handlers: {
      OPTIONS: () => new Response(null, { status: 204, headers: CORS }),
      GET: ({ request, params }) => proxy(request, params._splat ?? ""),
      POST: ({ request, params }) => proxy(request, params._splat ?? ""),
      PUT: ({ request, params }) => proxy(request, params._splat ?? ""),
      PATCH: ({ request, params }) => proxy(request, params._splat ?? ""),
      DELETE: ({ request, params }) => proxy(request, params._splat ?? ""),
    },
  },
});

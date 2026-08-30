import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { auth } from "./auth";

const http = httpRouter();

http.route({
  path: "/pdf",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const url = new URL(request.url);
    const storageId = url.searchParams.get("id");
    if (!storageId) {
      return new Response("Missing storage ID", { status: 400 });
    }

    const fileUrl = await ctx.storage.getUrl(storageId as any);
    if (!fileUrl) {
      return new Response("Not found", { status: 404 });
    }

    const file = await fetch(fileUrl);
    return new Response(file.body, {
      status: file.status,
      headers: file.headers,
    });
  }),
});

auth.addHttpRoutes(http);

export default http;

import redis from "redis";

console.log("Backend", process.env.REDIS_URL);

const client = redis.createClient({
  url: process.env.REDIS_URL,
});
const pub = redis.createClient({
  url: process.env.REDIS_URL,
});
const sub = redis.createClient({
  url: process.env.REDIS_URL,
});

pub.connect();
sub.connect();
client.connect();

client.on("connect", () => {
  console.log("Redis connected");
});

client.on("error", (err) => {
  console.error(err);
});

Bun.serve({
  port: process.env.PORT || 3000,
  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/api/") {
      return new Response("OK");
    }
    if (url.pathname.startsWith("/api/pop/") && req.method === "POST") {
      const name = url.pathname.replace("/api/pop/", "");
      if (!client.exists(name)) {
        client.set(name, 0);
      }
      await client.incr(name);
      const value = await client.get(name);
      await pub.publish(`topic:${name}`, value ?? "0");
      return Response.json(
        {
          value: Number(value),
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }
    if (url.pathname.startsWith("/api/pop/") && req.method === "GET") {
      const name = url.pathname.replace("/api/pop/", "");
      const value = await client.get(name);
      return Response.json(
        {
          value: value != null ? Number(value) : 0,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }
    if (url.pathname.startsWith("/api/sub/") && req.method === "GET") {
      const name = url.pathname.replace("/api/sub/", "");
      return Response.json(
        await new Promise((resolve) => {
          sub.subscribe(`topic:${name}`, (r) => {
            resolve({
              value: Number(r),
            });
          });
        }),
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }
    return new Response("NOT FOUND");
  },
});

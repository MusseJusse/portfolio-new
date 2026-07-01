import { capsule, endpoint, text } from "lakebed/server";

const appShell = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>edinburgh-floral-portfolio</title>
  </head>
  <body>
    <div id="app"></div>
    <script>window.__LAKEBED_AUTH__ = {"shooBaseUrl":"https://shoo.dev"};</script>
    <script type="module" src="/client.js"></script>
    <script>
      const tailwind = document.createElement("script");
      tailwind.src = "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4";
      tailwind.async = true;
      document.head.appendChild(tailwind);
    </script>
  </body>
</html>`;

function routeShell() {
  return text(appShell, { headers: { "Cache-Control": "no-store", "Content-Type": "text/html; charset=utf-8" } });
}

export default capsule({
  name: "edinburgh-floral-portfolio",
  endpoints: {
    one: endpoint({ method: "GET", path: "/1" }, routeShell),
    two: endpoint({ method: "GET", path: "/2" }, routeShell),
    three: endpoint({ method: "GET", path: "/3" }, routeShell),
    four: endpoint({ method: "GET", path: "/4" }, routeShell),
    five: endpoint({ method: "GET", path: "/5" }, routeShell)
  }
});

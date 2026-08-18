import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { access } from "node:fs/promises";
import test from "node:test";

const port = 3217;
let server;

test.before(async () => {
  server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-H", "127.0.0.1", "-p", String(port)], {
    cwd: new URL("..", import.meta.url),
    stdio: ["ignore", "pipe", "pipe"],
  });

  const deadline = Date.now() + 20_000;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) throw new Error(`Next.js exited with code ${server.exitCode}`);
    try {
      const response = await fetch(`http://127.0.0.1:${port}/`);
      if (response.ok) return;
    } catch (error) {
      if (Date.now() >= deadline) throw error;
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("Next.js did not become ready in time");
});

test.after(() => {
  server?.kill("SIGTERM");
});

async function render() {
  return fetch(`http://127.0.0.1:${port}/`, { headers: { accept: "text/html" } });
}

test("server-renders the Devil He portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Devil He — Senior UX &amp; Digital Experience Designer<\/title>/i);
  assert.match(html, /设计连接全球品牌/);
  assert.match(html, /id="work"/);
  assert.match(html, /id="approach"/);
  assert.match(html, /id="beyond"/);
  assert.match(html, /Tiffany &amp; Co\./);
  assert.match(html, /Nike/);
  assert.doesNotMatch(html, /filecite|turn0file/i);
});

test("includes distinct public case images", async () => {
  const assets = [
    "../public/brand-visuals/tiffany-detail-store.jpg",
    "../public/brand-visuals/sothebys-detail-auction.jpg",
    "../public/brand-visuals/nike-detail-digital.jpg",
    "../public/brand-visuals/gucci-detail-space.jpg",
  ];

  await Promise.all(assets.map((asset) => access(new URL(asset, import.meta.url))));

  const html = await (await render()).text();
  for (const asset of assets) {
    const publicPath = asset.replace("../public", "");
    assert.ok(
      html.includes(publicPath) || html.includes(encodeURIComponent(publicPath)),
      `Rendered HTML should reference ${publicPath}`,
    );
  }
});

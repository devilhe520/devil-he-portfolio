import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
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
    assert.match(html, new RegExp(asset.replace("../public", "")));
  }
});

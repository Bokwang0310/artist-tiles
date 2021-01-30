import { serve } from "https://deno.land/std@0.85.0/http/server.ts";
import { serveFile } from "https://deno.land/std@0.85.0/http/file_server.ts";

const PORT = 8000;
const server = serve({ port: PORT });
console.log(`Server is running on http://localhost:${PORT}/...`);

async function fileExists(path: string) {
  try {
    const stats = await Deno.lstat(path);
    return stats && stats.isFile;
  } catch (e) {
    if (e && e instanceof Deno.errors.NotFound) {
      return false;
    } else {
      throw e;
    }
  }
}

for await (const req of server) {
  const path = `${Deno.cwd()}/${req.url}`;
  if (await fileExists(path)) {
    const content = await serveFile(req, path);
    req.respond(content);
    continue;
  }

  if (req.url === "/") {
    req.respond({ body: "Home" });
  } else {
    req.respond({ status: 404 });
  }
}

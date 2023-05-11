import Fastify from "fastify";

/**
 * Fastify App
 * Инициируется отдельно, чтобы можно было в отдельных файлах прописывать контроллеры
 * и выполнять тесты без старта сервера
 */
const app = Fastify({
  // logger: true
});

// --- LOG routes, attached to App -----

// use stdout instead of console 'cause it looks better during testing
process.stdout.write("------ Mount ROUTES: --------------------\n");
app.addHook("onRoute", (options) => {
  if (!options.method) return;
  if (options.method === "HEAD") return;
  process.stdout.write((options.method as string).padEnd(7) + options.url + "\n");
});

export default app;

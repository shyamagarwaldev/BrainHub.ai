import app from "./app";

const PORT = Number(process.env.PORT) || 8080;
const server = app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

async function shutdown(signal: string) {
  console.log(`Received ${signal}. Shutting down...`);
  try {
    const { prisma } = await import("./db/prisma");
    await prisma.$disconnect();
  } catch (err) {
    console.error("Error during Prisma disconnect:", err);
  } finally {
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(1), 5_000).unref?.();
  }
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled rejection:", reason);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
  process.exit(1);
});

import app from "./app";
import type { UserJwtPayload } from "@repo/auth/auth";
declare global {
  namespace Express {
    interface Request {
      info?: UserJwtPayload;
    }
  }
}

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

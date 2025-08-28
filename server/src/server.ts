import { env } from "@/env";
import { createApp } from "@/app";

const app = createApp();
const port = env.PORT;

app.listen(port, () => console.log(`API server listening on http://localhost:${port}`));

import { env } from "./env.js";
import { createApp } from "./app.js";

const app = createApp();
const port = env.PORT;

app.listen(port, () => console.log(`API server listening on http://localhost:${port}`));

import type { App } from "@slack/bolt";
import reply from "./reply";

const register = (app: App) => {
  app.message(reply);
};

export default { register };

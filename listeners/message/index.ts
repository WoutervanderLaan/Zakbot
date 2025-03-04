import type { App } from "@slack/bolt";
import reply from "./reply.ts";
import tag from "./tag.ts";
import directMessage from "./direct-message.ts";

const TRIGGERS = ["zak", "zakbot", "ghosts", "ghost", "paranormal"];

const register = (app: App) => {
  app.message(directMessage);
  app.message(/<@U08BT9MFNMA>/, tag);
  TRIGGERS.forEach((trigger) => app.message(trigger, reply));
};

export default { register };

import type { App } from "@slack/bolt";
import reply from "./reply";
import tag from "./tag";

const TRIGGERS = ["zak", "zakbot", "ghosts", "ghost", "paranormal"];

const register = (app: App) => {
  app.message(/<@U08BT9MFNMA>/, tag);
  TRIGGERS.forEach((trigger) => app.message(trigger, reply));
};

export default { register };

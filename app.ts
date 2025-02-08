import { App } from "@slack/bolt";
import dotenv from "dotenv";
import registerListeners from "./listeners";

dotenv.config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

registerListeners(app);

const init = async () => {
  await app.start();
  app.logger.info("👻 ZakBot listening for whispers 👻");
};

init();

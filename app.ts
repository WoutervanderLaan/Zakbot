import { App } from "@slack/bolt";
import dotenv from "dotenv";
import registerListeners from "./listeners";

dotenv.config();

export const CHANNEL_ID = process.env.CHANNEL_ID!;

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  // signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
});

registerListeners(app);

const init = async () => {
  await app.start();
  console.log("\n👻 ZakBot listening for whispers 👻\n");
};

init();

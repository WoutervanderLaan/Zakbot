import pkg from "@slack/bolt";
import dotenv from "dotenv";
import express from "express";
import registerListeners from "./listeners/index.ts";
import registerEndpoints from "./endpoints/index.ts";

const { App } = pkg;

const app = express();
app.use(express.json());

const PORT = 3000;

export type ExpressApp = typeof app;
export const CHANNEL_ID = process.env.CHANNEL_ID!;

dotenv.config();

const slackApp = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  signingSecret: process.env.SIGNING_SECRET,
  socketMode: true,
});

registerListeners(slackApp);
registerEndpoints(app, slackApp);

const init = async () => {
  await slackApp.start();

  slackApp.logger.info("👻 ZakBot listening for whispers 👻");

  app.listen(PORT, () =>
    slackApp.logger.info(`Server running on port ${PORT}`)
  );
};

init();

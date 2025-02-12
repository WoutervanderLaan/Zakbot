import { App as SlackApp } from "@slack/bolt";
import { Response } from "express";
import { CHANNEL_ID, ExpressApp } from "../../app";
import getRandomQuote from "../../utils/helpers/track-quotes";

const register = (app: ExpressApp, slackApp: SlackApp) => {
  app.get("/trigger", (_, res: Response) => {
    slackApp.logger.info("Incoming connection");

    res.status(200).send("Connection successful");
  });

  app.post("/trigger", async (_, res: Response) => {
    try {
      const text = getRandomQuote();

      await slackApp.client.chat.postMessage({
        channel: CHANNEL_ID,
        text,
      });

      slackApp.logger.info("Message sent to chat{", text);
      res.status(200).send("Message sent!");
    } catch (error) {
      slackApp.logger.error("Error sending message:", error);
      res.status(500).send("Failed to send message.");
    }
  });
};

export default { register };

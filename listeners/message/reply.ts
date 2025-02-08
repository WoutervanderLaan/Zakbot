import { AllMiddlewareArgs, SlackEventMiddlewareArgs } from "@slack/bolt";
import { CHANNEL_ID } from "../../app";
import getRandomQuote from "../../utils/helpers/track-quotes";
import isTriggered from "../../utils/helpers/trigger";
import wait from "../../utils/helpers/wait";

const ZAKBOT_TAG = "<@U08BT9MFNMA>";

const reply = async ({
  event,
  client,
  say,
  logger,
}: AllMiddlewareArgs & SlackEventMiddlewareArgs<"message">) => {
  if (!("text" in event) || !event.text || "bot_id" in event) return;

  if (!CHANNEL_ID) logger.error("Missing Channel ID");

  if (event.text.includes(ZAKBOT_TAG)) {
    logger.info("👻 I hear a voice calling to me... 👻");

    await wait(3000);
    await say({
      channel: CHANNEL_ID,
      thread_ts: event.ts,
      text: "WHAT DO YOU WANT FROM ME??", //TODO: list of DM quotes
    });
    return;
  }

  if (!isTriggered(event.text)) {
    logger.info("👻 Footsteps in the distance... 👻");
    return;
  }

  logger.info("📬 Received Message Event:", event);
  logger.info("👻 DEBUNKED 👻\n");

  try {
    await wait(1000);

    await client.reactions.add({
      channel: CHANNEL_ID,
      timestamp: event.ts,
      name: "thumbsdown",
    });

    await wait(3000);

    await say({
      channel: CHANNEL_ID,
      text: `👻 ${getRandomQuote()}`,
    });
  } catch (error) {
    logger.error("Error handling Slack message:", error);
  }
};

export default reply;

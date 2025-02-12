import type { App as SlackApp } from "@slack/bolt";
import { ExpressApp } from "../app";
import trigger from "./trigger";

const registerEndpoints = (app: ExpressApp, slackApp: SlackApp) => {
  trigger.register(app, slackApp);
};

export default registerEndpoints;

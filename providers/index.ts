import { LiFiQuoteProvider } from "./lifi-quotes.provider";
import logger from "../utils/logger";
import { Container } from "typedi";


export default async () => {
  Container.set("LiFiQuoteProvider", new LiFiQuoteProvider());
  logger.info("Websocket client connected");
};

import { LiFiQuoteProvider } from "./lifi-quotes.provider";
import logger from "../utils/logger";
import { Container } from "typedi";
import { ConnexteQuoteProvider } from "./connext-quotes.provider";


export default async () => {
  Container.set("LiFiQuoteProvider", new LiFiQuoteProvider());
  Container.set("ConnextQuoteProvider", new ConnexteQuoteProvider());
  logger.info("Providers loaded!");
};

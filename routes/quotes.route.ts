import { Type } from '@sinclair/typebox'
import { QuoteService } from "../services/quotes.service";
import { Container } from "typedi";
import logger from "../utils/logger";

const querySchema = Type.Object({
    amount: Type.Number(),
    fromChain: Type.Union([Type.String(), Type.Integer()]),
    toChain: Type.Union([Type.String(), Type.Integer()]),
    tokenCode: Type.String({ minLength: 3, maxLength: 5 })
  });

export default async function routes(server: any) {
    server.get('/quotes', {
        schema: {
            querystring: querySchema
        },
        handler: async (request: any, reply: any) => {
            const { amount, fromChain, toChain, tokenCode } = request.query;
            const fromChainInt = parseInt(fromChain, 10)
            const toChainInt = parseInt(toChain, 10)
            const quoteService = await Container.get(QuoteService);
            const bestQuote = await quoteService.getBestQuote(amount, fromChainInt, toChainInt, tokenCode)
            reply.send(bestQuote);
        }
    });
}
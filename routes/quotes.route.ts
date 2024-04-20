import { Type } from '@sinclair/typebox'
import { QuoteService } from "../services/quotes.service";
import { Container } from "typedi";
import logger from "../utils/logger";

const querySchema = Type.Object({
    amount: Type.Number(),
    chainIdFrom: Type.Integer(),
    chainIdTo: Type.Integer(),
    currencyCode: Type.String({ minLength: 3, maxLength: 3 }) // Ejemplo para códigos ISO de 3 letras.
  });

export default async function routes(server: any) {
    server.get('/quotes', {
        schema: {
            querystring: querySchema
        },
        handler: async (request: any, reply: any) => {
            const { amount, chainIdFrom, chainIdTo, currencyCode } = request.query;
            const quoteService = await Container.get(QuoteService);
            const bestQuote = await quoteService.getBestQuote({ amount, chainIdFrom, chainIdTo, currencyCode })
            reply.send(bestQuote);
        }
    });
}
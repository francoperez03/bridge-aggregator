  enum ResponseStatus {
    SUCCESS = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_ERROR = 500,
  }

  import { FastifyReply } from 'fastify';

abstract class ApiResponse {
  constructor(
    protected status: ResponseStatus,
    protected message: string
  ) {}

  protected prepare<T extends ApiResponse>(
    reply: FastifyReply,
    response: T,
    headers: { [key: string]: string }
  ): FastifyReply {
    for (const [key, value] of Object.entries(headers)) {
      reply.header(key, value);
    }
    return reply.status(this.status).send(response);
  }

  public send(
    reply: FastifyReply,
    headers: { [key: string]: string } = {}
  ): FastifyReply {
    return this.prepare<ApiResponse>(reply, this, headers);
  }

}

export class AuthFailureResponse extends ApiResponse {
  constructor(message = "Authentication Failure") {
    super(ResponseStatus.UNAUTHORIZED, message);
  }
}

export class NotFoundResponse extends ApiResponse {
  constructor(message = "Not Found") {
    super(ResponseStatus.NOT_FOUND, message);
  }

  send(reply: FastifyReply, headers: { [key: string]: string } = {}): FastifyReply {
    return super.prepare<NotFoundResponse>(reply, this, headers);
  }
}
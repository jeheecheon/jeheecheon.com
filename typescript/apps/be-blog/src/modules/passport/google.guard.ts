import type { ExecutionContext } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class GoogleAuthGuard extends AuthGuard("google") {
  getAuthenticateOptions(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const redirect = request.query.redirect;

    return {
      state: redirect,
    };
  }
}

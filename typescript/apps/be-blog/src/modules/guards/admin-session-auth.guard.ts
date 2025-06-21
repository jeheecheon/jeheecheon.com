import { ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { RoleId } from "@packages/common/types/blog/role";
import { Role } from "@packages/entities-blog/role/role.entity";

@Injectable()
export class AdminSessionAuthGuard extends AuthGuard("session") {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  canActivate(context: ExecutionContext) {
    const request = this.getRequest(context);

    if (!request?.session?.account?.roles?.length) {
      return false;
    }

    return request.session.account.roles.some(
      (role: Role) => role.id === RoleId.ADMIN,
    );
  }
}

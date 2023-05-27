import { CanActivate, ExecutionContext, Session } from "@nestjs/common";
import { Observable } from "rxjs";

export class sessionGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        // return request.session.email !== undefined && request.session.user == 'employee';
        return true;
    }
}
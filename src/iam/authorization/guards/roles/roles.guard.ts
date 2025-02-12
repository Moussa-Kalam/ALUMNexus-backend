import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { UserRoles } from '../../../../common/enums/roles.enum';
import { ROLES_KEY } from '../../decorators/roles.decorator';
import { REQUEST_USER_KEY } from '../../../iam.constants';
import { ActiveUserData } from '../../../interfaces/active-user-data.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private  readonly reflector: Reflector) {
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const contextRoles = this.reflector.getAllAndOverride<UserRoles[]>(ROLES_KEY, [
      context.getClass(),
      context.getHandler()
    ])

    if (!contextRoles) {
      return true;
    }

    const user: ActiveUserData = context.switchToHttp().getRequest()[REQUEST_USER_KEY];

    return contextRoles.some(role => user.accountType === role)

  }
}

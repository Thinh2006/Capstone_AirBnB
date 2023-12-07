// roles.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true; // No specific roles required, allow access
    }

    const { user } = context.switchToHttp().getRequest();
    const roleCheck = requiredRoles.includes(user.data.role);
    if (roleCheck) {
      return true;
    } else {
      throw new UnauthorizedException('Bạn không có quyền');
    }
  }
}

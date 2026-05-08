// src/auth/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Role } from '../../generated/prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private roles: Role[]) {}
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    return this.roles.includes(req.user.role);
  }
}

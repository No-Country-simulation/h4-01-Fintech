import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLE_KEY } from './metadata/role.metadata';
import { Role } from './roles';
import { RbacService } from './rbac.service';

interface TokenDto {
    sub: string;
    email: string;
    role: Role;
}

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private roleService: RbacService
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // Get required roles from metadata
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles || requiredRoles.length === 0) {
            return true; // No role required, allow access
        }

        const request = context.switchToHttp().getRequest();
        const user = request['user'] as TokenDto;

        if (!user) {
            throw new ForbiddenException('Authentication failed.');
        }

        const isAuthorized = requiredRoles.some(role =>
            this.roleService.isAuthorized({ requiredRole: role, currentRole: user.role })
        );

        if (!isAuthorized) {
            throw new ForbiddenException('Insufficient permissions');
        }

        return true;
    }
}

import { Injectable } from '@nestjs/common';
import { Role } from './roles';

interface IsAuthorizedParams {
    currentRole: Role;
    requiredRole: Role;
}

@Injectable()
export class RbacService {
    private hierarchy: Map<string, number> = new Map();
    private priority: number = 1;

    constructor() {
        // única jerarquía de roles desde el menos privilegiado
        this.buildRoles([Role.USER, Role.MODERATOR, Role.ADMIN]);
    }

    // establece una jerarquía de roles en orden de menor a mayor privilegio
    private buildRoles(roles: Role[]) {
        roles.forEach((role) => {
            this.hierarchy.set(role, this.priority);
            this.priority++;
        });
    }

    // verifica si un usuario tiene el rol requerido o un rol superior
    public isAuthorized({ currentRole, requiredRole }: IsAuthorizedParams): boolean {
        const currentPriority = this.hierarchy.get(currentRole);
        const requiredPriority = this.hierarchy.get(requiredRole);

        return !!currentPriority && !!requiredPriority && currentPriority >= requiredPriority;
    }
}

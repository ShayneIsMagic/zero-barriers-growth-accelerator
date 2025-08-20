import bcrypt from 'bcryptjs';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth/config';
import type { UserRole } from '@/types';

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function getSession() {
  return getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user ?? null;
}

export function hasRole(userRole: UserRole, requiredRole: UserRole): boolean {
  const roleHierarchy: Record<UserRole, number> = {
    USER: 1,
    PRODUCER: 2,
    C_SUITE: 3,
    ADMIN: 4,
    SUPER_ADMIN: 5,
  };

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}

export function hasPermission(userRole: UserRole, permission: string): boolean {
  const permissions: Record<UserRole, string[]> = {
    USER: ['analysis:read', 'analysis:create', 'recommendations:read'],
    PRODUCER: [
      'analysis:read',
      'analysis:create',
      'analysis:update',
      'recommendations:read',
      'recommendations:create',
      'projects:read',
      'projects:create',
    ],
    C_SUITE: [
      'analysis:read',
      'analysis:create',
      'analysis:update',
      'recommendations:read',
      'recommendations:create',
      'projects:read',
      'projects:create',
      'analytics:read',
      'reports:read',
      'exports:create',
    ],
    ADMIN: [
      'analysis:*',
      'recommendations:*',
      'projects:*',
      'analytics:*',
      'reports:*',
      'exports:*',
      'users:read',
      'users:update',
      'organization:read',
      'organization:update',
    ],
    SUPER_ADMIN: ['*'],
  };

  const userPermissions = permissions[userRole] || [];

  // Check for wildcard permissions
  if (userPermissions.includes('*')) {
    return true;
  }

  // Check for specific permission
  if (userPermissions.includes(permission)) {
    return true;
  }

  // Check for resource wildcard (e.g., 'analysis:*' includes 'analysis:read')
  const [resource] = permission.split(':');
  if (userPermissions.includes(`${resource}:*`)) {
    return true;
  }

  return false;
}

export function canAccessOrganization(
  userOrgId: string | null,
  targetOrgId: string,
  userRole: UserRole
): boolean {
  // Super admins can access any organization
  if (userRole === 'SUPER_ADMIN') {
    return true;
  }

  // Users can only access their own organization
  return userOrgId === targetOrgId;
}

export function canAccessAnalysis(
  analysis: { userId: string; organizationId: string },
  currentUser: { id: string; organizationId: string | null; role: UserRole }
): boolean {
  // Super admins can access any analysis
  if (currentUser.role === 'SUPER_ADMIN') {
    return true;
  }

  // Organization admins can access any analysis in their org
  if (
    currentUser.role === 'ADMIN' &&
    currentUser.organizationId === analysis.organizationId
  ) {
    return true;
  }

  // Users can access their own analyses
  if (analysis.userId === currentUser.id) {
    return true;
  }

  // C-Suite and producers can access analyses in their org
  if (
    (currentUser.role === 'C_SUITE' || currentUser.role === 'PRODUCER') &&
    currentUser.organizationId === analysis.organizationId
  ) {
    return true;
  }

  return false;
}

export class AuthError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 401
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

export class PermissionError extends AuthError {
  constructor(permission: string) {
    super(
      `Insufficient permissions. Required: ${permission}`,
      'INSUFFICIENT_PERMISSIONS',
      403
    );
  }
}

export class OrganizationAccessError extends AuthError {
  constructor(organizationId: string) {
    super(
      `Access denied to organization: ${organizationId}`,
      'ORGANIZATION_ACCESS_DENIED',
      403
    );
  }
}

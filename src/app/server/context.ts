import { GenericGapiResolversType, errorUnauthorized } from '@gapi/core';

export interface Context {
  user: { type: string };
}

export interface Resolver extends GenericGapiResolversType {
  scope?: string[];
  public?: boolean;
}

export function canAccess(resolverScope: string[], context: Context) {
  return context && context.user && resolverScope.filter(scope => scope === context.user.type).length
    ? true
    : errorUnauthorized();
}
export function AuthenticationHooks(resolver: Resolver, context: Context) {
  canAccess(resolver.scope, context);
}
export function ResolverHooks(resolver: Resolver, root, args, context: Context, info) {
  if (!resolver.public) {
    AuthenticationHooks(resolver, context);
  }
}

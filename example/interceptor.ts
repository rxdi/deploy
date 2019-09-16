import { Request } from 'hapi';
import { errorUnauthorized, GenericGapiResolversType } from '@gapi/core';

interface Context {
  user: { type: string };
}

interface Resolver extends GenericGapiResolversType {
  scope?: string[];
  public?: boolean;
}

export async function OnRequestHook(request: Request) {
  console.log('OH MY GOD PESHO', request.headers);
  return { user: { type: 'ADMIN2' } };
}

export async function ResolverHook(resolver: Resolver, root, args, context: Context, info) {
    console.log(context);
    return ResolverHooks(resolver, root, args, context, info);
}

function canAccess(resolverScope: string[], context: Context) {
  return context && context.user && resolverScope.filter(scope => scope === context.user.type).length
    ? true
    : errorUnauthorized();
}
function AuthenticationHooks(resolver: Resolver, context: Context) {
  canAccess(resolver.scope, context);
}
function ResolverHooks(resolver: Resolver, root, args, context: Context, info) {
  if (resolver && !resolver.public) {
    AuthenticationHooks(resolver, context);
  }
}

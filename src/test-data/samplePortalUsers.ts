import * as env from '../utils/env';

export type PortalUserType = 'Shopper' | 'Restricted' | 'BrokenCatalog' | 'SlowShopper';

export interface PortalUser {
  userType: PortalUserType;
  username: string;
  password: string;
}

export function credentialsFor(userType: PortalUserType): PortalUser {
  switch (userType) {
    case 'Shopper':
      return {
        userType,
        username: env.getStandardUser(),
        password: env.getStandardPassword(),
      };
    case 'Restricted':
      return {
        userType,
        username: env.getLockedOutUser(),
        password: env.getStandardPassword(),
      };
    case 'BrokenCatalog':
      return {
        userType,
        username: env.getProblemUser(),
        password: env.getStandardPassword(),
      };
    case 'SlowShopper':
      return {
        userType,
        username: env.getPerformanceUser(),
        password: env.getStandardPassword(),
      };
    default:
      throw new Error(`Unknown user type: ${userType}`);
  }
}

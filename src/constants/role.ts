/**
 * This file contains user's role and its privilege level,
 * the higher the number the higher the privilege is,
 * user with higher level can access privilege from the lower level
 */

export enum Role {
  SUPERADMIN = 'superadmin',
  MANAGER = 'manager',
  PUBLISHER = 'publisher',
  BROADCASTER = 'broadcaster',
  CUSTOMER = 'customer',
}

export const privilageLevel: { [key: string]: number } = {
  superadmin: 4,
  manager: 3,
  publisher: 2,
  customer: 1,
  broadcaster: 1,
}

export enum Role {
  SUPERADMIN = 'superadmin',
  MANAGER = 'manager',
  PUBLISHER = 'publisher',
  CUSTOMER = 'customer',
}

export const privilageLevel: { [key: string]: number } = {
  superadmin: 4,
  manager: 3,
  publisher: 2,
  customer: 1,
}

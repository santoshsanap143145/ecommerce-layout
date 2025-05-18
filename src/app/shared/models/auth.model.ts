export interface IsignIn {
  email: string;
  password: string;
  userRole: 'buyer' | 'admin' | 'superAdmin'
}

export interface IlogIn {
  email: string;
  password: string;
}

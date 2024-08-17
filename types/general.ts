export interface Account {
  address?: string | undefined;
  bio: string | undefined;
  _id?: string;
  name: string | undefined;
  lastName: string | undefined;
  photo?: string;
  banner?: string;
  phone: string | undefined;
  email?: string;
  date?: string;
  companies?: CompanyAccount[];
}

export interface LoginResponse {
  _id: string;
  name: string;
  lastName: string;
  photo: string;
  email: string;
  date: string;
  token: string;
}

export type OptionType = { value: string; label: string };

export interface CompanyAccount {
  selected: boolean;
}

export interface Register {
  name?: string;
  email?: string;
  password?: string;
  repeatPassword?: string;
  companyName?: string;
  docId?: string;
}

interface UserCreated {
  _id: string;
  name: string;
  lastName: string;
}

export interface Created {
  user: UserCreated;
  date: string;
}

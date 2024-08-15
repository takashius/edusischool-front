export interface Account {
    address: string | number | readonly string[] | undefined
    bio: string | number | readonly string[] | undefined
    _id: string
    name: string
    lastName: string
    photo: string
    phone: string
    email: string
    date: string
    companies: CompanyAccount[]
}

export interface CompanyAccount {
    selected: boolean
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
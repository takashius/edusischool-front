export interface Account {
    _id: string
    name: string
    lastName: string
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
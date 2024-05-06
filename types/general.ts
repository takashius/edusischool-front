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
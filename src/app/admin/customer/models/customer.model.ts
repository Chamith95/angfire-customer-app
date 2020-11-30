export interface CustomerModel {
    id?: string;
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    birthday: Date | any;
    contacts: Array<ContactsModel>;
}

export interface ContactsModel {
    contactType: string;
    value: string;
}

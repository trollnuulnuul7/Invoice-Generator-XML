export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  brand: string;
  imageUrl: string;
}

export interface InvoiceItem {
  article: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Customer {
  name: string;
  bin: string;
}

export interface Invoice {
  number: string;
  date: string;
  items: InvoiceItem[];
  total: number;
  vat: number;
  company: {
    name: string;
    bin: string;
    bank: string;
    account: string;
    bic: string;
  };
  customer: Customer;
}
import { IProduct } from "./adminProduct";

export interface IOrder {
    _id: string
    products: IProduct[],
    total: number,
    shopperId: string
    shopperName: string,
    shopperAddress: string,
    shopperEmail: string,
    shopperPhone: string,
    shopperWhatsapp: string,
    companyId: string,
    companyName: string,
    companyAddress: string,
    companyEmail: string,
    companyPhone: string,
    companyWhatsapp: string,
    deliveryTerms: string,
    paymentTerms: string,
    status: string,
    createdAt: string
}
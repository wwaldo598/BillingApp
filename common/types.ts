export interface InfoMetadata{
    transactionId: string,
    applicationId: string
}

export interface ResponseStatus{
    status: number;
    message: any;
}

export interface InvoiceInfo{
    id: string, // Invoice Id
    serviceType: string,
    payDate: string, //YYYYMMDD
    payedTotal: string,
    amount: string, // Monto de la fáctura.
    taxAmount: string,
    paymentMethod: string
}

export interface InputRequest{
    inputMetada: InfoMetadata;
    billingDate : String,
    invoiceInfo: InvoiceInfo;
}

export interface InvoiceDBRecord{
    id?:string,
    billingDate : String,
    invoiceInfo: InvoiceInfo;
}

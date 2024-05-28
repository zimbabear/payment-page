export interface SubmitPymentRequest{
  cardSchemeId: number,
  cardNumber: string,
  expiry: string,
  name: string,
  email?: string
}

export interface SubmitPymentResponse{
  message: string,
  responseCode: string,
  invoiceNo?: string,
}

export interface DonationPledge {
  organizationId: number
  projectSlug: string
  pledgeCurrency: string
  pledgeAmount: number
  receiptEmail: string
  firstName: string
  lastName: string
  addressLine1: string
  addressLine2?: string
  country: string
  state?: string
  city: string
  zipcode: string
  taxReceipt: boolean
  isAnonymous: boolean
  joinMailingList: boolean
  socialX?: string
  socialFacebook?: string
  socialLinkedIn?: string
}

export interface FiatDonationResponse {
  pledgeId: string
}

export interface CryptoDonationResponse {
  depositAddress: string
  pledgeId: string
  qrCode: string
}

export interface StockDonationResponse {
  donationUuid: string
}


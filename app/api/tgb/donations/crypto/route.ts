import { NextRequest, NextResponse } from 'next/server'
import { createTGBClient } from '@/services/tgb/client'
import type { DonationPledge, CryptoDonationResponse } from '@/types/donation'

export async function POST(request: NextRequest) {
  try {
    const body: DonationPledge = await request.json()

    // Validate required fields
    const requiredFields = [
      'organizationId',
      'projectSlug',
      'pledgeCurrency',
      'pledgeAmount',
      'receiptEmail',
      'firstName',
      'lastName',
      'addressLine1',
      'country',
      'city',
      'zipcode',
    ]

    for (const field of requiredFields) {
      if (!body[field as keyof DonationPledge]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    const client = await createTGBClient()

    const response = await client.post<{ data: CryptoDonationResponse }>(
      '/donation/crypto',
      {
        organizationId: body.organizationId,
        projectSlug: body.projectSlug,
        pledgeCurrency: body.pledgeCurrency,
        pledgeAmount: body.pledgeAmount,
        receiptEmail: body.receiptEmail,
        firstName: body.firstName,
        lastName: body.lastName,
        addressLine1: body.addressLine1,
        addressLine2: body.addressLine2,
        country: body.country,
        state: body.state,
        city: body.city,
        zipcode: body.zipcode,
        taxReceipt: body.taxReceipt,
        isAnonymous: body.isAnonymous,
        joinMailingList: body.joinMailingList,
        socialX: body.socialX,
        socialFacebook: body.socialFacebook,
        socialLinkedIn: body.socialLinkedIn,
      }
    )

    return NextResponse.json(response.data.data)
  } catch (error: any) {
    console.error('Error creating crypto donation:', error)
    return NextResponse.json(
      {
        error: 'Failed to create crypto donation',
        details: error.response?.data || error.message,
      },
      { status: 500 }
    )
  }
}


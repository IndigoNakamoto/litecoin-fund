'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DonatePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    organizationId: '',
    projectSlug: '',
    pledgeCurrency: 'USD',
    pledgeAmount: '',
    receiptEmail: '',
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    country: 'US',
    state: '',
    city: '',
    zipcode: '',
    taxReceipt: true,
    isAnonymous: false,
    joinMailingList: false,
  })
  const [donationType, setDonationType] = useState<'fiat' | 'crypto'>('fiat')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const endpoint =
        donationType === 'fiat'
          ? '/api/tgb/donations/fiat'
          : '/api/tgb/donations/crypto'

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          pledgeAmount: parseFloat(formData.pledgeAmount),
          organizationId: parseInt(formData.organizationId),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create donation')
      }

      const data = await response.json()
      console.log('Donation created:', data)

      // Redirect to success page or show success message
      router.push(`/donate/success?pledgeId=${data.pledgeId}`)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-4xl font-bold mb-8">Donate</h1>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Donation Type
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setDonationType('fiat')}
            className={`px-4 py-2 rounded ${
              donationType === 'fiat'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Fiat (Card)
          </button>
          <button
            type="button"
            onClick={() => setDonationType('crypto')}
            className={`px-4 py-2 rounded ${
              donationType === 'crypto'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Crypto
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Organization ID
          </label>
          <input
            type="number"
            required
            value={formData.organizationId}
            onChange={(e) =>
              setFormData({ ...formData, organizationId: e.target.value })
            }
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Project Slug
          </label>
          <input
            type="text"
            required
            value={formData.projectSlug}
            onChange={(e) =>
              setFormData({ ...formData, projectSlug: e.target.value })
            }
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Amount ({formData.pledgeCurrency})
          </label>
          <input
            type="number"
            step="0.01"
            required
            value={formData.pledgeAmount}
            onChange={(e) =>
              setFormData({ ...formData, pledgeAmount: e.target.value })
            }
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Receipt Email
          </label>
          <input
            type="email"
            required
            value={formData.receiptEmail}
            onChange={(e) =>
              setFormData({ ...formData, receiptEmail: e.target.value })
            }
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              First Name
            </label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Address Line 1
          </label>
          <input
            type="text"
            required
            value={formData.addressLine1}
            onChange={(e) =>
              setFormData({ ...formData, addressLine1: e.target.value })
            }
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Address Line 2 (Optional)
          </label>
          <input
            type="text"
            value={formData.addressLine2}
            onChange={(e) =>
              setFormData({ ...formData, addressLine2: e.target.value })
            }
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              required
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Zipcode</label>
            <input
              type="text"
              required
              value={formData.zipcode}
              onChange={(e) =>
                setFormData({ ...formData, zipcode: e.target.value })
              }
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.taxReceipt}
              onChange={(e) =>
                setFormData({ ...formData, taxReceipt: e.target.checked })
              }
              className="mr-2"
            />
            Request Tax Receipt
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.joinMailingList}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  joinMailingList: e.target.checked,
                })
              }
              className="mr-2"
            />
            Join Mailing List
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Submit Donation'}
        </button>
      </form>
    </div>
  )
}


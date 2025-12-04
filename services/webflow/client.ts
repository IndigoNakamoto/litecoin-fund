import axios, { AxiosInstance } from 'axios'

const WEBFLOW_API_BASE = 'https://api.webflow.com/v2'

export interface WebflowResponse<T> {
  items: T[]
  count: number
  total: number
  limit: number
  offset: number
}

export function createWebflowClient(apiToken: string): AxiosInstance {
  return axios.create({
    baseURL: WEBFLOW_API_BASE,
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'accept-version': '1.0.0',
      'Content-Type': 'application/json',
    },
  })
}

export async function listCollectionItems<T>(
  client: AxiosInstance,
  collectionId: string,
  params: Record<string, any> = {}
): Promise<T[]> {
  let items: T[] = []
  let offset = 0
  let total = 0
  const limit = 100

  try {
    do {
      const response = await client.get<WebflowResponse<T>>(
        `/collections/${collectionId}/items`,
        {
          params: {
            limit,
            offset,
            ...params,
          },
        }
      )
      items = items.concat(response.data.items)
      total = response.data.total
      offset += limit
    } while (items.length < total)

    return items
  } catch (error: any) {
    console.error(
      `Error fetching items from collection ${collectionId}:`,
      error.response?.data || error.message
    )
    throw error
  }
}


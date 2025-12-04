import axios, { AxiosInstance } from 'axios'
import { getAccessToken } from './auth'

const TGB_API_BASE = 'https://public-api.tgbwidget.com/v1'

export async function createTGBClient(): Promise<AxiosInstance> {
  const accessToken = await getAccessToken()

  return axios.create({
    baseURL: TGB_API_BASE,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })
}


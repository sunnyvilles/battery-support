import axiosClient from '../axiosClient'
import type { AxiosResponse, AxiosError } from 'axios'
import type { ITabletRecord } from '../models/BatteryData'

const data_url = `https://sunnyvilles.github.io/data/battery-data.json`

async function fetchAllSchoolsData(): Promise<ITabletRecord[]> {
  const response: AxiosResponse<ITabletRecord[]> | void = await axiosClient
    .get<ITabletRecord[]>(data_url)
    .catch((error: AxiosError) => {
      console.log(error)
    })

  return response?.data || []
}

export { fetchAllSchoolsData }

import type { IDataListByTablet, ITabletRecord, IDataByTablet } from '@/models/BatteryData'
import { calculateBatteryConsumptionPerDay } from '@/utils/helper'

// list of all tablets assigned to a school
export function getTabletsListBySchool(data: ITabletRecord[]): Record<number, ITabletRecord[]> {
  const tabletsListBySchool: Record<number, ITabletRecord[]> = {}

  data.reduce((accObj, currentEntry) => {
    const academyId = currentEntry.academyId

    if (!accObj[academyId]) {
      accObj[academyId] = []
    }
    accObj[academyId].push(currentEntry)
    return accObj
  }, tabletsListBySchool)

  return tabletsListBySchool
}

// count the number of battery issues for a list of tabs
export function getTabletsListWithIssues(tablets: ITabletRecord[]): IDataByTablet[] {
  const dataListByTablet = getDataListByTablet(tablets)
  const tabletsWithIssues = Object.keys(dataListByTablet)
    .filter((tabletId) => {
      const tabletData = dataListByTablet[tabletId]
      const batteryConsumptionPerDay = calculateBatteryConsumptionPerDay(tabletData)

      //todo
      tabletData.batteryConsumptionPerDay =
        batteryConsumptionPerDay > 100 ? 100 : batteryConsumptionPerDay

      return batteryConsumptionPerDay > 30
    })
    .map((tabletId) => dataListByTablet[tabletId])

  return tabletsWithIssues
}

// each tablet specific data
function getDataListByTablet(tablets: ITabletRecord[]): IDataListByTablet {
  const dataByTablet: IDataListByTablet = {}

  tablets.reduce((accObj, currentEntry) => {
    const tabletId = currentEntry.serialNumber

    if (!accObj[tabletId]) {
      const dataByTablet: IDataByTablet = {
        timestampsList: [],
        batteryLevelsList: []
      }

      accObj[tabletId] = dataByTablet
    }

    const dataObj: IDataByTablet = accObj[tabletId]

    // todo: sort timestamp array, based on it sort battery array
    dataObj.timestampsList.push(currentEntry.timestamp)
    dataObj.batteryLevelsList.push(currentEntry.batteryLevel)
    dataObj.tablet = currentEntry

    return accObj
  }, dataByTablet)

  return dataByTablet
}

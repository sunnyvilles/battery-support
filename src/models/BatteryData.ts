export interface ITabletRecord {
  employeeId: string
  academyId: number
  timestamp: string
  batteryLevel: number
  serialNumber: string
}

type ISchool = {
  academyId: number
}

export interface IDataBySchool extends ISchool {
  tabletsWithIssues: IDataByTablet[]
}
export interface ISchoolWithNumberOfBadTablets extends ISchool {
  numberOfBadTablets: number
}

export interface IDataByTablet {
  timestampsList: string[]
  batteryLevelsList: number[]
  batteryConsumptionPerDay?: number
  tablet?: ITabletRecord
}

export type ITabletsListBySchool = Record<number, IDataByTablet[]>
export type IDataListByTablet = Record<string, IDataByTablet>

import { ref } from 'vue'
import { defineStore } from 'pinia'

import type {
  ITabletRecord,
  IDataBySchool,
  IDataByTablet,
  ISchoolWithNumberOfBadTablets
} from '@/models/BatteryData'
import { getTabletsListWithIssues, getTabletsListBySchool } from '@/services/school'

export const useBatteryStore = defineStore('battery', () => {
  const allSchoolsData = ref<IDataBySchool[]>([])

  const selectedSchoolId = ref<number>(0)

  function setAllSchoolsData(data: ITabletRecord[]) {
    if (data) allSchoolsData.value = tabletsListWithIssuesBySchool(data)
  }

  function setSelectedSchoolId(id: number) {
    selectedSchoolId.value = id
  }

  // consider : there is no school with 0 as academyId value
  function getDataOfSelectedSchool(academyId: number): IDataBySchool {
    const school = allSchoolsData.value.find(
      (dataBySchool: IDataBySchool) => dataBySchool.academyId === academyId
    )
    return school || ({} as IDataBySchool)
  }

  function getSchoolsWithNumberOfBadTablets(): ISchoolWithNumberOfBadTablets[] {
    return allSchoolsData.value.map((school) => {
      const schoolData = {} as ISchoolWithNumberOfBadTablets
      schoolData.academyId = school.academyId
      schoolData.numberOfBadTablets = school.tabletsWithIssues.length
      return schoolData
    })
  }

  return {
    allSchoolsData,
    getDataOfSelectedSchool,
    setAllSchoolsData,
    setSelectedSchoolId,
    getSchoolsWithNumberOfBadTablets
  }
})

function tabletsListWithIssuesBySchool(data: ITabletRecord[]): IDataBySchool[] {
  // count the number of tablet with issues by school
  const schoolsList = Object.entries(getTabletsListBySchool(data)).map(([academyId, tablets]) => {
    const tabletsWithIssues: IDataByTablet[] = getTabletsListWithIssues(tablets)

    return {
      academyId: parseInt(academyId),
      tabletsWithIssues
    }
  })

  return schoolsList
}

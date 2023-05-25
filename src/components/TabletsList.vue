<script setup lang="ts">
import { toRaw, onUnmounted } from 'vue'

import { useBatteryStore } from '@/stores/batteryStore'
import type { IDataBySchool, IDataByTablet } from '@/models/BatteryData'

const props = defineProps({
  id: String
})

const academyId: number = parseInt(props.id || '')

const { getDataOfSelectedSchool, setSelectedSchoolId } = useBatteryStore()
let tabletsWithIssue: IDataByTablet[]
let schoolData: IDataBySchool

schoolData = toRaw(getDataOfSelectedSchool(academyId))
tabletsWithIssue = schoolData.tabletsWithIssues

setSelectedSchoolId(academyId)

onUnmounted(() => {
  setSelectedSchoolId(0)
})
</script>

<template>
  <div class="school-details" v-if="schoolData">
    <h1>{{ `Academy ${schoolData.academyId}` }}</h1>
    <h2>{{ tabletsWithIssue.length }} devices need battery replacement</h2>
    <ul>
      <li v-for="({ tablet }, i) in tabletsWithIssue" :key="tablet?.serialNumber">
        <h3>Device {{ tablet?.serialNumber }}</h3>
        <p>Battery level: {{ tablet?.batteryLevel }}%</p>
        <p>Last Updated By: {{ tablet?.employeeId }}</p>
        <p>
          Battery Consumption per day:
          {{ tabletsWithIssue[i].batteryConsumptionPerDay?.toFixed(2) || 'NA' }}
        </p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.school-details {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.school-details ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
}

.school-details li {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  padding: 10px;
  border: 1px solid black;
}

@media (max-width: 600px) {
  .school-details ul {
    flex-direction: column;
  }
}
</style>

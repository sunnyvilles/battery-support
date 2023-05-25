<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBatteryStore } from '@/stores/batteryStore'
import { fetchAllSchoolsData } from '@/services/api'
import type { ITabletRecord } from '@/models/BatteryData'

const router = useRouter()
const { setAllSchoolsData, getSchoolsWithNumberOfBadTablets } = useBatteryStore()

// schools sorted by battery issues
const sortedSchoolsData = computed(() =>
  getSchoolsWithNumberOfBadTablets().sort((a, b) => b.numberOfBadTablets - a.numberOfBadTablets)
)

// Define a function that emits a custom event with the school id
function selectSchool(academyId: number) {
  router.push({ name: 'detail', params: { id: academyId } })
}

onMounted(async () => {
  let response: ITabletRecord[] = await fetchAllSchoolsData()
  setAllSchoolsData(response)
})
</script>

<template>
  <div class="school-list">
    <h2>Schools with Battery Issues</h2>
    <ul>
      <li v-for="school in sortedSchoolsData" :key="school.academyId" :data-id="school.academyId"
        @click="selectSchool(school.academyId)">
        <h3>{{ `Acedemy ${school.academyId}` }}</h3>
        <p>{{ school.numberOfBadTablets }} tablets need battery replacement</p>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.school-list {
  display: flex;
  flex-direction: column;

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid black;
    cursor: pointer;
  }
}

@media (max-width: var(--breakpoint)) {
  .school-list ul {
    flex-direction: column;

    li {
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>

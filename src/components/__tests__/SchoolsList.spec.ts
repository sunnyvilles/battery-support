import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useBatteryStore } from '@/stores/batteryStore'
import { useRouter } from 'vue-router'
import * as apiService from '@/services/api'
import SchoolsList from '@/components/SchoolsList.vue'

const mockSortedSchoolsData = [
  { academyId: 1, numberOfBadTablets: 3 },
  { academyId: 2, numberOfBadTablets: 2 }
]

vi.mock('@/services/api')

vi.mock('vue-router', () => ({
  useRoute: () => vi.fn(),
  useRouter: vi.fn(() => ({
    push: vi.fn()
  }))
}))

describe('SchoolsList', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    //setActivePinia(createPinia());
    vi.resetAllMocks()
    wrapper = shallowMount(SchoolsList, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
            initialState: {
              allSchoolsData: mockSortedSchoolsData
            }
          })
        ]
      }
    })

    useBatteryStore()
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('fetches all schools data and sets it on mount', async () => {
    const fetchAllSchoolsDataSpy = vi.spyOn(apiService, 'fetchAllSchoolsData')

    apiService.fetchAllSchoolsData()
    expect(fetchAllSchoolsDataSpy).toHaveBeenCalled()
    expect(fetchAllSchoolsDataSpy.mock.calls.length).toBe(1)
  })

  it('calls router when selecting a school', () => {
    const mockAcademyId = 1

    wrapper.setProps({ id: mockAcademyId })

    expect(vi.mocked(useRouter)).toHaveBeenCalled()
  })
})

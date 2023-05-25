import type { IDataByTablet } from '../models/BatteryData'

// calculate daily battery consumption for a tablet, accurate upto a minute
export const calculateBatteryConsumptionPerDay = (tablet: IDataByTablet): number => {
  const batteryLevels: number[] = tablet.batteryLevelsList
  const timestamps = tablet.timestampsList

  let totalBattery = 0
  let totalTime = 0
  let totalDataPoints = 0 // how many contineous entries have been calculated
  let maxConsumptionFactor = 0

  for (let i = 1; i < batteryLevels.length; i++) {
    const batteryDiff = batteryLevels[i - 1] - batteryLevels[i]
    const timeDiff = new Date(timestamps[i]).getTime() - new Date(timestamps[i - 1]).getTime()
    totalDataPoints++

    // If the battery level decreases, reset datapoints if increases, this way at least two data points are calculated.
    if (batteryDiff >= 0) {
      totalBattery += batteryDiff
      totalTime += timeDiff
    } else {
      if (totalDataPoints > 1 && totalTime > 0) {
        const currentConsumptionFactor = calculateConsumptionFactor(totalBattery, totalTime)
        if (currentConsumptionFactor > maxConsumptionFactor)
          maxConsumptionFactor = currentConsumptionFactor
      }
      totalDataPoints = 0
      totalBattery = 0
      totalTime = 0
    }
  }
  return calculateConsumption(maxConsumptionFactor)
}

function calculateConsumptionFactor(totalBattery: number, totalTime: number): number {
  return totalBattery / totalTime
}
// milisecond to hour , multiply 100 for %
function calculateConsumption(batteryConsumptionPerMiliSecond: number) {
  return batteryConsumptionPerMiliSecond * 60 * 60 * 24 * 1000 * 100
}

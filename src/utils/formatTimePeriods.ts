import getTimePeriods from './getTimePeriods'

const formatTimePeriod = (periods: ReturnType<typeof getTimePeriods>, excludePeriods = []) => {
  const textArr = []

  Object.keys(periods).forEach((period) => {
    if (periods[period] > 0 && !excludePeriods.includes(period)) {
      textArr.push(`${periods[period]}${period.substr(0, 1)}`)
    }
  })

  if (textArr.length === 0) {
    return null
  }

  return textArr.join(' ')
}

export default formatTimePeriod

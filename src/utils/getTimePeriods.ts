import {
  DAY_IN_SECONDS,
  HOUR_IN_SECONDS,
  MINUTE_IN_SECONDS,
  MONTH_IN_SECONDS,
  YEAR_IN_SECONDS,
} from '@app/config/constants/times'

/**
 * Format number of seconds into year, month, day, hour, minute, seconds
 */
const getTimePeriods = (seconds: number) => {
  let delta = Math.abs(seconds)
  const timeLeft = {
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  }

  if (delta >= YEAR_IN_SECONDS) {
    timeLeft.years = Math.floor(delta / YEAR_IN_SECONDS)
    delta -= timeLeft.years * YEAR_IN_SECONDS
  }

  if (delta >= MONTH_IN_SECONDS) {
    timeLeft.months = Math.floor(delta / MONTH_IN_SECONDS)
    delta -= timeLeft.months * MONTH_IN_SECONDS
  }

  if (delta >= DAY_IN_SECONDS) {
    timeLeft.days = Math.floor(delta / DAY_IN_SECONDS)
    delta -= timeLeft.days * DAY_IN_SECONDS
  }

  if (delta >= HOUR_IN_SECONDS) {
    timeLeft.hours = Math.floor(delta / HOUR_IN_SECONDS)
    delta -= timeLeft.hours * HOUR_IN_SECONDS
  }

  if (delta >= MINUTE_IN_SECONDS) {
    timeLeft.minutes = Math.floor(delta / MINUTE_IN_SECONDS)
    delta -= timeLeft.minutes * MINUTE_IN_SECONDS
  }

  timeLeft.seconds = delta

  return timeLeft
}

export default getTimePeriods

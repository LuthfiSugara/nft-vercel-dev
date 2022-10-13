/**
 * Returns true if the string value is zero in hex
 */
export default function isZero(hexNumberString: string) {
  return /^0x0*$/.test(hexNumberString)
}

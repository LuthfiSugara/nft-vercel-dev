import { ID } from '@app/config/localization/languages'
import { useTranslation } from '@app/context/Localization'

const useCurrency = () => {
  const { currentLanguage } = useTranslation()
  const formatter = Intl.NumberFormat(currentLanguage.code, {
    currency: currentLanguage === ID ? 'IDR' : 'USD',
    style: 'currency',
  })
  return formatter
}

export default useCurrency

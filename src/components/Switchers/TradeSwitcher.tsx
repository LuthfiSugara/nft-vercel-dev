import { useRouter } from 'next/router'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useTranslation } from '@app/context/Localization'

const liquidityAlias = ['/liquidity', '/add', '/remove']

export default function TradeSwitcher() {
  const { pathname, push } = useRouter()
  const { t } = useTranslation()
  return (
    <ButtonGroup rounded="3xl" variant="solid" isTruncated bg="gicv.dark" p={1}>
      <Button
        colorScheme={pathname.includes('/swap') ? 'primary' : 'gicv.dark'}
        color="white"
        rounded="3xl"
        // isActive={pathname.includes('/swap')}
        onClick={() => push('/swap')}
      >
        {t('Swap')}
      </Button>
      <Button
        colorScheme={liquidityAlias.includes(pathname) ? 'primary' : 'gicv.dark'}
        color="white"
        rounded="3xl"
        // isActive={liquidityAlias.includes(pathname)}
        onClick={() => push('/liquidity')}
      >
        {t('Liquidity')}
      </Button>
    </ButtonGroup>
  )
}

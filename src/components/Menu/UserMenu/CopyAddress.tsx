import styled from '@emotion/styled'
import { useTranslation } from '@app/context'
import { Box, Flex, FlexProps, IconButton, Text, useClipboard } from '@chakra-ui/react'
import { CopyIcon } from '@chakra-ui/icons'
import theme from '@app/config/theme'

interface CopyAddressProps extends FlexProps {
  account: string
}

const Tooltip = styled(Box)<{ isTooltipDisplayed: boolean }>`
  display: ${({ isTooltipDisplayed }) => (isTooltipDisplayed ? 'inline-block' : 'none')};
  position: absolute;
  right: 0;
  text-align: center;
  opacity: 0.7;
`

const CopyAddress: React.FC<CopyAddressProps> = ({ account, ...props }) => {
  const { t } = useTranslation()
  const { onCopy, hasCopied } = useClipboard(account)

  const copyAddress = () => {
    onCopy()
  }

  return (
    <Flex position="relative" alignItems={'center'} justifyContent={'space-between'} {...props}>
      <Text fontSize={['1vw', '1vw', '0.9vw']}>{account}</Text>
      <IconButton
        p={0}
        minW={['1vw', '1vw', '1.7vw']}
        h={['1vw', '1vw', '1.7vw']}
        aria-label="Copy Address"
        variant="ghost"
        onClick={copyAddress}
        icon={<CopyIcon w={['1vw', '1vw', '1vw']} h={['1vw', '1vw', '1vw']} />}
      />
      <Tooltip
        isTooltipDisplayed={hasCopied}
        bgColor={'lightgray'}
        borderRadius={['1vw', '1vw', '0.5vw']}
        top={['-1vw', '-1vw', '-2.5vw']}
        right={['1vw', '1vw', '0.2vw']}
        p={['1vw', '1vw', '0.5vw']}
        fontSize={['1vw', '1vw', '0.7vw']}
        fontWeight={'bold'}
      >
        {t('Copied')}
      </Tooltip>
    </Flex>
  )
}

export default CopyAddress

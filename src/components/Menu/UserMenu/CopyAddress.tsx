import styled from '@emotion/styled'
import { useTranslation } from '@app/context'
import { Box, Flex, FlexProps, IconButton, useClipboard } from '@chakra-ui/react'
import { CopyIcon } from '@chakra-ui/icons'
import theme from '@app/config/theme'

interface CopyAddressProps extends FlexProps {
  account: string
}

const Wrapper = styled(Flex)`
  align-items: center;
  border-radius: 16px;
  position: relative;
`

const Address = styled.div`
  flex: 1;
  position: relative;
  padding-left: 16px;

  & > input {
    background: transparent;
    border: 0;
    display: block;
    font-weight: 600;
    font-size: 16px;
    padding: 0;
    width: 100%;

    &:focus {
      outline: 0;
    }
  }

  &:after {
    background: linear-gradient(to right);
    content: '';
    height: 100%;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    width: 40px;
  }
`

const Tooltip = styled.div<{ isTooltipDisplayed: boolean }>`
  display: ${({ isTooltipDisplayed }) => (isTooltipDisplayed ? 'inline-block' : 'none')};
  background-color: ${theme.colors.gicv.gray[200]};
  color: ${theme.colors.gicv.dark};
  position: absolute;
  padding: 8px;
  top: -38px;
  right: 0;
  text-align: center;
  border-radius: 16px;
  opacity: 0.7;
  width: 100px;
`

const CopyAddress: React.FC<CopyAddressProps> = ({ account, ...props }) => {
  const { t } = useTranslation()
  const { onCopy, hasCopied } = useClipboard(account)

  const copyAddress = () => {
    onCopy()
  }

  return (
    <Box position="relative" {...props}>
      <Wrapper bg="gicv.light" p="2">
        <Address title={account}>
          <input type="text" readOnly value={account} />
        </Address>
        <IconButton
          aria-label="Copy Address"
          colorScheme="primary"
          variant="ghost"
          onClick={copyAddress}
          icon={<CopyIcon color="primary" width="24px" />}
        />
      </Wrapper>
      <Tooltip isTooltipDisplayed={hasCopied}>{t('Copied')}</Tooltip>
    </Box>
  )
}

export default CopyAddress

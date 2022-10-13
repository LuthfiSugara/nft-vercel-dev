import Balance from '@app/components/Balance'
import ConnectWalletButton from '@app/components/Buttons/ConnectWalletButton'
import { useTranslation } from '@app/context'
import { DeserializedPool } from '@app/store/typed'
import { BIG_ZERO } from '@app/utils/bigNumber'
import { getBalanceNumber } from '@app/utils/formatBalance'
import { Text, Divider, VStack, Flex, Tag, Collapse, Box, Button, useDisclosure, Image } from '@chakra-ui/react'
import BigNumber from 'bignumber.js'
import AprRow from './PoolCard/AprRow'
import CardActions from './PoolCard/CardActions'
// import ApprovalAction from './PoolCard/CardActions/ApprovalAction'
import StyledCardHeader from './PoolCard/StyledCardHeader'


const PoolsCard: React.FC<{ pool: DeserializedPool; account: string; userDataLoaded: boolean }> = ({ pool, account, userDataLoaded }) => {
  const { sousId, stakingToken, earningToken, isFinished, userData } = pool
  const { isOpen, onToggle } = useDisclosure()
  const { t } = useTranslation()
  const stakedBalance = userData?.stakedBalance ? new BigNumber(userData.stakedBalance) : BIG_ZERO
  const isStaked = stakedBalance.gt(0)
  const stakedTokenBalance = getBalanceNumber(stakedBalance, stakingToken.decimals)
  const isLoading = !userData || !userDataLoaded
  const accountHasStakedBalance = stakedBalance.gt(0)

  return (
    <Flex justifyContent={'center'} mb={['12vw', '12vw', '4vw']}>
      <Box w={['80vw', '80vw', '28vw', '22vw']} rounded={['6vw', '6vw', '2vw', '2vw']} bg={'legion.light'} >
        <VStack roundedTop={['6vw', '6vw', '2vw', '2vw']} align="flex-start" bg="legion.dark" p={['7vw', '7vw', '2.5vw', '2vw']}>
          {/* <Heading color="legion.secondary">LEGION</Heading> */}
          <StyledCardHeader
            isStaking={accountHasStakedBalance}
            earningToken={earningToken}
            stakingToken={stakingToken}
            isFinished={isFinished && sousId !== 0}
          />
            
          {/* <Text fontSize="lg" fontWeight="bold" letterSpacing="wider">
            Stake LEGION, Earn LEGION
          </Text> */}

          {/* <Heading color="legion.secondary">{t("Earn")} {earningToken.symbol}</Heading>
          <Text fontSize="lg" fontWeight="bold" letterSpacing="wider">
            {t('Stake')} {stakingToken.symbol}
          </Text> */}
        </VStack>
        <VStack align="stretch" fontWeight="bold" p={['5vw', '5vw', '2vw', '1.5vw']}>
          {/* <Flex alignItems="center" justifyContent="space-between" py="4" px="5"> */}
            {/* <Text>APR :</Text>
            <Text>~ %</Text> */}
            <AprRow pool={pool} stakedBalance={stakedBalance} />
          {/* </Flex> */}
          {/* {content.length > 0 && ( */}
            {/* <VStack align="stretch" py="4" px="5">
              <Text>Recent LEGION profit:</Text>
              <Text>content</Text>
            </VStack> */}
          {/* )} */}
          <VStack spacing={4} align="stretch">
            {/* <Text letterSpacing="wide">START EARNING</Text>
            <Button colorScheme="primary" color="white" py={[5, 6]} rounded="xl">
              {account ? 'Enable' : 'Unlock Wallet'}
            </Button> */}
            {account ? (
              <CardActions pool={pool} stakedBalance={stakedBalance} userDataLoaded={userDataLoaded} />
            ) : (
              <>
                <Text textTransform="uppercase" fontSize={['3.4vw', '3.4vw', '1.1vw', '0.8vw']} color="textSubtle" mt={['4vw', '4vw', '1.3vw', '1vw']}>
                  {t('Start earning')}
                </Text>
                <ConnectWalletButton 
                  fontSize={['4.5vw', '4.5vw', '1.4vw', '1vw']}
                  py={['5vw', '5vw', '1.7vw', '1.4vw']}
                  px={['4.5vw', '4.5vw', '1.8vw', '1.5vw']}
                  borderRadius={['2vw', '2vw', '0.5vw']} 
                />
              </>
            )}
            {/* {needsApproval ? (
              <ApprovalAction pool={pool} isLoading={isLoading} />
            ) : {(
              <StakeActions
                isLoading={isLoading}
                pool={pool}
                stakingTokenBalance={stakingTokenBalance}
                stakedBalance={stakedBalance}
                isBnbPool={isBnbPool}
                isStaked={isStaked}
              />
            )}} */}
          </VStack>
          <Divider pt={['4vw', '4vw', '1vw', '1vw']} />
          <Flex align="center" justify="space-between" pt={['4vw', '4vw', '1vw']}>
            <Tag p={['2vw', '2vw', '0.6vw', '0.5vw']} bg="inherit" borderRadius={['2vw', '2vw', '0.5vw']}  border="1px" borderColor="legion.secondary">
              {/* {stat} */}
              <Text fontSize={['4vw', '4vw', '1.4vw', '1vw']}>
                Manual
              </Text>
            </Tag>
            <Button 
              onClick={onToggle} 
              variant="ghost"
              display="flex"
              alignItems="center"
              justifyContent={['center', 'space-between']}
              p={['2vw', '2vw', '0.7vw', '0.5vw']}
            >
              <Text fontSize={['4vw', '4vw', '1.4vw', '1vw']} mr={['2vw', '2vw', '0.5vw']}>
                {isOpen ? 'Hide' : 'Details'}
              </Text>
              <Image
                src={'/svg/chevron-down-icon.svg'}
                transform={`rotate(${isOpen ? 180 : 0}deg)`}
                transition="transform"
                transitionDuration="200ms"
                alt={isOpen ? 'Close' : 'Open'}
              />
            </Button>
          </Flex>
          <Collapse in={isOpen} unmountOnExit>
            <VStack align="flex-end" pt={['2vw', '2vw', '0.7vw', '0.5vw']}>
              <Flex w="full" alignItems="center" justify="space-between">
                <Text fontSize={['4vw', '4vw', '1.4vw', '1vw']}>Total staked</Text>
                {/* {isLoading && <Skeleton width="120px" height="25px" rounded="2xl" />} */}
                {isLoading && <Balance fontSize={['4vw', '4vw', '1.4vw', '1vw']} decimals={2} value={0} />}
                {!isLoading && isStaked && <Balance fontSize={['4vw', '4vw', '1.4vw', '1vw']} decimals={2} value={stakedTokenBalance} />}
                {!isLoading && !isStaked && <Balance fontSize={['4vw', '4vw', '1.4vw', '1vw']} decimals={2} value={0} />}
                {/* <Text>~</Text> */}
                {/* <Text>detail totalStaked</Text> */}
              </Flex>
              {/* {detail.performanceFee && (
                <Flex w="full" alignItems="center" justify="space-between">
                  <Text>Performance Fee</Text>
                  <Text>{detail.performanceFee + '%'}</Text>
                </Flex>
              )} */}
              <Button fontSize={['4vw', '4vw', '1.4vw', '1vw']} colorScheme="primary" variant="link">
                View Project Site
              </Button>
              <Button fontSize={['4vw', '4vw', '1.4vw', '1vw']} colorScheme="primary" variant="link">
                View Contract
              </Button>
            </VStack>
          </Collapse>
        </VStack>
      </Box>
    </Flex>
  )
}

export default PoolsCard
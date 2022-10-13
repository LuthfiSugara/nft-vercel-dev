import React from 'react'
// import React, { useState, useCallback } from 'react'
// import Link from 'next/link' 
// import BigNumber from 'bignumber.js'
// import { usePriceLegionBusd } from '@app/store/farms/hooks' 
// import { useToastApp } from '@app/hooks' 
// import { useMasterchef } from '@app/hooks' 
// import { harvestFarm } from '@app/utils/calls' 
import Balance from '@app/components/Balance' 
// import useFarmsWithBalance from '../../hooks/useFarmsWithBalance' 
// import { getEarningsText } from '../UserBanner/EarningsText' 
import { Box, Heading, Text, Button } from '@chakra-ui/react'
import { useTranslation } from '@app/context/Localization'
// import { useWeb3React } from '@web3-react/core'

const Collect: React.FC = () => {
  const { t } = useTranslation()
  const title = t('Farm & Pools')
  // const { active } = useWeb3React()
  // const [pendingTx, setPendingTx] = useState(false)
  // const { toastSuccess, toastError } = useToastApp()
  // const { farmsWithStakedBalance, earningsSum: farmEarningsSum } = useFarmsWithBalance()
  // const masterChefContract = useMasterchef()
  // const legionPriceBusd = usePriceLegionBusd()
  // const earningsBusd = new BigNumber(farmEarningsSum).multipliedBy(legionPriceBusd)
  // const numTotalToCollect = farmsWithStakedBalance.length
  // const numFarmsToCollect = farmsWithStakedBalance.filter((value) => value.pid !== 0).length
  // const hasLegionPoolToCollect = numTotalToCollect - numFarmsToCollect > 0
  // const earningsText = getEarningsText(numFarmsToCollect, hasLegionPoolToCollect, earningsBusd, t)
  // const [preText, toCollectText] = earningsText.split(earningsBusd.toString())

  // const harvestAllFarms = useCallback(async () => {
  //   setPendingTx(true)
  //   // eslint-disable-next-line no-restricted-syntax
  //   for (const farmWithBalance of farmsWithStakedBalance) {
  //     try {
  //       // eslint-disable-next-line no-await-in-loop
  //       await harvestFarm(masterChefContract, farmWithBalance.pid)
  //       toastSuccess(
  //         `${t('Collected')}!`,
  //         t('Your %symbol% earnings have been sent to your wallet!', { symbol: 'LEGION' }),
  //       )
  //     } catch (error) {
  //       toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
  //     }
  //   }
  //   setPendingTx(false)
  // }, [farmsWithStakedBalance, masterChefContract, toastSuccess, toastError, t])


  return (
    // <Box 
    //   pos={'relative'} 
    //   display={'flex'} 
    //   justifyContent={['center', 'center', 'right']} 
    //   px={['4vw', '4vw', '6vw']}
    //   pt={['110vw', '110vw', '10vw']} 
    // >
    //   <Box
    //     position={'relative'}
    //     display="flex"
    //     alignItems="center"
    //     flexDirection="column"
    //     bg={'legion.dark'}
    //     w={['full', 'full', '23.5vw']}
    //     h={['130vw', '130vw', '30vw']}
    //     rounded={['5vw', '5vw', '1vw']}
    //     px={['7vw', '7vw', '2vw']}
    //     py={['9vw', '9vw', '3vw']}
    //   >
    //     <Heading fontSize={['9vw', '9vw', '1.8vw']} fontWeight={'bold'}>
    //       {title}
    //     </Heading>
    //     <Box mt={['20vw', '20vw', '4vw']}>
    //       {preText && (
    //         <Text color="textSubtle">
    //           {preText}
    //         </Text>
    //       )}
    //       { !active ? (
    //         <Balance
    //           decimals={0}
    //           fontSize={['12vw', '12vw', '3vw']}
    //           fontWeight={'bold'}
    //           prefix={'$'}
    //           value={0}
    //         />
    //       ) : !earningsBusd.isNaN() ? (
    //         // <Balance
    //         //   decimals={earningsBusd.gt(0) ? 2 : 0}
    //         //   fontSize={['12vw', '12vw', '3vw']}
    //         //   fontWeight={'bold'}
    //         //   prefix={earningsBusd.gt(0) ? '~$' : '$'}
    //         //   value={earningsBusd.toNumber()}
    //         // />
    //         <Balance
    //           decimals={earningsBusd.gt(0) ? 2 : 0}
    //           fontSize={['12vw', '12vw', '3vw']}
    //           fontWeight={'bold'}
    //           prefix={earningsBusd.gt(0) ? '~$' : '$'}
    //           value={0}
    //         />
    //       ) :  (
    //         // <Skeleton width={['50vw', '50vw', '13vw']} height={['18vw', '18vw', '4.5vw']} />
    //         <Balance
    //           decimals={earningsBusd.gt(0) ? 2 : 0}
    //           fontSize={['12vw', '12vw', '3vw']}
    //           fontWeight={'bold'}
    //           prefix={earningsBusd.gt(0) ? '~$' : '$'}
    //           value={0}
    //         />
    //         )}
    //   </Box>
    //     <Text 
    //       textAlign={'center'} 
    //       fontSize={['5vw', '5vw', '1.2vw']}
    //       fontWeight={'medium'}
    //       color="textSubtle"
    //       mt={['7vw', '7vw', '1vw']}
    //     >
    //       {toCollectText}
    //     </Text>
    //     {!active || numTotalToCollect <= 0 ? (
    //       <Link href="/farms" passHref>
    //         <Button 
    //           width="full"
    //           mt="auto" 
    //           rounded="xl" 
    //           colorScheme="primary" 
    //           color="white" 
    //           fontSize={['6vw', '6vw', '1.3vw']} 
    //           fontWeight={'bold'}
    //           py={['8vw', '8vw', '1.6vw']}
    //         >
    //           <Text color="primary">
    //             {t('Start Earning')}
    //           </Text>
    //         </Button>
    //       </Link>
    //     ) : (
    //       <Button
    //         width="full"
    //         mt="auto" 
    //         rounded="xl" 
    //         colorScheme="primary" 
    //         color="white" 
    //         fontSize={['6vw', '6vw', '1.3vw']} 
    //         fontWeight={'bold'}
    //         py={['8vw', '8vw', '1.6vw']}
    //         id="harvest-all"
    //         isLoading={pendingTx}
    //         disabled={pendingTx}
    //         onClick={harvestAllFarms}
    //       >
    //         <Text color="invertedContrast">
    //           {pendingTx ? t('Collecting') : t('Collect all')}
    //         </Text>
    //       </Button>
    //     )}
    //   </Box>
    // </Box>
      <Box 
        pos={'relative'} 
        display={'flex'} 
        justifyContent={['center', 'center', 'right']} 
        px={['4vw', '4vw', '6vw']}
        pt={['110vw', '110vw', '10vw']} 
      >
        <Box
          position={'relative'}
          display="flex"
          alignItems="center"
          flexDirection="column"
          bg={'legion.dark'}
          w={['full', 'full', '23.5vw']}
          h={['130vw', '130vw', '30vw']}
          rounded={['5vw', '5vw', '1vw']}
          px={['7vw', '7vw', '2vw']}
          py={['9vw', '9vw', '3vw']}
        >
          <Heading fontSize={['9vw', '9vw', '1.8vw']} fontWeight={'bold'}>
            {title}
          </Heading>
          <Box mt={['20vw', '20vw', '4vw']}>
            <Balance
              decimals={0}
              fontSize={['12vw', '12vw', '3vw']}
              fontWeight={'bold'}
              prefix={'$'}
              value={0}
            />
          </Box>
          <Text 
            textAlign={'center'} 
            fontSize={['5vw', '5vw', '1.2vw']}
            fontWeight={'medium'}
            color="textSubtle"
            mt={['7vw', '7vw', '1vw']}
          >
            {t("to Collect")}
          </Text>
          <Button 
            width="full"
            mt="auto" 
            rounded="xl" 
            colorScheme="primary" 
            color="white" 
            fontSize={['6vw', '6vw', '1.3vw']} 
            fontWeight={'bold'}
            py={['8vw', '8vw', '1.6vw']}
            disabled={true}
          >
          <Text color="primary">
            {t('Start Earning')}
          </Text>
        </Button>
      </Box>
    </Box>
  )
}
export default Collect

import Balance from '@app/components/Balance'
import { useTranslation } from '@app/context'
import { Box, Grid, GridItem, Text } from '@chakra-ui/react'
import Image from 'next/image'

const DashboardCard = ({ imageSrc, title, value, prefix = '' }) => {
  const { t } = useTranslation()
  return (
    <Box
      bg={'brand.bg.12'}
      backdropFilter={['blur(3vw)', 'blur(3vw)', 'blur(0.7vw)']}
      border={[
        '1vw solid rgba(255, 255, 255, 1)',
        '1vw solid rgba(255, 255, 255, 1)',
        '0.2vw solid rgba(255, 255, 255, 1)',
      ]}
      borderRadius={['3vw', '3vw', '1vw']}
      px={['3vw', '3vw', '1vw']}
      py={['6vw', '6vw', '1vw']}
      w={'100%'}
    >
      <Grid
        templateRows={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(3, 1fr)']}
        templateColumns={['repeat(3, 1fr)', 'repeat(3, 1fr)', 'repeat(1, 1fr)']}
        h={['auto', 'auto', 'auto']}
        gap={[0, 0, '0.5vw']}
      >
        <GridItem display={'flex'} justifyContent={'center'} alignItems={'center'} rowSpan={2} colSpan={1}>
          <Box pos={'relative'} w={['20vw', '20vw', '7vw']} h={['20vw', '20vw', '7vw']} overflow={'hidden'}>
            <Image src={imageSrc} layout="fill" objectFit="contain" alt={''} placeholder={'blur'} />
          </Box>
        </GridItem>
        <GridItem display={'flex'} justifyContent={'center'} alignItems={'center'} rowSpan={1} colSpan={[2, 2, 1]}>
          <Box>
            <Text textAlign={'center'} fontSize={['4.5vw', '4.5vw', '1vw']} fontWeight={'extrabold'}>
              {t(title)}
            </Text>
            <Balance
              value={value}
              decimals={0}
              prefix={prefix}
              textAlign={'center'}
              fontSize={['12vw', '12vw', '2vw']}
              fontWeight={'extrabold'}
            />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  )
}

export default DashboardCard

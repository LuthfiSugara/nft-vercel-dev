import { memo } from 'react'
import { Box, BoxProps, Center, Grid, GridItem, Heading, HStack, Text } from '@chakra-ui/react'
import { footerItems } from '@app/mocks'
import Link from 'next/link'
import Image from 'next/image'

const Footer: React.FC<BoxProps> = (props) => {
  return (
    <Box pos={'relative'} bg={'legion.light'} px={'8vw'} py={['12vw', '12vw', '3.5vw']} {...props}>
      <Grid
        templateRows={['repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(1, 1fr)', 'repeat(1, 1fr)']}
        templateColumns={['repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(6, 1fr)', 'repeat(7, 1fr)']}
        gap={4}
      >
        <GridItem rowSpan={1} colSpan={[2, 2, 3]} display={'flex'} justifyContent={'center'}>
          <Center w={['53vw', '53vw', '14vw']}>
            <Image src={footerItems.footerLogoIcon} alt={''} placeholder={'blur'} />
          </Center>
        </GridItem>
        <GridItem rowSpan={1} colSpan={1} display={'flex'} justifyContent={'center'}>
          <Box>
            <Heading fontSize={['6vw', '6vw', '1.3vw']} fontWeight={'bold'} mb={['2vw', '2vw', '0.8vw']}>
              About
            </Heading>
            {footerItems.aboutItems.map((item, idx) => (
              <Link href={item.path ? item.path : '#'} passHref key={`aboutItem__${item.label}__${idx}`}>
                <Text
                  w={'fit-content'}
                  fontSize={['4.5vw', '4.5vw', '1.1vw']}
                  fontWeight={'regular'}
                  cursor={'pointer'}
                >
                  {item.label}
                </Text>
              </Link>
            ))}
          </Box>
        </GridItem>
        <GridItem rowSpan={1} colSpan={1} display={'flex'} justifyContent={'center'}>
          <Box>
            <Heading fontSize={['6vw', '6vw', '1.3vw']} fontWeight={'bold'} mb={['2vw', '2vw', '0.8vw']}>
              Products
            </Heading>
            {footerItems.productsItems.map((item, idx) => (
              <Link href={item.path ? item.path : '#'} passHref key={`productsItem__${item.label}__${idx}`}>
                <Text
                  w={'fit-content'}
                  fontSize={['4.5vw', '4.5vw', '1.1vw']}
                  fontWeight={'regular'}
                  cursor={'pointer'}
                >
                  {item.label}
                </Text>
              </Link>
            ))}
          </Box>
        </GridItem>
        <GridItem rowSpan={1} colSpan={[2, 2, 1]} display={'flex'} justifyContent={'center'}>
          <Box>
            <Heading fontSize={['6vw', '6vw', '1.3vw']} fontWeight={'bold'} mb={['2vw', '2vw', '0.8vw']}>
              Community
            </Heading>
            <HStack spacing={[3, 3, 1, 2]} justifyContent={['center', 'center', 'left']}>
              {footerItems.communityItems.map((item, idx) => (
                <Link href={item.path ? item.path : '#'} passHref key={`communityItem__${item.label}__${idx}`}>
                  <Text>{item.icon && <item.icon boxSize={['10vw', '10vw', '2.3vw']} cursor={'pointer'} />}</Text>
                </Link>
              ))}
            </HStack>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  )
}

export default memo(Footer)

import { ChangeEvent, memo, useState } from 'react'
import {
  Box,
  BoxProps,
  Button,
  Center,
  Divider,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react'
import { footerItems } from '@app/mocks'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ArrowForwardIcon, EmailIcon, SearchIcon } from '@chakra-ui/icons'

const Footer: React.FC<BoxProps> = (props) => {
  const router = useRouter()
  const [value, setValue] = useState('')
  return (
    <Box pos={'relative'} px={'15vw'} py={['12vw', '12vw', '3.5vw']} {...props}>
      <Grid
        templateRows={['repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)']}
        templateColumns={['repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(12, 1fr)']}
        gap={'6vw'}
        mb={'5vw'}
      >
        <GridItem rowSpan={1} colSpan={[2, 2, 7]}>
          <Text fontSize={'2.2vw'} fontWeight={'extrabold'}>
            Get in touch
          </Text>
          <Text fontSize={'0.95vw'}>
            Enim non justo, aenean fermentum nulla et turpis diam nisi non ornare tristique eget tristique nunc tellus
            egestas
          </Text>
          <HStack spacing={'1vw'} mt={'2vw'}>
            <InputGroup w={'30vw'} h={'3vw'}>
              <InputLeftElement pointerEvents="none" fontSize={'1vw'} w={'2vw'} h={'3vw'} py={0} px={'1.5vw'}>
                <EmailIcon color="gray" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Your email address"
                bgColor={'gicv.secondary'}
                borderRadius={'0.4vw'}
                borderColor={'gray'}
                fontSize={'0.8vw'}
                pl={'3vw'}
                h={'3vw'}
              />
            </InputGroup>
            <Button
              colorScheme={'primary'}
              fontSize={['1vw', '1vw', '1vw']}
              px={['1vw', '1vw', '2.5vw']}
              h={'3vw'}
              borderRadius={'0.4vw'}
              mt={'2vw'}
              // onClick={() => router.push('/gic-store')}
            >
              Send
              <ArrowForwardIcon ml={'1vw'} />
            </Button>
          </HStack>
        </GridItem>
        <GridItem rowSpan={1} colSpan={[2, 2, 5]}>
          <Box>
            <Text fontSize={'2.2vw'} fontWeight={'bold'}>
              Join the community
            </Text>
            <HStack spacing={[3, 3, '1vw']} justifyContent={['center', 'center', 'left']} mt={'1vw'}>
              {footerItems.communityItems.map((item, idx) => (
                <Link href={item.path ? item.path : '#'} passHref key={`communityItem__${item.label}__${idx}`}>
                  <Box border={'0.1vw solid'} borderColor={'gicv.gray.500'} borderRadius={'0.5vw'} p={'0.5vw'}>
                    <Text color={'gicv.gray.500'}>
                      {item.icon && <item.icon fontSize={'2vw'} cursor={'pointer'} />}
                    </Text>
                  </Box>
                </Link>
              ))}
            </HStack>
          </Box>
        </GridItem>
        <GridItem rowSpan={1} colSpan={[2, 2, 6]} pr={'9vw'}>
          <Text fontSize={'3vw'} fontWeight={'extrabold'}>
            GICVerse
          </Text>
          <Text fontSize={'0.95vw'}>
            Enim non justo, aenean fermentum nulla et turpis diam nisi non ornare tristique eget tristique nunc tellus
            egestas a viverra ipsum semper pulvinar vulputate
          </Text>
        </GridItem>
        <GridItem rowSpan={1} colSpan={2}>
          <Box>
            <Text fontSize={'1.5vw'} fontWeight={'bold'} mb={'1.5vw'}>
              Explore
            </Text>
            {footerItems.exploreItems.map((item, idx) => (
              <Link href={item.path ? item.path : '#'} passHref key={`exploreItem__${item.label}__${idx}`}>
                <Text
                  w={'fit-content'}
                  fontSize={['4.5vw', '4.5vw', '1.1vw']}
                  fontWeight={'regular'}
                  cursor={'pointer'}
                  mb={'0.5vw'}
                >
                  {item.label}
                </Text>
              </Link>
            ))}
          </Box>
        </GridItem>
        <GridItem rowSpan={1} colSpan={3}>
          <Box>
            <Text fontSize={'1.5vw'} fontWeight={'bold'} mb={'1.5vw'}>
              My Account
            </Text>
            {footerItems.myAccountItems.map((item, idx) => (
              <Link href={item.path ? item.path : '#'} passHref key={`myAccountItem__${item.label}__${idx}`}>
                <Text
                  w={'fit-content'}
                  fontSize={['4.5vw', '4.5vw', '1.1vw']}
                  fontWeight={'regular'}
                  cursor={'pointer'}
                  mb={'0.5vw'}
                >
                  {item.label}
                </Text>
              </Link>
            ))}
          </Box>
        </GridItem>
      </Grid>
      <Divider />
      <HStack justifyContent={'space-between'} my={'2vw'}>
        <Box>
          <Text fontSize={'1vw'}>&copy; {new Date().getFullYear()} PT. Global Investa Capital</Text>
        </Box>
        <HStack spacing={'3vw'}>
          <Link href={'/privacy-policy'} passHref>
            <Text w={'fit-content'} fontSize={['4.5vw', '4.5vw', '1.1vw']} fontWeight={'regular'} cursor={'pointer'}>
              Privacy Policy
            </Text>
          </Link>
          <Link href={'terms-of-service'} passHref>
            <Text w={'fit-content'} fontSize={['4.5vw', '4.5vw', '1.1vw']} fontWeight={'regular'} cursor={'pointer'}>
              Terms of Service
            </Text>
          </Link>
        </HStack>
      </HStack>
    </Box>
  )
}

export default memo(Footer)

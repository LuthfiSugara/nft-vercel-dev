import { useTranslation } from '@app/context'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  Grid,
  HStack,
  Input,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Auction from './Auction'
import Buy from './Buy'

const Marketplace: React.FunctionComponent = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { status } = router.query
  const initialCheckedQuantity = {
    all: true,
    single: false,
    bundle: false,
  }
  const [checkedStatus, setCheckedStatus] = useState({
    buy: status === 'buy',
    auction: status === 'auction',
    offers: status === 'offers',
  })
  const [checkedQuantity, setCheckedQuantity] = useState(initialCheckedQuantity)
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  useEffect(() => {
    setCheckedStatus({
      buy: status === 'buy',
      auction: status === 'auction',
      offers: status === 'offers',
    })
  }, [setCheckedStatus, status])

  return (
    <Flex pt={'2.7vw'}>
      <Box px={'3vw'} width={'22.5vw'} borderRight={'0.1vw solid'} borderColor={'gicv.gray.100'}>
        <Text fontSize={'1vw'} fontWeight={'bold'} borderBottom={'0.1vw solid'} borderColor={'gicv.gray.100'} p={'1vw'}>
          Filter
        </Text>
        <Box pt={'0.5vw'} px={'1vw'}>
          <Input
            type="text"
            bgColor={'gicv.secondary'}
            borderRadius={'0.4vw'}
            borderColor={'lightgray'}
            fontSize={'0.8vw'}
            fontWeight={'bold'}
            placeholder={'Search here...'}
            h={'3vw'}
            mt={'0.7vw'}
          />
        </Box>
        <Accordion defaultIndex={[0]} allowMultiple pt={'1vw'}>
          <Box borderTop={'0.1vw solid'} borderColor={'gicv.gray.100'}>
            <AccordionItem border={'none'}>
              <AccordionButton mt={'1vw'}>
                <HStack justifyContent={'space-between'} w={'full'}>
                  <Text fontSize={'0.8vw'} fontWeight={'bold'}>
                    Status
                  </Text>
                  <AccordionIcon />
                </HStack>
              </AccordionButton>
              <AccordionPanel>
                <VStack spacing={'0.5vw'}>
                  <Checkbox
                    isChecked={checkedStatus.buy}
                    onChange={() =>
                      setCheckedStatus((prevState) => ({
                        ...prevState,
                        buy: !checkedStatus.buy,
                      }))
                    }
                    w={'full'}
                  >
                    <Text fontSize={'0.8vw'} fontWeight={'bold'}>
                      Buy Now
                    </Text>
                  </Checkbox>
                  <Checkbox
                    isChecked={checkedStatus.auction}
                    onChange={() =>
                      setCheckedStatus((prevState) => ({
                        ...prevState,
                        auction: !checkedStatus.auction,
                      }))
                    }
                    w={'full'}
                  >
                    <Text fontSize={'0.8vw'} fontWeight={'bold'}>
                      On Auction
                    </Text>
                  </Checkbox>
                  <Checkbox
                    isChecked={checkedStatus.offers}
                    onChange={() =>
                      setCheckedStatus((prevState) => ({
                        ...prevState,
                        offers: !checkedStatus.offers,
                      }))
                    }
                    w={'full'}
                  >
                    <Text fontSize={'0.8vw'} fontWeight={'bold'}>
                      Has Offers
                    </Text>
                  </Checkbox>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Box>
        </Accordion>
        <Accordion defaultIndex={[0]} allowMultiple pt={'1vw'}>
          <Box borderTop={'0.1vw solid'} borderColor={'gicv.gray.100'}>
            <AccordionItem border={'none'}>
              <AccordionButton mt={'1vw'}>
                <HStack justifyContent={'space-between'} w={'full'}>
                  <Text fontSize={'0.8vw'} fontWeight={'bold'}>
                    Price
                  </Text>
                  <AccordionIcon />
                </HStack>
              </AccordionButton>
              <AccordionPanel>
                <VStack spacing={'1vw'}>
                  <HStack spacing={'0.5vw'} w={'full'}>
                    <Box bgColor={'gicv.gray.300'} p={'0.5vw'}>
                      <Text fontSize={'0.9vw'} fontWeight={'bold'} textTransform={'uppercase'}>
                        wgict
                      </Text>
                    </Box>
                    <Box>
                      <Input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        bgColor={'gicv.secondary'}
                        borderRadius={'0.4vw'}
                        borderColor={'lightgray'}
                        fontSize={'0.8vw'}
                        fontWeight={'bold'}
                        placeholder={'Min'}
                        px={'1vw'}
                        w={'3.8vw'}
                        h={'2.4vw'}
                      />
                    </Box>
                    <Box>
                      <Text fontSize={'0.9vw'} fontWeight={'bold'}>
                        to
                      </Text>
                    </Box>
                    <Box>
                      <Input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        bgColor={'gicv.secondary'}
                        borderRadius={'0.4vw'}
                        borderColor={'lightgray'}
                        fontSize={'0.8vw'}
                        fontWeight={'bold'}
                        placeholder={'Max'}
                        px={'1vw'}
                        w={'3.8vw'}
                        h={'2.4vw'}
                      />
                    </Box>
                  </HStack>
                  <Box w={'full'}>
                    <Button
                      disabled={minPrice === '' && maxPrice === ''}
                      colorScheme={'primary'}
                      fontSize={'0.9vw'}
                      w={'full'}
                      h={'2.5vw'}
                      borderRadius={'0.4vw'}
                      // onClick={() => router.push('/gic-store')}
                    >
                      Apply
                    </Button>
                  </Box>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Box>
        </Accordion>
        <Accordion defaultIndex={[0]} allowMultiple pt={'1vw'}>
          <Box borderTop={'0.1vw solid'} borderColor={'gicv.gray.100'}>
            <AccordionItem border={'none'}>
              <AccordionButton mt={'1vw'}>
                <HStack justifyContent={'space-between'} w={'full'}>
                  <Text fontSize={'0.8vw'} fontWeight={'bold'}>
                    Quantity
                  </Text>
                  <AccordionIcon />
                </HStack>
              </AccordionButton>
              <AccordionPanel>
                <VStack spacing={'0.5vw'}>
                  <Checkbox
                    isChecked={checkedQuantity.all}
                    onChange={() =>
                      setCheckedQuantity((prevState) => ({
                        ...prevState,
                        all: !checkedQuantity.all,
                      }))
                    }
                    w={'full'}
                  >
                    <Text fontSize={'0.8vw'} fontWeight={'bold'}>
                      All Items
                    </Text>
                  </Checkbox>
                  <Checkbox
                    isChecked={checkedQuantity.single}
                    onChange={() =>
                      setCheckedQuantity((prevState) => ({
                        ...prevState,
                        single: !checkedQuantity.single,
                      }))
                    }
                    w={'full'}
                  >
                    <Text fontSize={'0.8vw'} fontWeight={'bold'}>
                      Single Items
                    </Text>
                  </Checkbox>
                  <Checkbox
                    isChecked={checkedQuantity.bundle}
                    onChange={() =>
                      setCheckedQuantity((prevState) => ({
                        ...prevState,
                        bundle: !checkedQuantity.bundle,
                      }))
                    }
                    w={'full'}
                  >
                    <Text fontSize={'0.8vw'} fontWeight={'bold'}>
                      Bundle Items
                    </Text>
                  </Checkbox>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Box>
        </Accordion>
      </Box>
      <Box w={'full'}>
        <HStack justifyContent={'space-between'} px={'3vw'}>
          <Text fontSize={'1.5vw'} fontWeight={'bold'}>
            2114 Results
          </Text>
          <Select
            fontSize={'0.9vw'}
            fontWeight={'bold'}
            borderColor={'gicv.black'}
            placeholder="Select option"
            defaultValue={'price-low-to-high'}
            w={'15vw'}
          >
            <option value="recently-listed">Recently listed</option>
            <option value="recently-created">Recently created</option>
            <option value="recently-sold">Recently sold</option>
            <option value="price-low-to-high">Price low to high</option>
            <option value="price-high-to-low">Price high to low</option>
            <option value="highest-last-sale">Highest last sale</option>
          </Select>
        </HStack>
        {checkedStatus.buy && (
          <Box>
            <Grid
              templateColumns={'repeat(5,1fr)'}
              templateRows={'repeat(2,1fr)'}
              gap={'2vw'}
              w={'full'}
              px={'2vw'}
              mt={'2vw'}
            >
              {[...Array(15)].map((_, idx) => (
                <Grid key={idx} colSpan={1}>
                  <Buy />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
        {checkedStatus.auction && (
          <Box>
            <Grid
              templateColumns={'repeat(5,1fr)'}
              templateRows={'repeat(2,1fr)'}
              gap={'2vw'}
              w={'full'}
              px={'2vw'}
              mt={'2vw'}
            >
              {[...Array(15)].map((_, idx) => (
                <Grid key={idx} colSpan={1}>
                  <Auction />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
        {checkedStatus.buy || checkedStatus.auction ? (
          <Center>
            <Button
              variant={'outline'}
              fontSize={['1vw', '1vw', '1vw']}
              color={'gicv.gray.900'}
              px={['1vw', '1vw', '2.5vw']}
              h={'3vw'}
              border={'0.1vw solid'}
              borderColor={'gicv.gray.500'}
              borderRadius={'0.3vw'}
              mt={'2vw'}
            >
              {t('Load More')}
            </Button>
          </Center>
        ) : (
          <></>
        )}
      </Box>
    </Flex>
  )
}

export default Marketplace

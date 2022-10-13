import { Box, Button, Center, Heading, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { HomeProductProps } from '@app/mocks'
import Link from 'next/link'
import { useTranslation } from '@app/context'

interface ProductsItemProps{
    product: HomeProductProps
}

const ProductsItem: React.FC<ProductsItemProps> = ({product}) => {
    const { t } = useTranslation()
    return (
        <Box display={['flex', 'flex', 'unset', 'unset']} justifyContent={['center', 'center', 'left', 'left']}>
            <Box 
                background={'rgba(250, 250, 250, 0.4)'} 
                border={['0.5vw solid #FAFAFA', '0.5vw solid #FAFAFA', '0.2vw solid #FAFAFA']}
                boxSizing={'border-box'}
                boxShadow={['2vw 2vw 2vw rgba(0, 0, 0, 0.25)', '2vw 2vw 2vw rgba(0, 0, 0, 0.25)', '0.5vw 0.5vw 0.5vw rgba(0, 0, 0, 0.25)']}
                backdropFilter={['blur(3vw)', 'blur(3vw)', 'blur(1vw)']}
                borderRadius={['4vw', '4vw', '1vw']}
                width={['80vw', '80vw', '16vw']} 
                height={['110vw', '110vw', '26vw']} 
            >
                <Heading 
                    color="primary.900" 
                    textAlign={'right'} 
                    fontSize={['8vw', '8vw', '2.2vw']} 
                    fontWeight={'extrabold'} 
                    mt={['5vw', '5vw', '1.5vw']} 
                    mr={['5vw', '5vw', '1vw']}
                >
                    {product.label}
                </Heading>
                <Center py={[0, 0, '2vw']} px={['12vw', '12vw', '1vw']}>
                    <Center h={['72vw', '72vw', '11vw', '12vw', '13vw']}>
                        <Image src={product.icon} alt={''} placeholder={'blur'}/>
                    </Center>
                </Center>
                <Center>
                    {
                        product.path? (
                            <Link href={product.path} passHref>
                                <Button 
                                    rounded="md" 
                                    colorScheme="primary" 
                                    color="white" 
                                    fontSize={['5vw', '5vw', '1.2vw']} 
                                    fontWeight={'extrabold'}
                                    py={['7vw', '7vw', '1.5vw']}
                                    px={['18vw', '18vw', '3vw']}
                                >
                                    <Text color="primary">
                                        {t('Trade Now')}
                                    </Text>
                                </Button>
                            </Link>
                        ):(
                            <Heading color="primary.900" textAlign={'center'} fontSize={['7vw', '7vw', '1.5vw']} fontWeight={'extrabold'} mt={['-5vw', '-5vw', '-0.5vw']}>
                                Coming <br/> Soon
                            </Heading>   
                        )
                    }
                </Center>
            </Box>
        </Box>
  )
}

export default ProductsItem
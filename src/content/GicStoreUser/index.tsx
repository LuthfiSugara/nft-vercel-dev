import { GICStoreHero } from '@app/assets'
import { Box, Center, Image } from '@chakra-ui/react'
import React from 'react'

const Index = () => {
    return (
        <Box>
            <Box 
                backgroundImage="url('/images/GICStore/gic-store-user-hero-banner.png')"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                backgroundSize="100%"
                width={'100%'}
            >
                <Box>
                    <Center>
                        <Image 
                            src='https://res.cloudinary.com/practicaldev/image/fetch/s--i96Gcbyf--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://thepracticaldev.s3.amazonaws.com/uploads/user/profile_image/50592/f46e43c2-f4f0-4787-b34e-a310cecc221a.jpg'
                            alt='Profile'
                            boxSize='100px'
                            objectFit='cover'
                            borderRadius="full"
                        />
                    </Center>
                    <Center
                        
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default Index
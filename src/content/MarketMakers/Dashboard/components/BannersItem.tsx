import { HomeBlogProps } from '@app/mocks'
import { Center } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'

interface BannersItemProps {
  blog: HomeBlogProps
}

const BannersItem: React.FC<BannersItemProps> = ({ blog }) => {
  return (
    <Center>
      <Link href={blog.path ? blog.path : '#'} passHref>
        <Center pos={'relative'} w={['100%', '100%', '45vw']} h={['47vw', '47vw', '15vw']} overflow={'hidden'}>
          <Image src={blog.icon} layout="fill" objectFit="contain" alt={''} placeholder={'blur'} />
        </Center>
      </Link>
    </Center>
  )
}

export default BannersItem

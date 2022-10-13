import { HomeBlogProps } from "@app/mocks" 
import { Center } from "@chakra-ui/react"
import Image from "next/image"
import Link from "next/link"

interface BlogsItemProps{
    blog: HomeBlogProps
}

const BlogsItem: React.FC<BlogsItemProps> = ({blog}) => {
  return (
    <Center mx={['1vw', '1vw', '0.7vw']}>
      <Link href={blog.path ? blog.path : '#'} passHref>
        <Center borderRadius={['3.5vw', '3vw', '0.8vw']} overflow='hidden'>
          <Image src={blog.icon} width={'500%'} height={'250%'} alt={''} placeholder={'blur'}/>
        </Center>
      </Link>
    </Center>
  )
}

export default BlogsItem
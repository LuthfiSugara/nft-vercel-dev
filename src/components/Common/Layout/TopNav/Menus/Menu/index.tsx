import { Text } from '@chakra-ui/react'
import Link from 'next/link'
import * as React from 'react'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IMenuProps {
  title: string
  path: string
}

const Menu: React.FunctionComponent<IMenuProps> = (props) => {
  return (
    <Link href={`${props.path}`}>
      <a>
        <Text fontSize={['1vw', '1vw', '1vw']} fontWeight={'bold'}>{`${props.title}`}</Text>
      </a>
    </Link>
  )
}

export default Menu

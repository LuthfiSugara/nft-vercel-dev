// import Image from 'next/image'
// import BallanceIcon from '/svg/ballance-icon.svg'
import { Flex } from '@chakra-ui/react'
// import LangSwitcher from '../Switchers/LangSwitcher'
import { useSidebar } from '@app/context/Sidebar/useSidebar'
// import { useLegionBusdPrice } from '@app/hooks/useBUSDPrice'

const SidebarToolkit = () => {
  const { isSidebarOpen } = useSidebar()
  // const price = useLegionBusdPrice()
  return (
    <Flex px="4" justifyContent={'space-between'} align="center">
      {isSidebarOpen && (
        <>
          {/* <Skeleton isLoaded={!!price} minHeight="7">
            <Box display="flex" alignItems="center">
              <Image src={BallanceIcon} alt="Ballance" />
              <Text
                rounded="2xl"
                minW="20"
                fontWeight="bold"
                fontSize="17px"
                lineHeight="16.5px"
                letterSpacing="wider"
                color="gicv.secondary"
              >
                ${price?.toFixed(3)}
              </Text>
            </Box>
          </Skeleton>
          <LangSwitcher /> */}
        </>
      )}
    </Flex>
  )
}
export default SidebarToolkit

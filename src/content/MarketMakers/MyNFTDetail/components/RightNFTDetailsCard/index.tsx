import { GridItem, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import { withCustomScrollBar } from '@app/config/theme/withCustomScrollbar'
import MMOpenPositionsTabPanelItem from '../MMOpenPositionsTabPanelItem'
import MMOrderHistoriesTabPanelItem from '../MMOrderHistoriesTabPanelItem'

const RightNFTDetailsCard = ({ rowSpan, colSpan, mmid }) => {
  return (
    <GridItem
      bg={'legion.dark'}
      borderRadius={['3vw', '3vw', '1vw']}
      rowSpan={rowSpan}
      colSpan={colSpan}
      overflow={'hidden'}
    >
      <Tabs defaultIndex={0}>
        <TabList
          borderBottom={'none'}
          justifyContent={'space-around'}
          color={'legion.white'}
          pt={['2vw', '2vw', '0.7vw']}
          pb={['3vw', '3vw', '1vw']}
          px={'2vw'}
        >
          <Tab
            fontSize={['4vw', '4vw', '1vw']}
            fontWeight={'bold'}
            _focus={{}}
            _selected={{ color: 'legion.primary', borderBottom: '0.3vw solid', borderColor: 'legion.primary' }}
            py={['3vw', '3vw', '0.5vw']}
            px={['7vw', '7vw', '1.5vw']}
            mb={0}
          >
            Open Position
          </Tab>
          <Tab
            fontSize={['4vw', '4vw', '1vw']}
            fontWeight={'bold'}
            _focus={{}}
            _selected={{ color: 'legion.primary', borderBottom: '0.3vw solid', borderColor: 'legion.primary' }}
            py={['3vw', '3vw', '0.5vw']}
            px={['7vw', '7vw', '1.5vw']}
            mb={0}
          >
            History
          </Tab>
        </TabList>

        <TabPanels
          color={'legion.black'}
          maxH={['84.5vw', '84.5vw', '22vw']}
          overflowY={'scroll'}
          sx={withCustomScrollBar({ base: '1.5vw', md: '0.3vw' }, 'legion.primary', 'legion.white')}
        >
          <TabPanel p={0}>
            <MMOpenPositionsTabPanelItem mmid={mmid} />
          </TabPanel>
          <TabPanel p={0}>
            <MMOrderHistoriesTabPanelItem mmid={mmid} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </GridItem>
  )
}

export default RightNFTDetailsCard

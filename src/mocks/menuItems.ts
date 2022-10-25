import {
  // AnnouncementMenuIcon,
  // HomeMenuIcon,
  // InfoMenuIcon,
  // FarmsMenuIcon,
  // PoolsMenuIcon,
  TradeMenuIcon,
  MarketMakerMenuIcon,
  BuyNFTMenuIcon,
  MyNFTMenuIcon,
  // MarketplaceMenuIcon,
} from '@app/components/Icons'
import { Icon } from '@chakra-ui/icons'

export interface Menu {
  label: string
  hasChild?: boolean
  icon: typeof Icon
  child?: ChildMenu[]
  path?: string
}

export interface ChildMenu {
  label: string
  path: string
  alias?: string[]
}

export const menuItems: Menu[] = [
  {
    label: 'GIC Store',
    hasChild: false,
    icon: MarketMakerMenuIcon,
    path: '/gic-store',
  },
  {
    label: 'Marketplace',
    hasChild: false,
    icon: BuyNFTMenuIcon,
    path: '/marketplace',
  },
  {
    label: 'Collectible',
    hasChild: false,
    icon: MyNFTMenuIcon,
    path: '/collectible',
  },
]

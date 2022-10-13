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
  // {
  //   label: 'HOME',
  //   hasChild: false,
  //   icon: HomeMenuIcon,
  //   path: '/',
  // },
  {
    label: 'NFT-MM',
    hasChild: false,
    icon: MarketMakerMenuIcon,
    path: '/',
  },
  {
    label: 'Buy NFT',
    hasChild: false,
    icon: BuyNFTMenuIcon,
    path: '/buy-nft',
  },
  {
    label: 'My NFT',
    hasChild: false,
    icon: MyNFTMenuIcon,
    path: '/my-nft',
  },
  {
    label: 'TRADE',
    hasChild: true,
    icon: TradeMenuIcon,
    child: [
      {
        label: 'Exchange',
        path: '/swap',
        alias: ['/swap'],
      },
      {
        label: 'Liquidity',
        path: '/liquidity',
        alias: ['/liquidity', '/add', '/remove', '/find'],
      },
      // {
      //   label: 'LP Migration',
      //   path: '/trade/lp_migration',
      // },
    ],
  },

  // {
  //   label: 'NFT-MM',
  //   hasChild: true,
  //   icon: MarketMakerMenuIcon,
  //   child: [
  //     {
  //       label: 'Dashboard',
  //       path: '/nft-market-maker',
  //       alias: ['/nft-market-maker'],
  //     },
  //     {
  //       label: 'Buy NFT',
  //       path: '/buy-nft',
  //       alias: ['/buy-nft'],
  //     },
  //     {
  //       label: 'My NFT',
  //       path: '/my-nft',
  //       alias: ['/my-nft'],
  //     },
  //     // {
  //     //   label: 'Marketplace',
  //     //   path: '/marketplace',
  //     //   alias: ['/marketplace'],
  //     // },
  //   ],
  // },

  // {
  //   label: 'FARMS',
  //   hasChild: false,
  //   icon: FarmsMenuIcon,
  //   path: '/farms',
  // },
  // {
  //   label: 'POOLS',
  //   hasChild: false,
  //   icon: PoolsMenuIcon,
  //   path: '/pools',
  // },

  // {
  //   label: 'Announcement',
  //   hasChild: false,
  //   icon: AnnouncementMenuIcon,
  //   path: '/announcement',
  // },
  // {
  //   label: 'Info',
  //   hasChild: false,
  //   icon: InfoMenuIcon,
  //   path: '/info',
  // },
  // {
  //   label: 'More',
  //   hasChild: false,
  //   icon: MoreIcon,
  //   path: '/more',
  // },
]

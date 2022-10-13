import LaunchpadProductIcon from '@public/images/Home/Products/launchpad_icon.png'
import ExchangeProductIcon from '@public/images/Home/Products/exchange_icon.png'
import FarmsProductIcon from '@public/images/Home/Products/farms_icon.png'
import PoolsProductIcon from '@public/images/Home/Products/pools_icon.png'

export interface HomeProductProps {
    label: string
    icon: StaticImageData
    path?: string
}

export const homeProductsItems: HomeProductProps[] = [
    {
        label: 'Launchpad',
        icon: LaunchpadProductIcon,
    },
    {
        label: 'Exchange',
        icon: ExchangeProductIcon,
        path: '/swap',
    },
    {
        label: 'Farms',
        icon: FarmsProductIcon,
        // path: '/farms',
    },
    {
        label: 'Pools',
        icon: PoolsProductIcon,
        // path: '/pools',
    },
]
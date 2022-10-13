import FooterLogoIcon from '@public/images/Footer/Logo/footer_logo_icon.png'
import { GICIcon, TwitterIcon, TelegramIcon, DiscordIcon } from '@app/components/Icons'
import { Icon } from '@chakra-ui/icons'

interface LinkedContentProps {
  label: string
  icon?: typeof Icon
  path?: string
}

interface FooterItems {
  footerLogoIcon: StaticImageData
  GICIcon: typeof Icon
  aboutItems: LinkedContentProps[]
  productsItems: LinkedContentProps[]
  communityItems: LinkedContentProps[]
}

export const footerItems: FooterItems = {
  footerLogoIcon: FooterLogoIcon,
  GICIcon: GICIcon,
  aboutItems: [
    {
      label: 'Docs',
    },
    {
      label: 'News',
    },
    {
      label: 'Teams',
    },
    {
      label: 'Github',
    },
  ],
  productsItems: [
    {
      label: 'Exchange',
      path: '/swap',
    },
    {
      label: 'Farms',
      // path: '/farms',
    },
    {
      label: 'Pools',
      // path: '/pools',
    },
  ],
  communityItems: [
    {
      label: 'Twitter',
      icon: TwitterIcon,
    },
    {
      label: 'Telegram',
      icon: TelegramIcon,
    },
    {
      label: 'Discord',
      icon: DiscordIcon,
      path: 'https://discord.com/invite/mgUzSUjRej',
    },
  ],
}

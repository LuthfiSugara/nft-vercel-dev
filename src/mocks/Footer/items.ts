import FooterLogoIcon from '@public/images/Footer/Logo/footer_logo_icon.png'
import { GICIcon, TwitterIcon, TelegramIcon, DiscordIcon } from '@app/components/Icons'
import { Icon } from '@chakra-ui/icons'
import { FaDiscord, FaTelegramPlane, FaTwitter } from 'react-icons/fa'
import { IconType } from 'react-icons'

interface LinkedContentProps {
  label: string
  icon?: IconType
  path?: string
}

interface FooterItems {
  footerLogoIcon: StaticImageData
  GICIcon: typeof Icon
  exploreItems: LinkedContentProps[]
  myAccountItems: LinkedContentProps[]
  communityItems: LinkedContentProps[]
}

export const footerItems: FooterItems = {
  footerLogoIcon: FooterLogoIcon,
  GICIcon: GICIcon,
  exploreItems: [
    {
      label: 'GICStore',
      path: '/gicstore',
    },
    {
      label: 'Marketplace',
      path: '/marketplace',
    },
    {
      label: 'Collectible',
      path: '/collectible',
    },
  ],
  myAccountItems: [
    {
      label: 'Profile',
      path: '/profile',
    },
    {
      label: 'Favorite',
      path: '/favorite',
    },
    {
      label: 'Collections',
      path: '/collections',
    },
    {
      label: 'Activity',
      path: '/activity',
    },
  ],
  communityItems: [
    {
      label: 'Discord',
      icon: FaDiscord,
      path: 'https://discord.com/invite/mgUzSUjRej',
    },
    {
      label: 'Telegram',
      icon: FaTelegramPlane,
    },

    {
      label: 'Twitter',
      icon: FaTwitter,
    },
  ],
}

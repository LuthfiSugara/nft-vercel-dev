import { FacebookIcon, GithubIcon, MediumIcon, TelegramIcon, TwitterIcon } from '@app/components/Icons'
import { siteConfig } from '@app/config/siteConfig'

export const socialContacts = [
  {
    logo: GithubIcon,
    alt: 'Github',
  },
  {
    logo: FacebookIcon,
    alt: 'Facebook',
    url: siteConfig.social.facebook.link,
  },
  {
    logo: MediumIcon,
    alt: 'Medium',
  },
  { logo: TwitterIcon, alt: 'Twitter', url: siteConfig.social.twitter.link },
  { logo: TelegramIcon, alt: 'Telegram', url: siteConfig.social.telegram.link },
]

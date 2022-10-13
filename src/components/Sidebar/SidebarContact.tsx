import { useSidebar } from '@app/context/Sidebar/useSidebar'
import { socialContacts } from '@app/mocks'
import { IconButton, ButtonGroup, Link } from '@chakra-ui/react'

const SidebarContact = () => {
  const { isSidebarOpen } = useSidebar()
  return (
    <ButtonGroup
      width="full"
      mt="2"
      opacity={isSidebarOpen ? '1' : ['0', '0', '1', '1']}
      transitionTimingFunction="ease-in-out"
      transitionProperty="visibility, opacity"
      transitionDuration="600ms"
      overflowX="hidden"
      px="1"
      visibility={isSidebarOpen ? 'visible' : ['hidden', 'hidden', 'visible', 'visible']}
      justifyContent="space-between"
    >
      {socialContacts.map(({ logo: Logo, ...item }, idx) => (
        <Link isExternal href={item.url || ''} key={`social-contact__${item.alt}__${idx}`}>
          <IconButton variant="ghost" aria-label={item.alt} icon={<Logo boxSize={5} />} />
        </Link>
      ))}
    </ButtonGroup>
  )
}

export default SidebarContact

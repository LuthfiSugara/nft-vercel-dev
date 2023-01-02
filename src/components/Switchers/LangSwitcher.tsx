import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { useTranslation } from '@app/context/Localization'
import { languages } from '@app/config/localization/languages'
import { withCustomScrollBar } from '@app/config/theme/withCustomScrollbar'
import { GlobeIcon } from '../Icons'

export default function LangSwitcher() {
  const { setLanguage, currentLanguage } = useTranslation()
  return (
    <Menu placement="top-start" isLazy>
      <MenuButton as={Button} leftIcon={<GlobeIcon />}>
        {currentLanguage.code.toUpperCase() ?? 'EN'}
      </MenuButton>
      <MenuList maxH="240px" overflowY="auto" bg="gicv.dark" sx={withCustomScrollBar('6px')} border="none">
        {Object.entries(languages).map(([locale, lang]) => (
          <MenuItem onClick={() => setLanguage(lang)} key={`language-${locale}`}>
            {lang.language}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export const withCustomScrollBar = (
  width: any = '4px',
  backgroundColor = 'legion.primary',
  overlayColor = 'transparent'
) => ({
  '&::-webkit-scrollbar': {
    width,
    // backgroundColor: `rgba(0, 0, 0, 0.05)`,
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '24px',
    backgroundColor,
  },
  '&::-webkit-scrollbar-track': {
    borderRadius: '10px',
    backgroundColor: overlayColor,
  },
})

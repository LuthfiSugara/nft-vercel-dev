export const withCustomScrollBar = (
  width: any = '5px',
  backgroundColor = 'gicv.primary',
  overlayColor = 'transparent'
) => ({
  '&::-webkit-scrollbar': {
    width,
    height: width,
    backgroundColor: `rgba(0, 0, 0, 0.05)`,
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

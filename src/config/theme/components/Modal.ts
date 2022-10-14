export const Modal = {
  parts: ['header', 'dialog', 'dialogContainer'],
  baseStyle: {
    dialog: {
      rounded: '3xl',
      bg: 'gicv.dark',
    },
    /**
     * @todo Custom scroll
     */
    dialogContainer: {
      overflowY: 'hidden',
    },
    header: {
      py: '4',
      fontSize: 'xl',
      letterSpacing: 'wider',
    },
  },
}

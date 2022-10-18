export const Modal = {
  parts: ['header', 'dialog', 'dialogContainer'],
  baseStyle: {
    dialog: {
      rounded: ['3xl', '3xl', '1vw'],
      bg: 'gicv.white',
    },
    /**
     * @todo Custom scroll
     */
    dialogContainer: {
      overflowY: 'hidden',
    },
    header: {
      fontSize: ['xl', 'xl', '1vw'],
      fontWeight: 'extrabold',
    },
  },
}

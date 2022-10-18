import { Modal } from './Modal'

export const customComponents = {
  Modal,
  Skeleton: {
    baseStyle: {
      rounded: 'md',
    },
    defaultProps: {
      startColor: 'gicv.dark',
      endColor: 'brand.bg.8',
    },
  },
  Switch: {
    defaultProps: {
      colorScheme: 'primary',
    },
  },
  Button: {
    // defaultProps: {
    // },
    baseStyle: {
      colorScheme: 'primary',
    },
  },
}

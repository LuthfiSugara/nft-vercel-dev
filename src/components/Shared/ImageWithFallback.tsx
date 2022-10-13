import React, { useState } from 'react'
import { Img, ImgProps, IconProps } from '@chakra-ui/react'
import { UnknownToken } from '../Icons'

const BAD_SRCS = {}

interface ImageWithFallbackProps extends Omit<ImgProps, 'src'> {
  srcs: string[]
}

const ImageWithFallback = ({ srcs, alt, ...rest }: ImageWithFallbackProps & IconProps) => {
  const [, refresh] = useState(0)
  const src = srcs.find((s) => !BAD_SRCS[s])
  if (src) {
    return (
      <Img
        src={src}
        onError={() => {
          if (src) BAD_SRCS[src] = true
          refresh((i) => i + 1)
        }}
        alt={alt || ''}
        {...rest}
      />
    )
  }
  return <UnknownToken {...rest} />
}

export default ImageWithFallback

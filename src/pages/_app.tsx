import AppWrapper from '@app/AppWrapper'
import BigNumber from 'bignumber.js'

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const MyApp = ({ Component, pageProps }) => {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  )
}

export default MyApp

import { CustomLeftArrow, CustomRightArrow } from '../components/CustomArrow'

const settings = {
  dots: false,
  infinite: true,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 6000,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  nextArrow: <CustomRightArrow />,
  prevArrow: <CustomLeftArrow />,
}

export default settings

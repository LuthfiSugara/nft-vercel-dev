import React from "react";
import Slider from "react-slick";
import Image from "next/image"
import CarouselBox from "./CarouselBox";
import { Box } from "@chakra-ui/react";

const HomeCarousel = () => {
    // const myLoader = ({ src, width, quality }) => {
    //   return `https://placeimg.com/640/480/${src}?w=${width}&q=${quality || 75}`
    // }
    
    const CarouselImage = (props) => {
      return (
        <Image
          // loader={myLoader}
          src={props.src}
          alt={props.alt}
          width={450}
          height={200}
        />
      )
    }
    const settings = {
      dots: true,
      infinite: true,
      autoplay: true,
      speed: 1000,
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1080,
          settings: {
            dots: true,
            infinite: true,
            autoplay: true,
            speed: 1000,
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 0,
          }
        },
        {
          breakpoint: 720,
          settings: {
            dots: true,
            infinite: true,
            autoplay: true,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 0,
          }
        },
      ]
    };
    return (
      <Box position="relative">
        <Box position="absolute" inset="0">
          <Slider {...settings}>
            <div>
              <CarouselBox>
                <CarouselImage src="/images/banner1.jpg" alt="banner1" />
              </CarouselBox>
            </div>
            <div>
              <CarouselBox>
                <CarouselImage src="/images/banner2.jpg" alt="banner2" />
              </CarouselBox>
            </div>
            <div>
              <CarouselBox>
                <CarouselImage src="/images/banner3.jpg" alt="banner3" />
              </CarouselBox>
            </div>
            <div>
              <CarouselBox>
                <CarouselImage src="/images/banner4.jpg" alt="banner4" />
              </CarouselBox>
            </div>
            <div>
              <CarouselBox>
                <CarouselImage src="/images/banner5.jpg" alt="banner5" />
              </CarouselBox>
            </div>
            <div>
              <CarouselBox>
                <CarouselImage src="/images/banner6.jpg" alt="banner6" />
              </CarouselBox>
            </div>
            <div>
              <CarouselBox>
                <CarouselImage src="/images/banner7.jpg" alt="banner7" />
              </CarouselBox>
            </div>
            <div>
              <CarouselBox>
                <CarouselImage src="/images/banner8.jpg" alt="banner8" />
              </CarouselBox>
            </div>
          </Slider>
        </Box>
      </Box>
    );
}

export default HomeCarousel;
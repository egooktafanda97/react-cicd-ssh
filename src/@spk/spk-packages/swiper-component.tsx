import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper modules
import { Navigation, Pagination, Autoplay, Thumbs, EffectFade, EffectCube, EffectFlip, EffectCards, EffectCoverflow, Mousewheel } from 'swiper/modules';

//css
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/navigation";
// import "swiper/css/thumbs";
// import "swiper/css/pagination";
// import "swiper/css/autoplay";
// import "swiper/css/effect-flip";
// import "swiper/css/effect-fade";
// import "swiper/css/effect-cube";

import "swiper/swiper-bundle.css"

interface SwiperComponentProps {
  slides: React.ReactNode[]; // Array of slide components or elements
  navigation?: boolean;
  pagination?: boolean | any;
  scrollbar?: boolean;
  autoplay?: any;
  loop?: boolean;
  spaceBetween?: number;
  slidesPerView?: number;
  centeredSlides?: boolean;
  mousewheel?:boolean;
  grabCursor?: boolean;
  onSlideChange?: (swiper: any) => void; // Callback for slide change
  onInit?: (swiper: any) => void; // Callback for initialization
  className?: string; // Custom class name for the Swiper
  style?: React.CSSProperties; // Custom styles for the Swiper\
  modules?:any[];
  customModules?:any;
  breakpoint?:any;
  mainClass?:string;
  onswiper?:any;
  keyboard?:boolean | any;
  thumb?:any
  watchslide?:boolean;
  freemode?:boolean;
  effect?:string;
  direction?:string | any;
  cubeEffect?:any
  coverflowEffect?:any
}

const SwiperComponent: React.FC<SwiperComponentProps> = ({
  slides,
  navigation = false,
  pagination = false,
  scrollbar = false,
  autoplay = false, 
  loop = false,
  keyboard =false,
  mousewheel= false,
  spaceBetween,
  breakpoint,
  slidesPerView,
  centeredSlides = false,
  grabCursor = true,
  watchslide = false,
  freemode = false,
  onSlideChange,
  onInit,
  className,
  mainClass,
  direction,
  onswiper,
  effect,
  cubeEffect,
  coverflowEffect,
  thumb,
  style,
  customModules =[],
  ...rest
}) => {
    const modules = [Navigation, Pagination, Autoplay, Thumbs, EffectFade,EffectCube,EffectFlip,EffectCoverflow,Mousewheel , EffectCards, ...customModules];
  return (
    <Swiper
      modules={modules}
      navigation={navigation}
      // pagination={pagination ? {dynamicBullets: true, clickable: true } : false}
      pagination={pagination ? {dynamicBullets: true, clickable: true } : false}
      scrollbar={scrollbar}
      autoplay={autoplay === true ? { delay: 2500, disableOnInteraction: false } : autoplay} // Set autoplay options
      loop={loop}
      thumbs={thumb}
      onSwiper={onswiper}
      effect={effect}
      watchSlidesProgress={watchslide}
      freeMode={freemode}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      centeredSlides={centeredSlides}
      grabCursor={grabCursor}
      onSlideChange={onSlideChange}
      onInit={onInit}
      className={className}
      mousewheel={mousewheel}
      keyboard={keyboard}
      direction={direction}
      cubeEffect={cubeEffect}
      coverflowEffect={coverflowEffect}
      breakpoints={breakpoint}
      style={style}
      {...rest}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className={mainClass}>{slide}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperComponent;

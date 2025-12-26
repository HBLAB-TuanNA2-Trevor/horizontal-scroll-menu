import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/swiper-bundle.css";
import "./HorizontalNavMenu.css";

interface MenuItem {
  id: string;
  label: string;
}

interface HorizontalNavMenuProps {
  items: MenuItem[];
}

const SLIDE_GAP = 16;

export const HorizontalMenu = ({ items }: HorizontalNavMenuProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateNavigationState = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className="menu-container">
      {!isBeginning && (
        <button
          className="arrow arrow-prev"
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Scroll left"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 15L7.5 10L12.5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      <Swiper
        modules={[Navigation]}
        spaceBetween={SLIDE_GAP}
        slidesPerView="auto" // allows each slide to have its own natural width
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          updateNavigationState(swiper);
        }}
        onSlideChange={(swiper) => {
          updateNavigationState(swiper);
        }}
        onResize={(swiper) => {
          updateNavigationState(swiper);
        }}
        className="menu-swiper"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id} className="menu-swiper__slide">
            <div className="chip">
              <span className="chip-label">{item.label}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {!isEnd && (
        <button
          className="arrow arrow-next"
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Scroll right"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 5L12.5 10L7.5 15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

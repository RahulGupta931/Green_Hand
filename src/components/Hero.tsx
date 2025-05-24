import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const slides = [
  {
    image: "https://images.pexels.com/photos/6231690/pexels-photo-6231690.jpeg",
    title: "Bring Nature Into Your Living Space",
    description: "Discover the perfect plants to transform your home and improve your wellbeing.",
    cta: "Shop Now",
    link: "/products"
  },
  {
    image: "https://images.pexels.com/photos/1084188/pexels-photo-1084188.jpeg",
    title: "New Arrivals: Indoor Plants",
    description: "Explore our latest collection of beautiful indoor plants perfect for any space.",
    cta: "View Collection",
    link: "/products?category=indoor"
  },
  {
    image: "https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg",
    title: "Spring Sale: Up to 30% Off",
    description: "Get amazing deals on selected plants and accessories. Limited time offer!",
    cta: "Shop Deals",
    link: "/products?sale=true"
  }
];

const Hero: React.FC = () => {
  return (
    <div className="w-full group relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet !bg-white !opacity-50',
          bulletActiveClass: 'swiper-pagination-bullet-active !bg-white !opacity-100',
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        className="h-[300px] md:h-[420px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${slide.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent" />
              <div className="relative z-10 flex h-full w-full items-end md:items-center px-4 md:px-16 pb-8 md:pb-0 text-white">
                <div className="max-w-2xl text-center md:text-left w-full">
                  <h2 className="text-2xl md:text-5xl font-bold mb-3 leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-sm md:text-lg mb-6 text-white/90 leading-relaxed">
                    {slide.description}
                  </p>
                  <div className="flex flex-col md:flex-row gap-3 md:justify-start">
                    <Link
                      to={slide.link}
                      className="inline-flex items-center justify-center px-5 py-2.5 bg-white text-green-800 text-sm md:text-base font-medium rounded-md transition hover:shadow hover:-translate-y-[1px]"
                    >
                      {slide.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    <Link
                      to="/care-guide"
                      className="inline-flex items-center justify-center px-5 py-2.5 border border-white text-white text-sm md:text-base rounded-md hover:bg-white hover:text-green-800 transition"
                    >
                      Care Guide
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;

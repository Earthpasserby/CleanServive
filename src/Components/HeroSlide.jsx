import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

const slides = [
  {
    image:
      "https://www.freepik.com/free-photo/smiling-holding-points-bucket-cleaning-tools-young-africanamerican-cleaner-male-uniform-with-gloves-isolated-green-background_27467809.htm#fromView=search&page=1&position=1&uuid=1538dd99-8bc6-48d8-bb8f-78e13b11848e&query=cleaning+team",
    span: "Standard Cleaninng",
    title: "providing the best cleaning services for your home and office.",
    buttonText: "Request a Qoute",
    //     link: "/faqs",
  },
  {
    image: "https://example.com/image1.jpg",
    span: "Deep Cleaning",
    title: "Experience the best cleaning services with our expert team.",
    buttonText: "Request a Qoute",
    //     link: "/faqs",
  },
  {
    image: "https://example.com/image1.jpg",
    span: "Move In/Out Cleaning",
    title: "We make your move stress-free with our cleaning services.",
    buttonText: "Request a Qoute",
    //     link: "/faqs",
  },
  {
    image: "https://example.com/image1.jpg",
    span: "Post Construction Cleaning",
    title: "Transform your space with our post-construction cleaning services.",
    buttonText: "Request a Qoute",
    //     link: "/faqs",
  },
];
const HeroSlide = () => {
  return (
    <>
      <div className="">
        <div className="">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{
              clickable: true,
              pegClass: "swiper-custom-pagination",
              bulletClass: "swiper-pagination-bullet",
              bulletActiveClass: "swiper-pagination-bullet-active",
            }}
            autoplay={{ delay: 8000 }}
            loop={true}
            className="w-full relative"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index} className="relative">
                <div className="relative h-[50vh] lg:h-[100vh] sm:max-h-[800px] w-full">
                  <div className="">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-[100vh]  object-center object-cover absolute inset-0"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black opacity-80"></div>
                  <div className="absolute inset-0 top-[30vh]  sm:top-[65%] flex flex-col justify-center items-start px-10 mx-auto lg:px-14 transform -translate-y-1/2">
                    <p className="text-green-200 text-[16px] font-medium uppercase tracking-wide">
                      {slide.span}
                    </p>
                    <div className="sm:w-[700px]">
                      <h3 className="text-white sm:text-4xl lg:text-[35px] font-bold pt-2">
                        {slide.title}
                      </h3>
                    </div>
                    <button className="mt-1 sm:mt-7 sm:px-8 sm:py-4 px-8 py-2 bg-green-800 text-white rounded-4xl hover:bg-green-700">
                      <Link to={slide.link}>{slide.buttonText}</Link>
                    </button>
                  </div>
                </div>
                <div className="custom-pagination !absolute !bottom-0"></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};
export default HeroSlide;

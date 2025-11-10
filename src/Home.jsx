import CoreMessage from "./Components/CoreMessage";
import HeroSlide from "./Components/HeroSlide";
import Service from "./Components/Service";
import HomeExtras from "./Components/HomeExtras";

const Home = () => {
  return (
    <>
      {/* <SEO */}
      {/* title="Discover the World with Our Travel Experiences" */}
      {/* description="You’ll never have to second guess whether you’ve properly filled out your visa application. We help travellers fill out all the appropriate documentation for each country on their itinerary." */}
      {/* /> */}
      {/* <Title title="Palynx | The People Pairing App" /> */}
      <div className="w-full h-full">
        <HeroSlide />
  <CoreMessage />
  <Service />
        <HomeExtras />
      </div>
    </>
  );
};
export default Home;

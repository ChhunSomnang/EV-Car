import BrandList from "./components/BrandList";
import SpecialOffers from "./components/Promotion";
import ListProduct from "./components/ListProduct";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-10">
          Welcome to EV Store, the biggest online market in Cambodia
        </h1>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-center mb-8 sm:mb-14">
          Browse by brand
        </h2>

        <BrandList />
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-center my-8 sm:my-14">
          EV Car
        </h2>
        
        <ListProduct />
      </div>
    </div>
  );
}

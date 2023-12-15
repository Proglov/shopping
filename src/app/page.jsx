import AdvertisementCrops from "@/components/home/FestivalCrops";
import Categories from "@/components/home/Categories";
import PopularCrops from "@/components/home/PopularCrops";
import MajorBuy from "@/components/home/MajorBuy";
import NavBar from "@/components/home/NavBar";
import FooterMenu from "@/components/home/FooterMenu";


export default function Home() {
  return (
    <>
      <NavBar />
      <AdvertisementCrops />
      <Categories />
      <PopularCrops />
      <MajorBuy />
      <FooterMenu active={0} />
    </>
  )
}

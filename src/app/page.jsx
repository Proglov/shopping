import FestivalCrops from "@/components/home/FestivalCrops";
import Categories from "@/components/home/Categories";
import PopularCrops from "@/components/home/PopularCrops";
import MajorBuy from "@/components/home/MajorBuy";
import NavBar from "@/components/home/NavBar";
import FooterMenu from "@/components/home/FooterMenu";


export default function Home() {
  return (
    <>
      <NavBar />
      <FestivalCrops />
      <Categories />
      <PopularCrops />
      <MajorBuy />

      <div className="h-[90px]"></div>

      <div className="fixed bottom-0 bg-white w-full h-20 pt-[-2px] z-[100]" >
        <FooterMenu active={0} />
      </div>
    </>
  )
}

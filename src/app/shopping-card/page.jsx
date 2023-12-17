import Step from "@/components/Shopping card/Step";
import FooterMenu from "@/components/home/FooterMenu";
import NavBar from "@/components/home/NavBar";

export default function Card() {
    return (
      <>
        <NavBar/>
        <Step active={0}/>
        <FooterMenu active={2} />
      </>
    )
  }
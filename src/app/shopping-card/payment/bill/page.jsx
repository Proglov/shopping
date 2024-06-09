import BillComponent from "@/components/Shopping card/BillComponent";
import Step from "@/components/Shopping card/Step";
import FooterMenu from "@/components/home/FooterMenu";
import NavBar from "@/components/home/NavBar";

export default function Bill() {
  return (
    <>
      <NavBar />
      <Step active={2} />
      <BillComponent />
      <FooterMenu active={2} />
    </>
  );
}

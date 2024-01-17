import Step from "@/components/Shopping card/Step";
import FooterMenu from "@/components/home/FooterMenu";
import NavBar from "@/components/home/NavBar";
import AddressCard from "@/components/Shopping card/AddressCard";
import ShoppingCard from "@/components/Shopping card/ShoppingCard";
import ShippingTime from "@/components/Shopping card/ShippingTime";

export default function Card() {
  return (
    <>
      <NavBar />
      <Step active={0} />
      <AddressCard />
      <ShippingTime />
      <ShoppingCard />
      <FooterMenu active={2} />
    </>
  );
}

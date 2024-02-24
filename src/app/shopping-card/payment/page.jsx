import PaymentBill from "@/components/Shopping card/PaymentBill";
import Step from "@/components/Shopping card/Step";
import FooterMenu from "@/components/home/FooterMenu";
import NavBar from "@/components/home/NavBar";

export default function Payment() {
  return (
    <>
      <NavBar />
      <Step active={1} />
      <PaymentBill />
      <FooterMenu active={2} />
    </>
  );
}

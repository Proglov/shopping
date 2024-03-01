import Step from "@/components/Shopping card/Step";
import FooterMenu from "@/components/home/FooterMenu";
import NavBar from "@/components/home/NavBar";

export default function Bill() {
  return (
    <>
      <NavBar />
      <Step active={2} />

      <FooterMenu active={2} />
    </>
  );
}

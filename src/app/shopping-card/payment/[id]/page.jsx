import LastFactor from "@/components/Shopping card/LastFactor";
import Step from "@/components/Shopping card/Step";
import FooterMenu from "@/components/home/FooterMenu";
import NavBar from "@/components/home/NavBar";

export default function Factor({ params: { id } }) {
    return (
        <>
            <NavBar />
            <Step active={2} />
            <LastFactor id={id} />
            <FooterMenu active={2} />
        </>
    )
}

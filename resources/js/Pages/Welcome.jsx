import AboutUs from "@/Components/Home/AboutUs";
import RegistrationCTA from "@/Components/Home/CTA";
import HeroBanner from "@/Components/Home/HeroBanner";
import PreFooter from "@/Components/Home/Partnership";
import OurPrograms from "@/Components/Home/Program";
import VisionMission from "@/Components/Home/VisionMission";
import WelcomeModal from "@/Components/Home/WelcomeModal";
import Footer from "@/Layouts/Footer";
import Navbar from "@/Layouts/Navbar";
import { Link, Head } from "@inertiajs/react";

export default function Welcome(props) {
    return (
        <>
            <Head title="Welcome" />
            <WelcomeModal />
            <Navbar />
            <HeroBanner />
            <AboutUs />
            <VisionMission />
            <OurPrograms />
            <RegistrationCTA />
            <PreFooter />
            <Footer />
        </>
    );
}

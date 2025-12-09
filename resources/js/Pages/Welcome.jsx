import AboutUs from "@/Components/Home/AboutUs";
import RegistrationCTA from "@/Components/Home/CTA";
import HeroBanner from "@/Components/Home/HeroBanner";
import PreFooter from "@/Components/Home/Partnership";
import OurPrograms from "@/Components/Home/Program";
import VisionMission from "@/Components/Home/VisionMission";
import Footer from "@/Layouts/Footer";
import Navbar from "@/Layouts/Navbar";
import { Head } from "@inertiajs/react";
import WelcomeModal from "@/Components/Home/WelcomeModal";
import WinnerAnnouncementModal from "@/Components/Home/WinnerAnnouncementModal";
import ArticleModal from "@/Components/Home/ArticleModal";

export default function Welcome() {
    return (
        <>
            <Head title="Santripreneur BAZNAS" />
            <Navbar />
            <HeroBanner />
            <AboutUs />
            <VisionMission />
            <OurPrograms />
            <RegistrationCTA />
            <PreFooter />
            <Footer />

            {/*
            ================
            Modals
            ================
             */}

            <WelcomeModal />
            {/* <WinnerAnnouncementModal showModal={true} /> */}
            {/* <ArticleModal showModal={true} /> */}
        </>
    );
}

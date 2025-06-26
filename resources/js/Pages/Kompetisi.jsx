import AboutCompetition from "@/Components/Kompetisi/AboutCompetition";
import CompetitionCategories from "@/Components/Kompetisi/CompetitionCategories";
import HeroSection from "@/Components/Kompetisi/HeroSection";
import PreFooter from "@/Components/Kompetisi/PreFooterCompetition";
import PrizesAndAwards from "@/Components/Kompetisi/PrizesAndAwards";
import TermsAndConditions from "@/Components/Kompetisi/TermsAndConditions";
import Timeline from "@/Components/Kompetisi/TimelineCompetition";
import Footer from "@/Layouts/Footer";
import Navbar from "@/Layouts/Navbar";
import { Head } from "@inertiajs/react";

const Kompetisi = () => {
    return (
        <>
            <Head title="Kompetisi" />
            <Navbar />
            <HeroSection />
            <AboutCompetition />
            <CompetitionCategories />
            <TermsAndConditions />
            <PrizesAndAwards />
            <Timeline />
            <PreFooter />
            <Footer />
        </>
    );
};
export default Kompetisi;

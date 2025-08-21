import AnnouncementHero from "@/Components/Pengumuman/AnnounceHero";
import FinalistsSection from "@/Components/Pengumuman/FinalistsSection";
import Footer from "@/Layouts/Footer";
import Navbar from "@/Layouts/Navbar";
import { Head } from "@inertiajs/react";

const Announcement = () => {
    return (
        <>
            <Head title="Pengumuman Santriprenenur 2025" />
            <Navbar />
            <AnnouncementHero />
            <FinalistsSection />
            <Footer />
        </>
    );
};
export default Announcement;

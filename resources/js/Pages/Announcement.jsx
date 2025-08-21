import AnnouncementHero from "@/Components/Pengumuman/AnnounceHero";
import FinalistsSection from "@/Components/Pengumuman/FinalistsSection";
import GratitudeSection from "@/Components/Pengumuman/GratitudeSection";
import Footer from "@/Layouts/Footer";
import Navbar from "@/Layouts/Navbar";

const Announcement = () => {
    return (
        <div>
            <Navbar />

            <AnnouncementHero />
            <FinalistsSection />
            {/* <GratitudeSection /> */}
            <Footer />
        </div>
    );
};
export default Announcement;

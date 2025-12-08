// resources/js/Pages/Announcements/Show.jsx
import { Head, Link } from "@inertiajs/react";
import AnnouncementHero from "@/Components/Announcements/AnnouncementHero";
import CategoriesSection from "@/Components/Announcements/CategoriesSection";
import Footer from "@/Layouts/Footer";
import Navbar from "@/Layouts/Navbar";

const AnnouncementShow = ({ competition, stats }) => {
    return (
        <>
            <Head title={`Pengumuman - ${competition.name}`} />
            <Navbar />
            <AnnouncementHero competition={competition} stats={stats} />
            <CategoriesSection competition={competition} />
            <Footer />
        </>
    );
};

export default AnnouncementShow;

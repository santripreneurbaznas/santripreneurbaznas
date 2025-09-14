import ArticleHero from "@/Components/Article/BannerArticle";
import ListArticleUser from "@/Components/Article/ListArticle";
import ArticleNavigation from "@/Components/Article/NavigasiArticle";
import Navbar from "@/Layouts/Navbar";
import { Head } from "@inertiajs/react";

const Index = ({ latestArticle, articles, categories }) => {
    return (
        <div>
            <Head title="Artikel" />
            {/* <Navbar /> */}
            <ArticleNavigation categories={categories} />
            <ListArticleUser
                articles={articles}
                latestArticle={latestArticle}
            />
        </div>
    );
};
export default Index;

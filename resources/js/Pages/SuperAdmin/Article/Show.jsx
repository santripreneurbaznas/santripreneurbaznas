export default function Show({ article, content }) {
    // modifikasi isi content sebelum render
    // const modifiedContent = article.content.replace(
    //     /src="\/storage/g,
    //     'src="/berkas/storage'
    // );

    // console.log(modifiedContent);
    console.log(content);

    return (
        <div className="max-w-4xl mx-auto py-10">
            <h1 className="text-3xl font-bold text-green-600 mb-6 text-shadow-lg animate-fadeIn">
                {article.title}
            </h1>

            {/* Konten CMS */}
            <div
                className="content bg-white/5 p-6 rounded-lg shadow-lg backdrop-blur-sm animate-fadeIn"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
    );
}

import { useState } from "react";
import {
    Header,
    SelectNews,
    InfoContainer,
    NewsTable,
    Footer,
} from "./components";

/*
/saved : /profile
in profile:
- dark mode
- bigger font
*/
export default function LumiFeed() {
    const [news, setNews] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    return (
        <section className="pt-16 bg-[#fffcf5] __min-h-screen">
            <Header />

            {/* container */}
            <div className="max-w-7xl mx-auto min-h-[calc(80vh)]">
                <SelectNews news={news} setNews={setNews} />

                <div className="w-full flex gap-4">
                    <main className="w-full md:w-3/4">
                        {news?.length > 0 ? (
                            <NewsTable news={news} />
                        ) : (
                            <InfoContainer />
                        )}
                    </main>

                    {/* right side : search for desktop */}
                    <aside className="hidden md:block w-1/4 __border border-neutral-200 rounded-lg">
                        {/* <SearchResultsDisplay searchResults={searchResults}/> */}
                    </aside>
                </div>
            </div>

            <Footer />
        </section>
    );
}

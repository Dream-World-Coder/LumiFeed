import { useDarkMode } from "../../contexts/DarkModeContext";

import Header from "../../components/Headers/HomeHeader";
import Footer from "../../components/Footers/HomeFooter";
import { InfoContainer } from "./components";
import { useSelectNews, useNewsList } from "./hooks";

/*
/saved : /profile
in case of env in vite always have to add VITE_ prefix to every variable
    // const [searchResults, setSearchResults] = useState([]);
*/
export default function LumiFeed() {
  const { SelectNews, news, newsLoading } = useSelectNews();
  const { NewsList, articleLoading } = useNewsList({
    news,
    newsLoading,
  });
  const { isDark } = useDarkMode();

  return (
    <section className={`pt-16 ${isDark ? "bg-[#171717]" : "bg-[#fffcf5]"}`}>
      <Header exclude={["/contact", "/about"]} />

      {/* container */}
      <div
        className={`max-w-7xl px-4 md:px-0 mx-auto pb-16 min-h-[calc(80vh)]`}
      >
        {/* complete screen reload when article fetching */}
        {articleLoading && (
          <div className="fixed top-0 left-0 h-screen w-full inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <SelectNews />

        <div className="w-full flex gap-4">
          <main className="w-full md:w-3/4">
            {news?.length > 0 ? <NewsList /> : <InfoContainer />}
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

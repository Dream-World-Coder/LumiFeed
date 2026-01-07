import { BookOpen, ExternalLink, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { formatDate } from "../../services/dateFormat";
import { useCollections } from "../../hooks/useDB";

export default function DecorativeElm() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64">
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-10">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#8B4513"
            strokeWidth="0.5"
          />
          <circle
            cx="50"
            cy="50"
            r="35"
            fill="none"
            stroke="#8B4513"
            strokeWidth="0.5"
          />
          <circle
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke="#8B4513"
            strokeWidth="0.5"
          />
        </svg>
      </div>
    </div>
  );
}

export function NewCollectionModal({ setShowNewCollectionModal }) {
  const {
    error: collectionsError,
    createCollection,
    setCollections,
  } = useCollections();

  const [collectionName, setCollectionName] = useState("");
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h3 className="text-2xl font-zodiak text-[#8B4513] mb-4">
          Create New Collection
        </h3>
        <input
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
          type="text"
          placeholder="Collection Name"
          className="w-full bg-[#F2E8CF]/30 border border-[#8B4513]/20 rounded-md py-2 px-4
                  focus:ring-2 focus:ring-[#8B4513]/20 focus:border-[#8B4513]/40
                  transition-all duration-300 outline-none mb-4"
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setShowNewCollectionModal(false)}
            className="px-4 py-2 text-[#8B4513] hover:bg-[#8B4513]/10 rounded-md transition-colors"
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-[#8B4513] text-[#F2E8CF] rounded-md
                    hover:bg-[#8B4513]/90 transition-colors"
            onClick={async () => {
              const res = await createCollection(collectionName);
              if (res.success) {
                toast.success("collection added successfully");
                setCollections((prev) => [...prev, res.collection]);
                setShowNewCollectionModal(false);
              } else {
                toast.error(collectionsError.toString());
              }
            }}
          >
            Create Collection
          </button>
        </div>
      </div>
    </div>
  );
}
NewCollectionModal.propTypes = {
  setShowNewCollectionModal: PropTypes.func,
};

export function Article({ article, isDark }) {
  return (
    <div
      key={article?.id}
      className={`flex justify-between items-start space-x-4 pb-4 border-b ${
        isDark ? "border-stone-700" : "border-[#8B4513]/10"
      } last:border-0`}
    >
      <div className="flex-1">
        <h4
          className={`font-medium ${isDark ? "text-stone-200" : "text-[#8B4513]"}`}
        >
          {article?.title}
        </h4>
        <p
          className={`text-sm ${isDark ? "text-stone-400" : "text-[#8B4513]/60"}`}
        >
          {/* {"CNN"} •  */}
          {article?.date ? formatDate(article.date) : article?.date}
        </p>
      </div>
    </div>
  );
}
Article.propTypes = {
  article: PropTypes.object,
  isDark: PropTypes.bool,
};

export function ArticleRow({ article, isDark, index }) {
  const navigate = useNavigate();
  const [articleLoading, setArticleLoading] = useState(false);

  const handleArticleReadClick = (url, description, date) => {
    setArticleLoading(true);
    const apiUrl =
      `${import.meta.env.VITE_BACKEND_URL}/fetch/article` +
      `?url=${encodeURIComponent(url)}`;

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        const articleData = JSON.parse(data);

        // if description +nt then just use that
        if (description) articleData.description = description;
        if (date) articleData.date = date;

        navigate("/article-reader", {
          state: articleData,
        });
      })
      .catch((e) => {
        console.error(e);
        if (e instanceof TypeError) {
          toast.error("Server unreachable");
        } else {
          toast.error(e.message);
        }
      })
      .finally(() => {
        setArticleLoading(false);
      });
  };

  const handleArticleRemove = () => {
    alert("will be implemented soon");
  };

  return (
    <tr
      className={`${isDark ? "hover:bg-stone-700/30" : "hover:bg-[#8B4513]/5"} ${articleLoading ? "opacity-45 pointer-events-none" : ""}`}
    >
      <>
        <td
          className={`py-4 px-4 hidden md:block ${isDark ? "text-stone-200" : "text-[#8B4513]"}`}
        >
          {index + 1}.
        </td>

        <td className="py-4 px-4">
          <h4
            className={`font-medium ${isDark ? "text-stone-200" : "text-[#8B4513]"} text-lg`}
          >
            {articleLoading ? "Loading Article..." : article?.title}
          </h4>
          <p
            className={`text-sm ${isDark ? "text-stone-400" : "text-[#8B4513]/60"} mt-1`}
          >
            {article?.description}
          </p>
        </td>

        <td
          className={`py-4 px-4 hidden md:block ${isDark ? "text-stone-300" : "text-[#8B4513]/80"}`}
        >
          {article?.date ? formatDate(article.date) : article?.date}
        </td>

        <td className="py-4 px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-center space-x-2">
            <button
              className={`flex justify-center items-center gap-1
                  ${isDark ? "text-stone-200 hover:bg-stone-700" : "text-[#8B4513] hover:bg-[#8B4513]/10"} p-2 rounded-full transition-colors`}
              title="Read Article"
              onClick={() =>
                handleArticleReadClick(
                  article.url,
                  article.description,
                  article.date,
                )
              }
            >
              <BookOpen size={16} /> Read
            </button>
            <a
              href={article?.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex justify-center items-center gap-1
                  ${isDark ? "text-stone-200 hover:bg-stone-700" : "text-[#8B4513] hover:bg-[#8B4513]/10"} p-2 rounded-full transition-colors`}
              title="Visit Original"
            >
              <ExternalLink size={16} /> Visit
            </a>
            <button
              className={`text-red-600 ${isDark ? "hover:bg-stone-700" : "hover:bg-red-50"} p-2 rounded-full transition-colors`}
              title="Remove from Collection"
              onClick={handleArticleRemove}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </td>
      </>
    </tr>
  );
}
ArticleRow.propTypes = {
  article: PropTypes.object,
  isDark: PropTypes.bool,
  index: PropTypes.number,
};

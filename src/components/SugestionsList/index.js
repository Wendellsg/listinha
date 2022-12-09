import { useSugestions } from "../../hooks/useSugestions";
import "./SugestionsList.Styles.css";
import Categories from "../../data/categories";
import { useEffect } from "react";
export default function SugestionsList({ search, selectSugestion }) {
  const { sugestions, fetchSugestions } = useSugestions();
  useEffect(() => {
    if (search.length < 3) return;
    fetchSugestions(search);
  }, [search]);
  function findCategoryId(name) {
    const findCategory = Categories.find((category) => category.name === name);
    return findCategory.id;
  }
  if (sugestions?.length) {
    return (
      <div className="SugestionsContainer">
        <ul>
          {sugestions.map((sugestion) => (
            <li
              key={sugestion._id}
              onClick={() =>
                selectSugestion(sugestion.name, sugestion.category)
              }
              className="SugestionItem"
            >
              <div className="SugestionName">{sugestion.name}</div>
              <div className="SugestionCategory">
                {sugestion.category || "Sem categoria"}
                {sugestion.category && (
                  <img
                    className="SugestionCategoryImage"
                    src={require(`../../assets/category_images/${
                      findCategoryId(sugestion.category) || "1"
                    }.png`)}
                    alt=""
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return null;
  }
}

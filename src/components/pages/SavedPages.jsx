import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPages } from "../../services/apiPostPagesData";

const SavedPages = () => {
  const [savedPages, setSavedPages] = useState([]);

  useEffect(() => {
    const loadPages = async () => {
      const pages = await fetchPages();
      console.log(pages);
      
      setSavedPages(pages || []);
    };
    loadPages();
  }, []);

  if (!savedPages.length) {
    return <h3>No saved pages found.</h3>;
  }

  return (
    <div>
      <h2>Saved Pages</h2>
      {savedPages.map((pageGroup) =>
        pageGroup.data.map((page) => (
          <div key={page.id} style={{ margin: "10px 0" }}>
            <h3>{page.name}</h3>
            <Link to={`/saved-pages/${page.id}`}>View Page</Link>
          </div>
        )) 
      )}
    </div>
  );
};

export default SavedPages;

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PageViewer from "./components/pages/PageViewer";
import SavedPages from "./components/pages/SavedPages";
import Navbar from "./components/Navbar";
import { savePages, fetchPages } from "./services/apiPostPagesData";

const App = () => {
  const [pages, setPages] = useState([]);
  const [activePageId, setActivePageId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPageName, setNewPageName] = useState("");
  const [isNavbarModalOpen, setIsNavbarModalOpen] = useState(false);
  const [navbarItems, setNavbarItems] = useState([]);
  const [newNavItem, setNewNavItem] = useState({ name: "", link: "" });

  const createNewPage = () => {
    if (!newPageName.trim()) {
      alert("Page name cannot be empty!");
      return;
    }

    const newPage = {
      id: Date.now(),
      name: newPageName.trim(),
      components: [],
    };
    setPages([...pages, newPage]);
    setActivePageId(newPage.id);
    setNewPageName(""); 
    setIsModalOpen(false); 
  };

  const saveToBackend = async () => {
    try {
      await savePages(pages);
      alert("Pages saved successfully!");
    } catch (error) {
      console.error("Error saving pages:", error);
      alert("Failed to save pages. Please try again.");
    }
  };

  const loadFromBackend = async () => {
    try {
      const savedPages = await fetchPages();
      setPages(savedPages || []);
      setActivePageId(savedPages?.[0]?.id || null);
    } catch (error) {
      console.error("Error loading pages:", error);
      alert("Failed to load pages. Please try again.");
    }
  };

  const addComponentToPage = (type, data = {}) => {
    const updatedPages = pages.map((page) =>
      page.id === activePageId
        ? {
            ...page,
            components: [
              ...page.components,
              { type, left: 10, top: 10, data }, // Initial position
            ],
          }
        : page
    );
    setPages(updatedPages);
  };

  const updateComponentPosition = (id, left, top) => {
    const updatedPages = pages.map((page) =>
      page.id === activePageId
        ? {
            ...page,
            components: page.components.map((component, index) =>
              index === id ? { ...component, left, top } : component
            ),
          }
        : page
    );
    setPages(updatedPages);
  };

  const addNavbarComponent = () => {
    if (navbarItems.length === 0) {
      alert("Please add at least one navbar item before saving!");
      return;
    }
    addComponentToPage("navbar", { items: navbarItems });
    setNavbarItems([]); // Reset navbar items
    setIsNavbarModalOpen(false); // Close modal
  };

  const addNavItem = () => {
    if (!newNavItem.name.trim() || !newNavItem.link.trim()) {
      alert("Both name and link are required!");
      return;
    }
    setNavbarItems([...navbarItems, newNavItem]);
    setNewNavItem({ name: "", link: "" }); // Reset new nav item
  };

  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <h1>Dynamic Page Builder</h1>
        <div>
          <Link to="/">Home</Link> | <Link to="/saved-pages">Saved Pages</Link>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <button onClick={() => setIsModalOpen(true)}>Add Page</button>
                <button onClick={() => setIsNavbarModalOpen(true)}>
                  Add Navbar
                </button>
                <button onClick={() => addComponentToPage("text", { content: "New Text" })}>
                  Add Text
                </button>
                <button onClick={saveToBackend}>Save Pages</button>
                <button onClick={loadFromBackend}>Load Pages</button>

                <PageViewer
                  pages={pages}
                  setPages={setPages}
                  activePageId={activePageId}
                  updateComponentPosition={updateComponentPosition}
                />
              </>
            }
          />
          <Route path="/saved-pages" element={<SavedPages />} />
        </Routes>

        {/* Modal for creating a new page */}
        {isModalOpen && (
          <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "white", padding: "20px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}>
            <h2>Create New Page</h2>
            <input
              type="text"
              placeholder="Enter page name"
              value={newPageName}
              onChange={(e) => setNewPageName(e.target.value)}
            />
            <div style={{ marginTop: "10px" }}>
              <button onClick={createNewPage}>Create</button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        )}

        {/* Modal for adding a navbar */}
        {isNavbarModalOpen && (
          <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "white", padding: "20px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}>
            <h2>Create Navbar</h2>
            <div>
              <input
                type="text"
                placeholder="Nav Item Name"
                value={newNavItem.name}
                onChange={(e) => setNewNavItem({ ...newNavItem, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Nav Item Link"
                value={newNavItem.link}
                onChange={(e) => setNewNavItem({ ...newNavItem, link: e.target.value })}
              />
              <button onClick={addNavItem}>Add Item</button>
            </div>
            <ul>
              {navbarItems.map((item, index) => (
                <li key={index}>{item.name} - {item.link}</li>
              ))}
            </ul>
            <div>
              <button onClick={addNavbarComponent}>Save Navbar</button>
              <button onClick={() => setIsNavbarModalOpen(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;

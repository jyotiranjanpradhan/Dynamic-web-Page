import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDrop } from "react-dnd";
import { fetchPages } from "../../services/apiPostPagesData";
import DynamicComponent from "../DynamicComponent";
import DraggableComponent from "../DraggableComponent";

const PageViewer = ({
  pages,
  setPages,
  activePageId,
  updateComponentPosition,
}) => {
  const { pageId } = useParams();
  const [page, setPage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    type: "",
    data: {},
  });
  console.log(pages);

  useEffect(() => {
    const loadPage = async () => {
      const savedPages = await fetchPages();
      const foundPage = savedPages?.find((p) => p.id === Number(pageId));
      setPage(foundPage || null);
    };

    if (pageId) {
      loadPage();
    }
  }, [pageId]);

  const [, drop] = useDrop({
    accept: "component",
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      updateComponentPosition(item.id, left, top);
    },
  });

  const handleAddComponent = () => {
    const updatedPages = pages.map((p) =>
      p.id === activePageId
        ? {
            ...p,
            components: [...p.components, { ...modalData, left: 50, top: 50 }],
          }
        : p
    );

    setModalData({ type: "", data: {} });
    setIsModalOpen(false);
    setPages(updatedPages);
  };

  if (activePageId && pages) {
    const activePage = pages.find((p) => p.id === activePageId);
    if (!activePage) return <h3>No Active Page Found</h3>;

    return (
      <div>
        <h2>{activePage.name || "Untitled Page"}</h2>
        <button onClick={() => setIsModalOpen(true)}>Add Component</button>
        <div
          ref={drop}
          style={{
            position: "relative",
            width: "100vw",
            height: "100vh",
            border: "1px solid #ccc",
            overflow: "hidden",
          }}
        >
          {activePage.components?.map((component, index) => (
            <DraggableComponent
              key={index}
              id={index}
              type={component.type}
              left={component.left || 0}
              top={component.top || 0}
            >
              <DynamicComponent type={component.type} data={component.data} />
            </DraggableComponent>
          ))}
        </div>

        {/* Modal for Adding Components */}
        {isModalOpen && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: "20px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              zIndex: 1000,
            }}
          >
            <h2>Add New Component</h2>
            <div style={{ marginBottom: "10px" }}>
              <label>Component Type: </label>
              <select
                value={modalData.type}
                onChange={(e) =>
                  setModalData({ ...modalData, type: e.target.value })
                }
              >
                <option value="">Select</option>
                <option value="image">Image</option>
                <option value="card">Card</option>
              </select>
            </div>

            {/* Conditional Fields */}
            {modalData.type === "image" && (
              <div>
                <label>Upload Image: </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        setModalData((prev) => ({
                          ...prev,
                          data: { ...prev.data, src: ev.target.result },
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
            )}

            {modalData.type === "card" && (
              <div>
                <label>Upload Image for Card: </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        setModalData((prev) => ({
                          ...prev,
                          data: { ...prev.data, src: ev.target.result },
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <div style={{ marginTop: "10px" }}>
                  <label>Card Text: </label>
                  <textarea
                    value={modalData.data.text || ""}
                    onChange={(e) =>
                      setModalData((prev) => ({
                        ...prev,
                        data: { ...prev.data, text: e.target.value },
                      }))
                    }
                  ></textarea>
                </div>
              </div>
            )}

            <div style={{ marginTop: "10px" }}>
              <button onClick={handleAddComponent}>Add</button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return <h3>Loading...</h3>;
};

export default PageViewer;

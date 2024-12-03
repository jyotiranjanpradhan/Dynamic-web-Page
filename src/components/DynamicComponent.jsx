import React from "react";
import Navbar from "./Navbar";
import Text from "./Text";

const DynamicComponent = ({ type, data }) => {
  switch (type) {
    case "navbar":
      return <Navbar navItems={data.items} />; // Pass navbar items dynamically
    case "text":
      return <Text content={data.content} />; // Pass text content dynamically
    case "image":
      return (
        <div
          style={{
            width: "100%",
            maxWidth: "500px", // Limit max width
            margin: "0 auto", // Center the image
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <img
            src={data.src}
            alt={data.alt || "Dynamic Image"}
            style={{
              width: "100%",
              height: "auto", // Maintain aspect ratio
              borderRadius: "8px",
            }}
          />
        </div>
      );
    case "card":
      return (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            width: "300px",
            height: "300px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            margin: "20px auto",
            backgroundColor: "#fff",
          }}
        >
          <img
            src={data.src}
            alt={data.alt || "Card Image"}
            style={{
              width: "100%",
              height: "200px",
              borderRadius: "8px",
              marginBottom: "15px",
            }}
          />
          <p
            style={{
              fontSize: "16px",
              color: "#333",
              lineHeight: "1.4",
              textAlign: "center",
            }}
          >
            {data.text || "Card Text"}
          </p>
        </div>
      );
    default:
      return <div>Unsupported Component Type: {type}</div>; // Show a placeholder for unknown types
  }
};

export default DynamicComponent;

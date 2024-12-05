import React from "react";
import PropTypes from "prop-types";

const Navbar = ({ navItems = [], navTitle = "Navbar" }) => {
  return (
    <nav
      style={{
        width: "1150px",
        padding: "15px 30px",
        backgroundColor: "#007BFF",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        fontSize: "18px",
        fontFamily: "'Arial', sans-serif",
        boxSizing: "border-box",
        position: "sticky",
        top: "0",
        zIndex: "1000",
      }}
      aria-label="Main Navigation"
    >
      <span
        style={{
          fontWeight: "bold",
          fontSize: "24px",
        }}
      >
        {navTitle}
      </span>
      <div style={{ display: "flex" }}>
        {navItems.length > 0 ? (
          navItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              style={{
                color: "white",
                textDecoration: "none",
                margin: "0 15px",
                fontSize: "16px",
                fontWeight: "500",
                transition: "color 0.3s ease",
              }}
              aria-label={item.name}
            >
              {item.name}
            </a>
          ))
        ) : (
          <span
            style={{
              color: "white",
              fontSize: "16px",
              fontStyle: "italic",
            }}
          >
            No Navigation Items
          </span>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ),
  navTitle: PropTypes.string,
};

export default Navbar;

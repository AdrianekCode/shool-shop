import React from "react";

function Nav_element({ name, category, onClick }) {
  return (
    <a href="#" onClick={() => onClick(category)}>
      {name}
    </a>
  );
}

const Navbar = ({ onCategoryChange }) => {
  return (
    <div className="navbar_div text-center ">
      <Nav_element name="Wszystko" category="" onClick={onCategoryChange} />
      <Nav_element name="Jedzenie" category="food" onClick={onCategoryChange} />
      <Nav_element name="Picie" category="drink" onClick={onCategoryChange} />
      <Nav_element
        name="Akcesoria"
        category="accessory"
        onClick={onCategoryChange}
      />
    </div>
  );
};

export default Navbar;

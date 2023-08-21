import React from "react";
import "./index.css";

const ListBox = ({ items, activeIndex }) => {
	return (
		<ul className="listBoxContainer">
			{items.map((item, index) => (
				<li className={`listBoxItem ${activeIndex === index ? "activeItem" : ""}`} key={index}>
					{item.name}
				</li>
			))}
		</ul>
	);
};

export default ListBox;

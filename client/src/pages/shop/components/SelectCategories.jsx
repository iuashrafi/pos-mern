import { productCategories } from "../../../data";

const SelectCategories = ({ onSelectCategory, selectedCategory }) => {
  return (
    <ul className="flex space-x-6">
      {productCategories.map((category, index) => (
        <li
          key={index}
          className={`py-2 px-4 rounded-full cursor-pointer ${
            selectedCategory === category.value
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black"
          }`}
          onClick={() => onSelectCategory(category.value)}
        >
          {category.label}
        </li>
      ))}
    </ul>
  );
};

export default SelectCategories;

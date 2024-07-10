import { productCategories } from "../../../data";

const SelectCategories = ({ onSelectCategory, selectedCategory }) => {
  return (
    <ul className="flex space-x-6 overflow-x-auto">
      {productCategories.map((category, index) => (
        <li
          key={index}
          className={`py-1.5 px-4 rounded-full cursor-pointer hover:shadow-md ${
            selectedCategory === category.value
              ? "bg-theme text-white"
              : "bg-white text-black border hover:bg-[#635bff] hover:text-white transition-all ease-linear"
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

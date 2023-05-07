const FilterButton = ({ filterItem, title }) => {
  return (
    <button
      onClick={() => filterItem(title)}
      className=" border p-2 m-1 rounded text-white bg-blue-500"
    >
      {title}
    </button>
  );
};

export default FilterButton;

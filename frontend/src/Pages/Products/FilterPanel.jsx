import { FaTimes, FaSearch } from "react-icons/fa";
import DisplayDropdown from "./DisplayOptions";
import ViewModeToggle from "./ViewToggle";

const FilterPanel = ({ setIsFilterOpen, isFilterOpen }) => {
  // Mock data for design
  const genres = [
    { id: 1, name: "furniture" },
    { id: 2, name: "groceries" },
    { id: 3, name: "home-decoration" },
    { id: 4, name: "kitchen-accessories" },
    { id: 5, name: "laptops" },
    { id: 6, name: "mens-watches" },
    { id: 7, name: "mobile-accessories" },
    { id: 8, name: "motorcycle" },
    { id: 9, name: "smartphones" },
    { id: 10, name: "tablets" },
    { id: 11, name: "skin-care" },
    { id: 12, name: "sports-accessories" },
    { id: 13, name: "sunglasses" },
  ];

  return (
    <>
      <div className="h-full w-full flex overflow-y-auto dark:bg-(--dark-alt-color) bg-(--white-color) flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg text-black dark:text-white">Filters</h2>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="lg:hidden  p-1 cursor-pointer hover:bg-gray-50 focus:bg-gray-50 active:bg-gray-200 dark:hover:bg-gray-700 dark:focus:bg-gray-700 dark:active:bg-gray-600 rounded"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search games..."
              className="w-full pl-10 pr-4 py-2 rounded-md bg-white dark:bg-gray-700
              text-gray-900 dark:text-white focus:ring-2 focus:ring-(--main-color) focus:outline-none"
            />
          </div>
        </div>

        {/* Clear Filters Button */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <button
            className="w-full py-2 px-4 text-sm text-(--main-color)
            hover:bg-gray-50 focus:bg-gray-50 active:bg-gray-50 dark:hover:bg-gray-700 dark:focus:bg-gray-700 dark:active:bg-gray-600 rounded-md cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>

        {/* Responsive Options */}
        <div className="lg:hidden flex flex-col mt-3 lg:items-center gap-4 p-3">
          <div className="border p-2 rounded-md text-center">
            <DisplayDropdown />
          </div>
        </div>

        {/* Genres */}
        <div className="p-4 flex-1 overflow-y-auto">
          <h3 className="text-md text-black dark:text-white mb-3">Genres</h3>
          <div className="space-y-2">
            {genres.map((genre) => (
              <label
                key={genre.id}
                className="flex items-center p-2 rounded-md hover:bg-gray-50 focus:bg-gray-50 active:bg-gray-200 dark:hover:bg-gray-700 dark:focus:bg-gray-700 dark:active:bg-gray-600 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="mr-3 w-4 h-4 accent-(--main-color)   rounded focus:ring-(--main-color)"
                />
                <span className="text-sm ">{genre.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default FilterPanel;

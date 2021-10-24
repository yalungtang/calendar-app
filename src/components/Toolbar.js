import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const Toolbar = ({ onPreviousMonth, onNextMonth, onAddNew, month, year }) => {
  return (
    <div className="h-24 flex flex-row items-center justify-center md:row-gap-12">
      <div className="md:ml-6 p-2 md:text-xl flex flex-row gap-3 md:pr-4 flex items-center justify-center">
        <button
          data-testid="add-button"
          onClick={onAddNew}
          className="h-12 w-12 rounded-full bg-blue-500 text-white text-lg border-none"
        >
          <FontAwesomeIcon className="h-full w-full" icon={faPlus} />
        </button>{" "}
        Add new
      </div>
      <div className="md:w-auto md:ml-6 mx-3 md:mx-auto p-2 text-xs md:text-2xl self-center bg-gray-200 rounded-full flex flex-row md:gap-6">
        <button
          onClick={onPreviousMonth}
          className="h-8 w-8 rounded-full bg-white text-gray-600 text-lg border-none"
        >
          <FontAwesomeIcon className="h-full w-full" icon={faChevronLeft} />
        </button>
        <span className="flex items-center justify-center lg:w-52 px-3 lg:px-auto text-center">
          {month} {year}
        </span>
        <button
          onClick={onNextMonth}
          className="h-8 w-8 rounded-full bg-white text-gray-600 text-lg border-none"
        >
          <FontAwesomeIcon className="h-full w-full" icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;

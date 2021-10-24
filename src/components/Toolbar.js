import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const Toolbar = ({ onPreviousMonth, onNextMonth, onAddNew, month, year }) => {
  return (
    <div className="h-24 flex flex-row items-center row-gap-12">
      <div className="ml-6 p-2 text-xl flex flex-row gap-3 pr-4  flex items-center justify-center">
        <button
          onClick={onAddNew}
          className="h-12 w-12 rounded-full bg-blue-500 text-white text-lg border-none"
        >
          <FontAwesomeIcon className="h-full w-full" icon={faPlus} />
        </button>{" "}
        Add new
      </div>
      <div className="ml-6 p-2 text-2xl self-center bg-gray-200 rounded-full flex flex-row gap-6">
        <button
          onClick={onPreviousMonth}
          className="h-8 w-8 rounded-full bg-white text-gray-600 text-lg border-none"
        >
          <FontAwesomeIcon className="h-full w-full" icon={faChevronLeft} />
        </button>
        <span className="w-48">
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

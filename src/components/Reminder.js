import moment from "moment";
import { useDispatch } from "react-redux";

const Reminder = (props) => {
  const { text, color, date } = props;
  const dispatch = useDispatch();
  const handleOnClick = () => dispatch({ type: "view/edit", payload: props });

  return (
    <button
      onClick={handleOnClick}
      className="border-none rounded-full w-full"
      style={{ backgroundColor: color }}
    >
      <div className="text-left pl-2 p-1 truncate mb-1 text-xs text-white">
        {moment(date).format("hh:mm A")} - {text}
      </div>
    </button>
  );
};

export default Reminder;

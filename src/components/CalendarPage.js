import moment from "moment";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getOrderedCalendarArray,
  getMonthStart,
  getMonthEnd,
} from "../utils/dateHandlers";
import Calendar from "./Calendar";
import Toolbar from "./Toolbar";
import ReminderFormContainer from "./ReminderFormContainer";

const CalendarPage = () => {
  const view = useSelector((state) => state.view);
  const dispatch = useDispatch();

  const [startOfMonth, setStartOfMonth] = useState(
    getMonthStart().format("MM/DD/YYYY")
  );
  const [endOfMonth, setEndOfMonth] = useState(
    getMonthEnd().format("MM/DD/YYYY")
  );

  const handleOnNextMonth = (e) => {
    e.preventDefault();
    const newMonth = moment(startOfMonth, "MM/DD/YYYY").add(1, "months");
    setStartOfMonth(getMonthStart(newMonth).format("MM/DD/YYYY"));
    setEndOfMonth(getMonthEnd(newMonth).format("MM/DD/YYYY"));
  };

  const handleOnPreviousMonth = (e) => {
    e.preventDefault();
    const newMonth = moment(startOfMonth, "MM/DD/YYYY").subtract(1, "months");
    setStartOfMonth(getMonthStart(newMonth).format("MM/DD/YYYY"));
    setEndOfMonth(getMonthEnd(newMonth).format("MM/DD/YYYY"));
  };

  const handleOnAddNew = () => {
    dispatch({ type: "view/add" });
  };

  const dates = getOrderedCalendarArray(startOfMonth, endOfMonth);

  return (
    <div className="h-full w-full flex flex-col relative">
      {view && <ReminderFormContainer view={view} />}
      <Toolbar
        onAddNew={handleOnAddNew}
        onNextMonth={handleOnNextMonth}
        onPreviousMonth={handleOnPreviousMonth}
        month={moment(startOfMonth, "MM/DD/YYYY").format("MMMM")}
        year={moment(startOfMonth, "MM/DD/YYYY").format("YYYY")}
      />
      <Calendar dates={dates} />
    </div>
  );
};

export default CalendarPage;

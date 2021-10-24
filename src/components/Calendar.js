import moment from "moment";
import { useSelector } from "react-redux";
import { daysOfWeek } from "../constants"
import CalendarCell from "./CalendarCell"

const Calendar = ({ dates }) => {
  const groupedReminders = useSelector((state) => state.reminders);
  return (
    <>
      <ul className="h-12 grid grid-cols-7 auto-cols-max">
        {daysOfWeek.map((day) => (
          <li
            key={day}
            className="text-center border p-2 bg-gray-600 border-gray-600 text-white text-lg"
          >
            {day}
          </li>
        ))}
      </ul>
      <div className="flex-grow">
        <ul className="h-full w-full grid grid-cols-7 auto-cols-max">
          {dates.map(({ date: { formattedDate }, type }) => {
            return (
              <CalendarCell
                key={formattedDate}
                formattedDate={formattedDate}
                reminders={
                  groupedReminders[
                    moment(formattedDate, "MM/DD/YYYY").format("MM/DD/YYYY")
                  ]
                }
                type={type}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Calendar;

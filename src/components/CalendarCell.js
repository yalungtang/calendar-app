import moment from "moment";
import Reminder from "./Reminder"

const CalendarCell = ({ formattedDate, reminders, type }) => {
    const date = moment(formattedDate, "MM/DD/YYYY");
    return (
      <li className={`text-left text-gray-600 border p-2 relative ${type === 'overflow' ? 'bg-gray-100 text-gray-400' : ''}`}>
        <div className="absolute">{date.format("D")}</div>
        <div className="absolute w-full h-full -ml-2 -mt-2 p-1 pt-10">
          <div className="w-full h-full overflow-y-auto">
            {reminders &&
              [...reminders]
                .sort((r1, r2) => {
                  return moment(r1.date).unix() - moment(r2.date).unix();
                })
                .map((properties) => {
                  return <Reminder key={properties.uid} {...properties} />;
                })}
          </div>
        </div>
      </li>
    );
  };

  export default CalendarCell;

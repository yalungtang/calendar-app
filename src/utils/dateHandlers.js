import moment from "moment";

const overflowFormatter = (date) => ({ date, type: "overflow" });

const currentFormatter = (date) => ({ date, type: "current" });

export const getDateRange = (startDate, endDate) => {
  const now = startDate.clone(),
    dates = [];

  while (now.isSameOrBefore(endDate)) {
    dates.push({
      formattedDate: now.format("MM/DD/YYYY"),
      dayOfWeek: now.day(),
    });
    now.add(1, "days");
  }
  return dates;
};

export const getOrderedCalendarArray = (startOfMonth, endOfMonth) => {
  const monthStart = moment(startOfMonth, "MM/DD/YYYY");
  const monthEnd = moment(endOfMonth, "MM/DD/YYYY");
  const dateList = getDateRange(monthStart, monthEnd);

  const startDate = moment(monthStart).subtract(dateList[0].dayOfWeek, "days");
  const endDate = moment(monthStart).subtract(1);
  const startFiller = getDateRange(startDate, endDate);

  let endFiller = [];
  const daysLeft = 6 - dateList[dateList.length - 1].dayOfWeek;

  if (daysLeft > 0) {
    const start = moment(monthEnd).add(1, "days");
    const end = moment(monthEnd).add(daysLeft, "days");
    endFiller = getDateRange(start, end);
  }

  return [
    ...startFiller.map(overflowFormatter),
    ...dateList.map(currentFormatter),
    ...endFiller.map(overflowFormatter),
  ];
};

export const getMonthStart = (dateString) => {
  return dateString
    ? moment(dateString, "MM/DD/YYYY").startOf("month")
    : moment().startOf("month");
};

export const getMonthEnd = (dateString) => {
  return dateString
    ? moment(dateString, "MM/DD/YYYY").endOf("month")
    : moment().endOf("month");
};

export const getHours = (num, m) => {
  if (m === "PM") {
    if (num !== 12) {
      return num + 12;
    }
    return 12;
  }
  if (num === 12) {
    return 0;
  }
  return num;
};

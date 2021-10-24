import DatePicker from "react-datepicker";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarWeek,
  faClock,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { GithubPicker } from "react-color";
import { useDispatch } from "react-redux";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
import { v4 } from "uuid";
import {
  hourOptions,
  minuteOptions,
  meridianOptions,
  initialValues,
} from "../constants";
import { getHours } from "../utils/dateHandlers";
import ModalActions from "./ModalActions";

const ReminderForm = ({ view, savedValues, onDelete }) => {
  const dispatch = useDispatch();

  const { color: savedColor, date: savedDate, ...restOfSaved } = savedValues;
  const [selectedDate, setSelectedDate] = useState(
    savedValues.date ? new Date(savedValues.date) : new Date()
  );
  const [selectedColor, setSelectedColor] = useState(
    savedValues.color ? savedValues.color : "#1273de"
  );
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [formValues, setFormValues] = useState({
    ...initialValues,
    ...restOfSaved,
  });

  const { hours, meridian, minutes, text } = formValues;

  const handleColorPicker = (color) => {
    setSelectedColor(color.hex);
    setShowColorPicker(false);
  };

  const handleOnClose = () => {
    dispatch({ type: "view/reset" });
  };

  const handleFormChange = (e, key) => {
    setFormValues({ ...formValues, [key]: e.target.value });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    const date = moment(selectedDate);

    const calculatedDate = moment({
      year: date.year(),
      month: date.month(),
      date: date.date(),
      hour: getHours(parseInt(hours), meridian),
      minute: minutes,
    });

    dispatch({
      type: view.view === "edit" ? "reminders/edit" : "reminders/add",
      payload: {
        id: `${date.format("MM/DD/YYYY")}`,
        oldId: `${moment(savedValues.date).format("MM/DD/YYYY")}`,
        value: {
          uid: restOfSaved.uid ? restOfSaved.uid : v4(),
          date: moment(calculatedDate).toISOString(),
          color: selectedColor,
          hours,
          meridian,
          minutes,
          text,
        },
      },
    });

    handleOnClose();
  };

  const primaryLabels = {
    edit: "Save changes",
    add: "Create reminder",
  };

  return (
    <form className="w-full h-full">
      <div className="flex flex-col px-6 py-5 bg-gray-50">
        <p className="mb-2 font-semibold text-gray-700">
          What do you want to remind?
        </p>
        <div className="flex flex-row">
          <input
            type="text"
            name="text"
            value={text}
            placeholder="Ex. Buy groceries"
            className="h-16 p-5 mb-5 bg-white border border-gray-200 rounded shadow-sm flex-grow focus:outline-none"
            onChange={(e) => handleFormChange(e, "text")}
            maxLength="30"
          ></input>
          <button
            alt="Select color"
            style={{ backgroundColor: selectedColor }}
            onClick={(e) => {
              e.preventDefault();
              setShowColorPicker(true);
            }}
            className="w-16 h-16 mb-5 bg-white border border-gray-200 rounded shadow-sm relative ml-3"
          >
            {showColorPicker && (
              <GithubPicker
                width={120}
                height={120}
                color={selectedColor}
                className="absolute p-2 mt-16"
                onChangeComplete={handleColorPicker}
              />
            )}
          </button>
        </div>
        <div className="flex flex-col sm:flex-row items-center mb-5 sm:space-x-5">
          <div className="w-full sm:w-1/2">
            <p className="mb-2 font-semibold text-gray-700">Date</p>
            <div className="flex flex-row w-full h-16 bg-white border border-gray-200 rounded shadow-sm appearance-none">
              <DatePicker
                className="w-full h-full p-5 focus:outline-none"
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                name="datepickerInput"
              />
              <FontAwesomeIcon
                className="h-full w-full text-gray-300 mr-5"
                icon={faCalendarWeek}
              />
            </div>
          </div>
          <div className="w-full sm:w-1/2 mt-2 sm:mt-0">
            <p className="mb-2 font-semibold text-gray-700">Time</p>
            <div className="h-16 px-5 flex flex-row justify-between bg-white border border-gray-200 rounded shadow-sm appearance-none">
              <select
                type="text"
                name="hours"
                className="p-2 focus:outline-none"
                value={hours}
                onChange={(e) => handleFormChange(e, "hours")}
              >
                {hourOptions.map((v) => (
                  <option key={`hour-${v}`} value={v}>{v}</option>
                ))}
              </select>
              <select
                type="text"
                name="minutes"
                className="p-2 focus:outline-none"
                value={minutes}
                onChange={(e) => handleFormChange(e, "minutes")}
              >
                {minuteOptions.map((v) => (
                  <option key={`minute-${v}`} value={v}>{v}</option>
                ))}
              </select>
              <select
                type="text"
                name="meridian"
                className="p-2 focus:outline-none"
                value={meridian}
                onChange={(e) => handleFormChange(e, "meridian")}
              >
                {meridianOptions.map((v) => (
                  <option key={`meridian-${v}`} value={v}>{v}</option>
                ))}
              </select>
              <div>
                <FontAwesomeIcon
                  className="h-full w-full text-gray-300"
                  icon={faClock}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="text-red flex flex-row justify-end">
          {view.view === "edit" ? (
            <button
              onClick={onDelete}
              className="text-red-500 bg-none border-none text-left"
            >
              Delete this reminder{" "}
              <FontAwesomeIcon
                className="text-red-500 text-xs"
                icon={faTrash}
              />
            </button>
          ) : null}
        </div>
      </div>
      <ModalActions
        onConfirm={handleOnSubmit}
        onCancel={handleOnClose}
        primaryLabel={primaryLabels[view.view]}
      />
    </form>
  );
};

export default ReminderForm;

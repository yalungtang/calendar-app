import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from 'react-redux';
import moment from 'moment';
import store from './redux/store';
import App from "./App";
import { getOrderedCalendarArray } from './utils/dateHandlers'

test("renders Toolbar", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const addNew = screen.getByText(/Add new/i);
  expect(addNew).toBeInTheDocument();
});

test("renders all current month cells with previous and next month overlaps", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const cells = screen.getAllByTestId('calendar-cell');
    const calendarArray = getOrderedCalendarArray(moment().startOf('month'), moment().endOf('month'));
    expect(cells.length).toBe(calendarArray.length);
  });

test("creates a reminder", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    fireEvent(
        screen.getByTestId('add-button'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      )

      fireEvent.change(screen.getByTestId('input-text'), {target: {value: 'Call homer simpson'}})

      fireEvent(
          screen.getByTestId('modal-confirm-button'),
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          }),
        )

      const homer = screen.getByText(/Call homer simpson/i);
      expect(homer).toBeInTheDocument();
  });

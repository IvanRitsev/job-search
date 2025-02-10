import { SetStateAction, useEffect, useRef, useState, Dispatch } from "react";
import ReactCalendar from "react-calendar";
import InputRangeDate from "../../Input/InputRangeDate/InputRangeDate";
import styles from "./RangeCalendar.module.scss";
import { FormikErrors } from "formik";
import { Application } from "@/entities/application/model/types";
import { DateRange } from "@/features/applications/components/CreateVacancyForm/CreateJobForm";
import "react-calendar/dist/Calendar.css";
import "./DatePicker.scss";

// Типы для react-calendar
export type DateItem = Date | null;

export type DateValue = DateItem | [DateItem, DateItem];

interface RangeCalendarProps {
  value: string | undefined;
  onChange: Dispatch<SetStateAction<DateValue>>;
  handleClearClick?: () => void;
  className?: string;
  placeholder?: string;
  range: DateValue;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<Omit<Application, "id">>>;
}

const RangeCalendar = ({
  value,
  onChange,
  handleClearClick,
  className,
  placeholder,
  range,
  setFieldValue,
}: RangeCalendarProps) => {
  const [isShown, setShown] = useState<boolean>(false);

  // закрытие календаря по клику в любое место экрана
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event;
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        setShown(false);
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [setShown]);

  return (
    <div className={styles.wrapper} ref={rootRef}>
      <InputRangeDate
        placeholder={placeholder}
        value={value}
        onClick={() => setShown((prev) => !prev)}
        onClear={handleClearClick}
        className={className}
        isShown={!!isShown}
      />
      {!!isShown && (
        <ReactCalendar
          selectRange
          value={range}
          onChange={(newValue) => {
            onChange(newValue);
            //   if (filterRangeDate as [DateItem, DateItem]) {
            if (setFieldValue) {
              console.log((newValue as DateRange)[0]!.toLocaleDateString());

              setFieldValue(
                "opening_date",
                (newValue as DateRange)[0]!.toLocaleDateString()
              );
              setFieldValue(
                "closing_date",
                (newValue as DateRange)[1]!.toLocaleDateString()
              );
            }
          }}
        />
      )}
    </div>
  );
};

export default RangeCalendar;

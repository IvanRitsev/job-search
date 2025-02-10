import CalendarIcon from "@/shared/icons/CalendarIcon";
import styles from "./InputRangeDate.module.scss";

import React, { SyntheticEvent } from "react";

interface InputDateProps {
  className?: string;
  onClick?: (event: SyntheticEvent) => void;
  onClear?: (event: SyntheticEvent) => void;
  placeholder?: string;
  value: string | undefined;
  isShown: boolean;
}

const InputRangeDate: React.FC<InputDateProps> = (props) => {
  const { className, onClear, onClick, placeholder, value, isShown } = props;
  return (
    <div
      className={`${styles.wrapper} ${className} ${
        isShown ? styles.active : ""
      }`}
      tabIndex={0}
    >
      <div
        className={` ${styles.input} ${styles.calendarInput} `}
        onClick={onClick}
      >
        {value ? (
          <p>{value}</p>
        ) : (
          <p className={styles.placeholder}>{placeholder}</p>
        )}
      </div>
      {value ? (
        <CalendarIcon className={styles.icon} onClick={onClear} />
      ) : (
        <CalendarIcon className={styles.icon} onClick={onClick} />
      )}
    </div>
  );
};

export default InputRangeDate;

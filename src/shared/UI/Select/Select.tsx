import { useEffect, useRef, useState } from "react";
import arrow from "@/shared/assets/icons/Swich=Off.svg";
import styles from "./Select.module.scss";

type Option = {
  value: string;
  label: string;
};

interface SelectProps {
  placeholder?: string;
  label?: string;
  error?: string;
  options: Option[];
  selected: Option | null;
  required?: boolean;
  className?: string;
  onChange?: (selection: Option) => void;
  onClose?: () => void;
}

function Select({
  label,
  error,
  options,
  placeholder,
  selected,
  onClose,
  onChange,
  required,
  className,
}: SelectProps) {
  const [showOptions, setShowOptions] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event;
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        onClose?.();
        setShowOptions(false);
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [showOptions, onClose]);

  return (
    <div className={`${styles.select} ${className}`}>
      <label className={styles.title}>
        {label}
        {required ? <span>*</span> : null}
      </label>
      <div className={styles.dropdown} ref={rootRef}>
        <div
          onClick={() => setShowOptions((prev) => !prev)}
          className={`${
            showOptions
              ? `${styles.dropdown__item} ${styles.dropdown__item_shown}`
              : `${styles.dropdown__item} ${styles.dropdown__item_hidden}`
          } ${error ? styles.hint : ""}`}
        >
          {selected ? (
            <span>{selected.label}</span>
          ) : (
            <span className={styles.placeholder}>{placeholder}</span>
          )}
          <img
            src={arrow}
            className={showOptions ? styles.iconUp : ""}
            alt="Стрелка"
          />
        </div>
        {showOptions ? (
          <ul className={styles.dropdown__options}>
            {options.map((option) => (
              <li
                key={option.value}
                className={
                  selected && option.label === selected.label
                    ? `${styles.dropdown__option} ${styles.dropdown__option_active}`
                    : styles.dropdown__option
                }
                onClick={() => {
                  onChange?.(option);
                  setShowOptions(false);
                }}
              >
                <span>{option.label}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export default Select;

import styles from "./RadioGroup.module.scss";

interface Option {
  value: string;
  label: string;
}

interface RadioGroupProps {
  label: string;
  name: string;
  required: boolean;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
}

const RadioGroup = ({
  label,
  required,
  name,
  options,
  value,
  onChange,
  error,
  className,
}: RadioGroupProps) => {
  return (
    <div className={`${styles.radioWrapper} ${className}`}>
      <label className={styles.title}>
        {label}
        {required ? <span>*</span> : null}
      </label>
      <div>
        {options.map((option) => (
          <label key={option.value} className={styles.radio}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span className={styles.customRadio}></span>
            {option.label}
          </label>
        ))}
      </div>

      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default RadioGroup;

import styles from "./Input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = ({ label, error, required, className, ...props }: InputProps) => {
  return (
    <div className={`${styles.inputBox} ${className}`}>
      {label && (
        <label className={styles.title}>
          {label}
          {required ? <span>*</span> : null}
        </label>
      )}
      <input
        className={`${styles.input}  ${error ? styles.hint : ""}`}
        {...props}
      />
      {error && <span className={styles.errorTitle}>{error}</span>}
    </div>
  );
};

export default Input;

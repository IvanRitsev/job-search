import styles from "./InputArea.module.scss";

interface InputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const InputArea = ({
  label,
  error,
  required,
  className,
  ...props
}: InputProps) => {
  return (
    <div className={`${styles.inputAreaBox} ${className}`}>
      {label && (
        <label className={styles.title}>
          {label}
          {required ? <span>*</span> : null}
        </label>
      )}
      <textarea
        className={`${styles.textarea}  ${error ? styles.hint : ""}`}
        {...props}
      />
      {error && <span className={styles.errorTitle}>{error}</span>}
    </div>
  );
};

export default InputArea;

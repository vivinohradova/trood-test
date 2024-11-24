import styles from "./Button.module.scss";

const Button = ({onClick, text, disabled}) => {
  return (
    <button className={styles.button} type="button" onClick={onClick} disabled= {disabled}>
      {text}
    </button>
  );
};

export default Button;

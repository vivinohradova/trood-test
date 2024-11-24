import styles from './Input.module.scss';

const Input = ({ type, placeholder, id, name, value, onChange }) => {
  return (
    <div className={styles.wrapInput}>
      <label htmlFor={id} className={styles.label}>{placeholder}</label>
      <input className={styles.input}
        type={type}
        placeholder={placeholder}
        id={id}
        name={name}
        value={value} 
        onChange={onChange}
      />
    </div>
  );
};

export default Input;

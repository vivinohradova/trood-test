import { useEffect } from "react";
import styles from './InputRadio.module.scss';

const InputRadio = ({ type, name, value, checked, onChange, text }) => {
  useEffect(() => {
    const savedValue = localStorage.getItem(name);
    if (savedValue === value) {
      onChange({ target: { name, value } }); 
    }
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    localStorage.setItem(name, value);
    onChange(e);
  };

  return (
    <div>
      <label className={styles.label}>
        <input
          type={type}
          name={name}
          value={value}
          checked={checked}
          onChange={handleChange}
        />
        {text}
      </label>
    </div>
  );
};

export default InputRadio;

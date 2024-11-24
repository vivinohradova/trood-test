import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import styles from "./Interest.module.scss";

const Interest = ({ interests = [], onInterestsChange }) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleAddInterest = () => {
    const trimmedValue = inputValue.trim();

    // Validation
    if (!trimmedValue) {
      setError("The input cannot be empty.");
      return;
    }

    if (trimmedValue.length > 30) {
      setError("Each tag must be no more than 30 characters.");
      return;
    }

    if (!/^[a-zA-Zа-яА-ЯёЁ0-9\s.,-]+$/.test(trimmedValue)) {
      setError(
        "Only letters (Latin and Cyrillic), numbers, spaces, commas, periods, and hyphens are allowed."
      );
      return;
    }

    if (interests.length >= 10) {
      setError("You can add up to 10 tags only.");
      return;
    }

    // Add interest
    setError("");
    onInterestsChange([...interests, trimmedValue]);
    setInputValue("");
    setInputVisible(false);
  };

  const toggleInput = () => {
    if (inputVisible) {
      setInputValue(""); 
    }
    setInputVisible(!inputVisible);
  };

  const handleRemoveInterest = (index) => {
    const updatedInterests = interests.filter((_, i) => i !== index);
    onInterestsChange(updatedInterests);
  };

  return (
    <section className={styles.interestWrap}>
      <div className={styles.tagWrap}>
        <p>The scopes of your interest:</p>

        <ul className={styles.tagList}>
          {interests.map((interest, index) => (
            <li key={index} className={styles.tag}>
              {interest}
              {inputVisible && (
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemoveInterest(index)}
                >
                  ×
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.addInterest}>
        {inputVisible && (
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Add your interest"
              className={styles.input}
            />
            <button className={styles.addButton} onClick={handleAddInterest}>
              Add
            </button>
          </div>
        )}
        <FaPlus
          className={`${styles.plus} ${inputVisible ? styles.active : ""}`}
          onClick={toggleInput}
        />
      </div>

      {error && <span className={styles.error}>{error}</span>}
    </section>
  );
};

export default Interest;

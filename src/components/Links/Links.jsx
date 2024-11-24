import { useState } from "react";
import styles from "./Links.module.scss";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const Links = ({ links = [], onLinksChange }) => {
  const [siteName, setSiteName] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");

  const validateLink = (value) => {
    if (!/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(value)) {
      setError(
        "The link must start with http:// or https:// and be a valid URL."
      );
      return false;
    }
    if (value.length > 200) {
      setError("The link must be no longer than 200 characters.");
      return false;
    }
    setError("");
    return true;
  };

  const handleAddLink = () => {
    if (!siteName.trim() || !link.trim()) {
      setError("Both fields are required.");
      return;
    }
    if (!validateLink(link)) {
      return;
    }

    const newLinks = [...links, { siteName, link }];
    onLinksChange(newLinks);
    setSiteName("");
    setLink("");
  };

  const handleRemoveLink = (index) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    onLinksChange(updatedLinks);
  };

  return (
    <section className={styles.linksWrap}>
      <p>Your links:</p>

      <div className={styles.inputGroup}>
        <input
          type="text"
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
          placeholder="Site name"
          className={styles.input}
        />
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Link"
          className={styles.input}
        />
      </div>
      
      <FaPlus onClick={handleAddLink} className={styles.addButton} />
      {error && <span className={styles.error}>{error}</span>}

      <ul className={styles.linksList}>
        {links.map((item, index) => (
          <li key={index} className={styles.linkItem}>
            <span>{item.siteName}: </span>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              {item.link}
            </a>
            <RiDeleteBin6Line
              onClick={() => handleRemoveLink(index)}
              className={styles.removeButton}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Links;

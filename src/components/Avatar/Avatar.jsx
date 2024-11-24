import { useState } from "react";
import styles from "./Avatar.module.scss";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const Avatar = ({ avatar, onAvatarChange }) => {
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // File format validation
    const validFormats = ["image/jpeg", "image/png", "image/jpg"];
    if (!validFormats.includes(file.type)) {
      setError("Supported formats: .jpg, .jpeg, .png");
      return;
    }

    // File size validation
    const maxSize = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxSize) {
      setError("The file size must not exceed 5 MB.");
      return;
    }

    setError("");
    onAvatarChange(file); 
  };

  const handleRemoveAvatar = () => {
    onAvatarChange(null); 
  };

  // Check if avatar is a File or URL object and display the corresponding image
  const renderAvatarImage = () => {
    if (avatar) {
      if (avatar instanceof File) {
        return <img src={URL.createObjectURL(avatar)} alt="Avatar Preview" className={styles.avatarImage} />;
      }
      return <img src={avatar} alt="Avatar Preview" className={styles.avatarImage} />;
    }
    return null;
  };

  return (
    <div className={styles.avatarWrap}>
      <div className={styles.inputGroup}>
        <label htmlFor="fileInput" className={styles.uploadLabel}>
          {renderAvatarImage() || <MdOutlineAddAPhoto className={styles.uploadIcon} />}
        </label>
        <input
          id="fileInput"
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleFileChange}
          className={styles.fileInput}
        />
        {avatar && (
          <div className={styles.preview}>
            <RiDeleteBin6Line onClick={handleRemoveAvatar} className={styles.removeButton} />
          </div>
        )}
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default Avatar;

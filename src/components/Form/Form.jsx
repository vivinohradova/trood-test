import { useEffect, useState } from "react";
import Input from "../Input/Input";
import styles from "./Form.module.scss";
import InputRadio from "../InputRadio/InputRadio";
import Interest from "../Interest/Interest";
import Links from "../Links/Links";
import Avatar from "../Avatar/Avatar";
import Button from "../Button/Button";


const Form = () => {
  // State for all inputs
  const initialData = {
    name: "",
    lastname: "",
    jobTitle: "",
    phone: "",
    address: "",
    pitch: "",
    avatar: null,
    interests: [],
    links: [],
    profileVisibility: "private",
  };

  // State for form data
  const [formData, setFormData] = useState(initialData);
  const [savedData, setSavedData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Convert File to Base64
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem("profileData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFormData(parsedData);
      setSavedData(parsedData);
    }
  }, []);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const hasErrors = Object.values(errors).some((error) => error);
    const hasEmptyRequiredFields = ["name", "lastname", "phone"].some(
      (field) => !formData[field].trim()
    );
    setIsFormValid(!hasErrors && !hasEmptyRequiredFields);
  };

  // Save data to localStorage
  const handleSave = async () => {
    const dataToSave = { ...formData };

    // Convert avatar (File) to Base64 if necessary
    if (dataToSave.avatar instanceof File) {
      dataToSave.avatar = await fileToBase64(dataToSave.avatar);
    }

    localStorage.setItem("profileData", JSON.stringify(dataToSave));
    setSavedData(dataToSave);
    alert("Data saved successfully!");
  };

  // Cancel changes
  const handleCancel = () => {
    setFormData(savedData);
    setErrors({});
  };

  const handleChangeVisibility = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, profileVisibility: value }));
  };

  // Generic change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validation for each field
    validateField(name, value);
  };

  // Validation field
const validateField = (name, value) => {
  let error = "";

  switch (name) {
    case "name":
      if (!value.trim()) {
        error = "Name is required.";
      } else if (value.length < 2 || value.length > 50) {
        error = "The name must be between 2 and 50 characters long.";
      } else if (!/^[a-zA-Zа-яА-ЯёЁ\s\-]+$/.test(value)) {
        error = "The name can only contain letters, spaces and hyphens.";
      }
      break;

    case "lastname":
      if (!value.trim()) {
        error = "Last name is required.";
      } else if (value.length < 2 || value.length > 50) {
        error = "The last name must be between 2 and 50 characters long.";
      } else if (!/^[a-zA-Zа-яА-ЯёЁ\s\-]+$/.test(value)) {
        error = "The last name can only contain letters, spaces and hyphens.";
      }
      break;

    case "jobTitle":
      if (value.trim() && value.length > 100) {
        error = "The maximum length is up to 100 characters.";
      } else if (value.trim() && !/^[a-zA-Zа-яА-ЯёЁ0-9\s]+$/.test(value)) {
        error = "Can only contain letters, numbers and spaces.";
      }
      break;

    case "phone":
      if (!value.trim()) {
        error = "Phone number is required.";
      } else if (!/^\+[\d]{9,14}$/.test(value)) {
        error =
          "The phone number must start with '+' and contain between 10 and 15 characters (including the country code).";
      }
      break;

    case "address":
      if (value.trim() && value.length > 200) {
        error = "The address must be up to 200 characters long.";
      } else if (value.trim() && !/^[a-zA-Zа-яА-ЯёЁ0-9\s.,-]+$/.test(value)) {
        error =
          "The address can only contain letters, numbers, commas, periods, hyphens and spaces.";
      }
      break;

    default:
      break;
  }

  setErrors((prev) => ({
    ...prev,
    [name]: error,
  }));
};


  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check all fields before sending
    const isValid = Object.keys(formData).every((field) => {
      validateField(field, formData[field]);
      return !errors[field];
    });

    if (isValid) {
      console.log("Form submitted successfully", formData);
    } else {
      console.log("The form contains errors.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Avatar
        avatar={formData.avatar}
        onAvatarChange={(newAvatar) =>
          setFormData((prev) => ({ ...prev, avatar: newAvatar }))
        }
      />
      <Input
        type="text"
        placeholder="Name"
        name="name"
        id="name"
        value={formData.name}
        onChange={handleChange}
      />
      {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}

      <Input
        type="text"
        placeholder="Lastname"
        name="lastname"
        id="lastname"
        value={formData.lastname}
        onChange={handleChange}
      />
      {errors.lastname && (
        <span style={{ color: "red" }}>{errors.lastname}</span>
      )}

      <Input
        type="text"
        placeholder="Job Title"
        name="jobTitle"
        id="jobTitle"
        value={formData.jobTitle}
        onChange={handleChange}
      />
      {errors.jobTitle && (
        <span style={{ color: "red" }}>{errors.jobTitle}</span>
      )}

      <Input
        type="tel"
        placeholder="Phone"
        name="phone"
        id="phone"
        value={formData.phone}
        onChange={handleChange}
      />
      {errors.phone && <span style={{ color: "red" }}>{errors.phone}</span>}

      <Input
        type="text"
        placeholder="Address"
        name="address"
        id="address"
        value={formData.address}
        onChange={handleChange}
      />
      {errors.address && <span style={{ color: "red" }}>{errors.address}</span>}

      <section className={styles.radioWrap}>
        <p>Profile visibility</p>
        <div className={styles.radio}>
          <InputRadio
            type="radio"
            name="profileVisibility"
            value="private"
            checked={formData.profileVisibility === "private"}
            onChange={handleChangeVisibility}
            text="Private"
          />
          <InputRadio
            type="radio"
            name="profileVisibility"
            value="public"
            checked={formData.profileVisibility === "public"}
            onChange={handleChangeVisibility}
            text="Public"
          />
        </div>
      </section>

      <Interest
        interests={formData.interests}
        onInterestsChange={(newInterests) =>
          setFormData((prev) => ({ ...prev, interests: newInterests }))
        }
      />
      <Links
        links={formData.links}
        onLinksChange={(newLinks) =>
          setFormData((prev) => ({ ...prev, links: newLinks }))
        }
      />

      <div className={styles.buttons}>
        <Button onClick={handleSave} text={"Save"} disabled={!isFormValid} />
        <Button onClick={handleCancel} text={"Cancel"} />
      </div>
    </form>
  );
};

export default Form;

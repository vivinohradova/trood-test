import styles from "./CreateEntity.module.scss";
import { FaPlus } from "react-icons/fa";

const CreateEntity = ({ title, text }) => {
  return (
    <article className={styles.entityWrap}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.create}>
        <p className={styles.text}>{text}</p>
        <FaPlus className={styles.plus} />
      </div>
    </article>
  );
};

export default CreateEntity;

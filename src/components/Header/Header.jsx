import arrow_left from "../../assets/images/arrow-down.svg";
import logo from "../../assets/images/logo.svg";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <img className={styles.arrow} src={arrow_left} alt="Left arrow" />
      <img className={styles.logo} src={logo} alt="Trood company logo" />
      <h2 className={styles.title}>Profile</h2>
    </header>
  )
}

export default Header

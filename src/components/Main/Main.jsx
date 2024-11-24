import CreateEntity from "../CreateEntity/CreateEntity";
import Form from "../Form/Form";
import styles from "./Main.module.scss";

const Main = () => {
  return (
    <main className={styles.main}>
      <div>
        <CreateEntity title={"Projects:"} text={"Create project"}/>
        <CreateEntity title={"Tasks:"} text={"Create task"}/>
      </div>
      <div>
        <Form />
      </div>
    </main>
  );
};

export default Main;

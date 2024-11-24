import Header from '../Header/Header';
import Main from '../Main/Main';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.App}>
  <Header/>
  <Main/>
    </div>
  );
}

export default App;

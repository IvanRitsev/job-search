import ApplicationList from "@/features/applications/ui/ApplicationList";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  return (
    <div className="container">
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Заявки на размещение вакансий</h1>
        <ApplicationList />
      </div>
    </div>
  );
};

export default HomePage;

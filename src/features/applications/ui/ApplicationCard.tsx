import { Application } from "@/entities/application/model/types";
import { useNavigate } from "react-router-dom";
import metro from "@/features/applications/assets/icons/Metro.svg";
import mapPin from "@/features/applications/assets/icons/Map_Pin.svg";
import edit from "@/features/applications/assets/icons/Edit.svg";
import styles from "./ApplicationList.module.scss";

interface ApplicationCardProps {
  app: Application;
}

const ApplicationCard = ({ app }: ApplicationCardProps) => {
  const navigate = useNavigate();

  const editButtonHandler = () => {
    navigate(`/edit/${app.id}`);
  };

  return (
    <li className={styles.listItem} key={app.id}>
      <div className={`${styles.topBlock} ${styles.row}`}>
        <p
          className={`${styles.date} ${!app.opening_date ? styles.hidden : ""}`}
        >
          Дата публикации: {app.opening_date}
        </p>
        <button className={styles.editButton} onClick={editButtonHandler}>
          <img src={edit} alt="Редактирование" />
        </button>
      </div>
      <h2 className={styles.title}>{app.vacancy_name}</h2>
      <div className={styles.row}>
        <div className={styles.address}>
          <img src={mapPin} alt="Адресс" />
          <p>
            {app.region}, {app.address}
          </p>
        </div>
        <div className={`${styles.addInfo} ${styles.row}`}>
          {app.pay && (app.min_pay || app.max_pay) && (
            <p className={styles.pay}>
              {app.min_pay && (
                <span className={styles.blue}>от {app.min_pay}</span>
              )}{" "}
              {app.max_pay && (
                <span className={styles.blue}>до {app.max_pay}</span>
              )}{" "}
              {app.pay.toLowerCase()}
            </p>
          )}
          <p className={styles.experience}>
            Требуемый опыт:{" "}
            <span className={styles.blue}>
              {app.work_experience.toLowerCase()}
            </span>
          </p>
          {app.metro_station && (
            <div className={styles.metro}>
              <img src={metro} alt="Метро" />
              <p>{app.metro_station}</p>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default ApplicationCard;

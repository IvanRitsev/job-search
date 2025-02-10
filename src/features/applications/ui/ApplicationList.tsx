import { getApplicationsSelector } from "@/entities/application/model/selectors";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { fetchApplications } from "../model/applicationAsyncThunks";
import { useEffect } from "react";
import styles from "./ApplicationList.module.scss";
import ApplicationCard from "./ApplicationCard";

const ApplicationList = () => {
  const dispatch = useAppDispatch();
  const { applications, loading } = useAppSelector(getApplicationsSelector);

  useEffect(() => {
    dispatch(fetchApplications());
  }, [dispatch]);

  if (loading) {
    return <div>Загрузка заявок...</div>;
  }

  return (
    <div className={styles.listWrapper}>
      <ul className={styles.list}>
        {applications.map((app) => (
          <ApplicationCard key={app.id} app={app} />
        ))}
      </ul>
    </div>
  );
};

export default ApplicationList;

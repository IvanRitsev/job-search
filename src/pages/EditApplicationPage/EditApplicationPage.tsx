import CreateJobForm from "@/features/applications/components/CreateVacancyForm/CreateJobForm";
import styles from "./EditApplicationPage.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { getApplicationByIDSelector } from "@/entities/application/model/selectors";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { updateApplication } from "@/features/applications/model/applicationAsyncThunks";
import { Application } from "@/entities/application/model/types";

const EditApplicationPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const application = useAppSelector(
    getApplicationByIDSelector(id as string | number)
  );

  const handleSubmit = (updatedValues: Application) => {
    dispatch(updateApplication(updatedValues));
    navigate("/");
  };

  if (!application) {
    <div className="container">
      <div>
        <h1 className={styles.title}>Загрузка</h1>
      </div>
    </div>;
  }

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <h1 className={styles.title}>
          Заявки на размещение <span>вакансий</span>
        </h1>
        <CreateJobForm
          onSubmit={handleSubmit}
          initialValuesProp={application}
        />
      </div>
    </div>
  );
};

export default EditApplicationPage;

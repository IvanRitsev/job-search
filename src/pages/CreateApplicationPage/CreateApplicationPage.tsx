import CreateJobForm from "@/features/applications/components/CreateVacancyForm/CreateJobForm";
import styles from "./CreateApplicationPage.module.scss";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { createApplication } from "@/features/applications/model/applicationAsyncThunks";
import { useNavigate } from "react-router-dom";
import { Application } from "@/entities/application/model/types";

const CreaCreateApplicationPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values: Omit<Application, "id">) => {
    console.log(values);

    dispatch(createApplication(values));
    navigate("/");
  };

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <h1 className={styles.title}>
          Форма размещения <span>заявки</span>
        </h1>
        <CreateJobForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CreaCreateApplicationPage;

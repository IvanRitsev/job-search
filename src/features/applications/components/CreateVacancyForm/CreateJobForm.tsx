import styles from "./CreateJobForm.module.scss";
import {
  Field,
  FieldInputProps,
  FieldMetaProps,
  Form,
  Formik,
  FormikHelpers,
} from "formik";
import * as Yup from "yup";
import Input from "@/shared/UI/Input/Input/Input";
import Select from "@/shared/UI/Select/Select";
import RadioGroup from "@/shared/UI/Input/Radio/RadioGroup";
import InputArea from "@/shared/UI/Input/InputArea/InputArea";
import PrimaryButton from "@/shared/UI/Button/PrimaryButton/PrimaryButton";
import SecondaryButton from "@/shared/UI/Button/SecondaryButton/SecondaryButton";
import { Application } from "@/entities/application/model/types";
import RangeCalendar, {
  DateItem,
  DateValue,
} from "@/shared/UI/Calendar/RangeCalendar/RangeCalendar";
import { useMemo, useState } from "react";

const formatRangeDate: (startDate?: Date, endDate?: Date) => string = (
  startDate,
  endDate
) => {
  const startDateFormat = startDate ? startDate.toLocaleDateString() : "";
  const endDateFormat = endDate ? endDate.toLocaleDateString() : "";

  return startDateFormat === endDateFormat
    ? startDateFormat
    : `${startDateFormat} - ${endDateFormat}`;
};

export type DateRange = [DateItem, DateItem];

const educationOptions = [
  {
    value: "Высшее",
    label: "Высшее",
  },
  {
    value: "Среднее",
    label: "Среднее",
  },
];

const payOptions = [
  { value: "На руки", label: "На руки" },
  { value: "До вычета налогов", label: "До вычета налогов" },
];

const workScheduleOptions = [
  { value: "Полный день", label: "Полный день" },
  { value: "Сменный 5/2", label: "Сменный 5/2" },
  { value: "Сменный 2/2", label: "Сменный 2/2" },
];

const typeOfEmloymentOptions = [
  { value: "Полная занятость", label: "Полная занятость" },
  {
    value: "Частичная занятость",
    label: "Частичная занятость",
  },
  {
    value: "Стажировка",
    label: "Стажировка",
  },
];

const validationSchema = Yup.object({
  vacancy_name: Yup.string().required("Укажите наименование"),
  department: Yup.string().required("Укажите отдел"),
  opening_date: Yup.string().required("Выберите дату открытия"),
  closing_date: Yup.string().required("Выбирите дату закрытия"),
  // dateRange: Yup.array()
  //   .of(Yup.date().required("Выберите дату"))
  //   .length(2, "Выбирите дату закрытия"),
  sex: Yup.string().oneOf(["F", "M"]).required("Выберите пол"),
  education: Yup.string()
    .oneOf(["Высшее", "Среднее"])
    .required("Укажите образование"),
  pay: Yup.string()
    .oneOf(["На руки", "До вычета налогов"])
    .required("Выберите тип оплаты"),
  region: Yup.string().required("Укажите регоин"),
  address: Yup.string().required(
    "Введите полный адрес. Например, Походный проезд, 3с1"
  ),
  work_experience: Yup.string().required("Опыт работы обязателен"),
  work_schedule: Yup.string()
    .oneOf(["Полный день", "Сменный 5/2", "Сменный 2/2"])
    .required("Укажите график работы"),
  type_of_employment: Yup.string()
    .oneOf(["Полная занятость", "Частичная занятость", "Стажировка"])
    .required("Выберите тип занятости"),
});

const initialValues: any = {
  vacancy_name: "",
  post_name: "",
  department: "",
  opening_date: "",
  closing_date: "",
  sex: "",
  education: "",
  pay: "",
  min_pay: "",
  max_pay: "",
  region: "",
  address: "",
  metro_station: "",
  work_experience: "",
  work_schedule: "",
  type_of_employment: "",
  responsibilities: "",
  wishes: "",
  advantages: "",
  our_offers: "",
};

interface CreateJobFormProps {
  initialValuesProp?: Application;
  onSubmit: (
    values: Omit<Application, "id">,
    formikHelpers: FormikHelpers<any>
  ) => void | Promise<any>;
}

const CreateJobForm = ({
  onSubmit,
  initialValuesProp = initialValues,
}: CreateJobFormProps) => {
  const [filterRangeDate, setFilterRangeDate] = useState<DateValue>(null);

  const formattedRange = useMemo(() => {
    if (filterRangeDate as [DateItem, DateItem]) {
      return formatRangeDate(
        (filterRangeDate as DateRange)[0]!,
        (filterRangeDate as DateRange)[1]!
      );
    }
  }, [filterRangeDate]);

  return (
    <Formik<Omit<Application, "id">>
      onSubmit={onSubmit}
      initialValues={initialValuesProp}
      validationSchema={validationSchema}
    >
      {({ setFieldValue, values, resetForm, errors, touched }) => (
        <Form className={styles.form}>
          <div className={styles.formSection}>
            <div className={styles.row}>
              <Field name="post_name">
                {({
                  field,
                  meta,
                }: {
                  field: FieldInputProps<string>;
                  meta: FieldMetaProps<string>;
                }) => (
                  <Input
                    {...field}
                    className={styles.mainInput}
                    label="Наименование должности"
                    error={meta.touched && meta.error ? meta.error : undefined}
                  />
                )}
              </Field>
              <Field name="vacancy_name">
                {({
                  field,
                  meta,
                }: {
                  field: FieldInputProps<string>;
                  meta: FieldMetaProps<string>;
                }) => (
                  <Input
                    {...field}
                    className={styles.mainInput}
                    label="Наименование вакансии"
                    required
                    error={meta.touched && meta.error ? meta.error : undefined}
                  />
                )}
              </Field>
              <Field name="department">
                {({
                  field,
                  meta,
                }: {
                  field: FieldInputProps<string>;
                  meta: FieldMetaProps<string>;
                }) => (
                  <Input
                    {...field}
                    className={styles.mainInput}
                    label="Отдел"
                    required
                    error={meta.touched && meta.error ? meta.error : undefined}
                  />
                )}
              </Field>
            </div>
            <div className={styles.calendar}>
              <RangeCalendar
                placeholder="дд.мм.гггг"
                handleClearClick={() => setFilterRangeDate(null)}
                className={styles.calendarInput}
                range={filterRangeDate}
                value={formattedRange}
                onChange={setFilterRangeDate}
                setFieldValue={setFieldValue}
              />
              {errors.opening_date && touched.opening_date && (
                <div className={styles.error}>{errors.opening_date}</div>
              )}

              {errors.closing_date && touched.closing_date && (
                <div className={styles.error}>{errors.closing_date}</div>
              )}
            </div>
            <div className={styles.row}>
              <Field name="sex">
                {({
                  field,
                  meta,
                }: {
                  field: FieldInputProps<string>;
                  meta: FieldMetaProps<string>;
                }) => (
                  <RadioGroup
                    label="Пол"
                    name="sex"
                    required
                    className={styles.sex}
                    options={[
                      { value: "M", label: "Мужской" },
                      { value: "F", label: "Женский" },
                    ]}
                    value={field.value}
                    onChange={(value) =>
                      field.onChange({ target: { name: field.name, value } })
                    }
                    error={meta.touched && meta.error ? meta.error : undefined}
                  />
                )}
              </Field>
              <Field name="education">
                {({ meta }: { meta: FieldMetaProps<string> }) => (
                  <Select
                    label="Образование"
                    options={educationOptions}
                    selected={
                      educationOptions.find(
                        (opt) => opt.value === values.education
                      ) || null
                    }
                    required
                    onChange={(option) => {
                      setFieldValue("education", option.value);
                    }}
                    placeholder="Выберите"
                    className={styles.education}
                    error={meta.touched && meta.error ? meta.error : undefined}
                  />
                )}
              </Field>
            </div>
          </div>
          <div className={styles.formSection}>
            <Field name="pay">
              {({
                field,
                meta,
              }: {
                field: FieldInputProps<string>;
                meta: FieldMetaProps<string>;
              }) => (
                <RadioGroup
                  label="Зарплата"
                  name="pay"
                  required
                  className={styles.pay}
                  options={payOptions}
                  value={field.value}
                  onChange={(value) =>
                    field.onChange({ target: { name: field.name, value } })
                  }
                  error={meta.touched && meta.error ? meta.error : undefined}
                />
              )}
            </Field>
            <div className={styles.payFork}>
              <div>
                <span>от</span>
                <Field name="min_pay">
                  {({
                    field,
                    meta,
                  }: {
                    field: FieldInputProps<string>;
                    meta: FieldMetaProps<string>;
                  }) => (
                    <Input
                      {...field}
                      className={styles.payInput}
                      error={
                        meta.touched && meta.error ? meta.error : undefined
                      }
                    />
                  )}
                </Field>
              </div>

              <div>
                <span>до</span>
                <Field name="max_pay">
                  {({
                    field,
                    meta,
                  }: {
                    field: FieldInputProps<string>;
                    meta: FieldMetaProps<string>;
                  }) => (
                    <Input
                      {...field}
                      className={styles.payInput}
                      error={
                        meta.touched && meta.error ? meta.error : undefined
                      }
                    />
                  )}
                </Field>
              </div>
            </div>
            <div className={styles.row}>
              <Field name="region">
                {({
                  field,
                  meta,
                }: {
                  field: FieldInputProps<string>;
                  meta: FieldMetaProps<string>;
                }) => (
                  <Input
                    {...field}
                    className={styles.mainInput}
                    required
                    label="Регион"
                    error={meta.touched && meta.error ? meta.error : undefined}
                  />
                )}
              </Field>
              <Field name="address">
                {({
                  field,
                  meta,
                }: {
                  field: FieldInputProps<string>;
                  meta: FieldMetaProps<string>;
                }) => (
                  <Input
                    {...field}
                    className={styles.mainInput}
                    required
                    label="Адрес"
                    error={meta.touched && meta.error ? meta.error : undefined}
                  />
                )}
              </Field>
              <Field name="metro_station">
                {({
                  field,
                  meta,
                }: {
                  field: FieldInputProps<string>;
                  meta: FieldMetaProps<string>;
                }) => (
                  <Input
                    {...field}
                    className={styles.mainInput}
                    label="Станция метро, МЦД"
                    error={meta.touched && meta.error ? meta.error : undefined}
                  />
                )}
              </Field>
            </div>
            <div className={styles.row}>
              <Field name="work_experience">
                {({
                  field,
                  meta,
                }: {
                  field: FieldInputProps<string>;
                  meta: FieldMetaProps<string>;
                }) => (
                  <Input
                    {...field}
                    className={styles.mainInput}
                    required
                    label="Опыт работы"
                    error={meta.touched && meta.error ? meta.error : undefined}
                  />
                )}
              </Field>
              <Field name="work_schedule">
                {({ meta }: { meta: FieldMetaProps<string> }) => (
                  <Select
                    label="График работы"
                    options={workScheduleOptions}
                    selected={
                      workScheduleOptions.find(
                        (opt) => opt.value === values.work_schedule
                      ) || null
                    }
                    required
                    onChange={(option) =>
                      setFieldValue("work_schedule", option.value)
                    }
                    placeholder="Выберите"
                    className={styles.education}
                    error={meta.touched && meta.error ? meta.error : undefined}
                  />
                )}
              </Field>
              <Field name="type_of_employment">
                {({
                  field,
                  meta,
                }: {
                  field: FieldInputProps<string>;
                  meta: FieldMetaProps<string>;
                }) => (
                  <RadioGroup
                    label="Тип занятости"
                    name="type_of_employment"
                    required
                    className={styles.typeOfEmployment}
                    options={typeOfEmloymentOptions}
                    value={field.value}
                    onChange={(value) =>
                      field.onChange({ target: { name: field.name, value } })
                    }
                    error={meta.touched && meta.error ? meta.error : undefined}
                  />
                )}
              </Field>
            </div>
          </div>
          <div className={styles.formSection}>
            <Field name="responsibilities">
              {({
                field,
                meta,
              }: {
                field: FieldInputProps<string>;
                meta: FieldMetaProps<string>;
              }) => (
                <InputArea
                  {...field}
                  placeholder="Какую работу будет выполнять сотрудник"
                  className={styles.textArea}
                  label="Функциональные обязанности"
                  error={meta.touched && meta.error ? meta.error : undefined}
                />
              )}
            </Field>
            <Field name="wishes">
              {({
                field,
                meta,
              }: {
                field: FieldInputProps<string>;
                meta: FieldMetaProps<string>;
              }) => (
                <InputArea
                  {...field}
                  placeholder="Ключевые навыки, достижения"
                  className={styles.textArea}
                  label="Пожелания к кандидату"
                  error={meta.touched && meta.error ? meta.error : undefined}
                />
              )}
            </Field>
            <Field name="advantages">
              {({
                field,
                meta,
              }: {
                field: FieldInputProps<string>;
                meta: FieldMetaProps<string>;
              }) => (
                <InputArea
                  {...field}
                  placeholder="Дополнительные специальные навыки"
                  className={styles.textArea}
                  label="Преимуществом будет"
                  error={meta.touched && meta.error ? meta.error : undefined}
                />
              )}
            </Field>
            <Field name="our_offers">
              {({
                field,
                meta,
              }: {
                field: FieldInputProps<string>;
                meta: FieldMetaProps<string>;
              }) => (
                <InputArea
                  {...field}
                  label="Мы предлагаем"
                  className={styles.textArea}
                  error={meta.touched && meta.error ? meta.error : undefined}
                />
              )}
            </Field>
          </div>
          <div className={styles.buttonsWrapper}>
            <PrimaryButton type="submit" className={styles.button}>
              Отправить
            </PrimaryButton>
            <SecondaryButton
              type="button"
              onClick={() => resetForm({ values: initialValues })}
              className={styles.button}
            >
              Сбросить
            </SecondaryButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateJobForm;

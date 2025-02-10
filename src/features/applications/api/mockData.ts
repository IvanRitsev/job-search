import { Application } from "@/entities/application/model/types";

const mockApplications: Application[] = [
  {
    id: "1",
    vacancy_name: "Frontend Разработчик",
    post_name: "Разработчик интерфейсов",
    department: "ИТ",
    opening_date: "02.02.2025",
    closing_date: "13.02.2025",
    sex: "M",
    education: "Высшее",
    pay: "На руки",
    min_pay: 120000,
    max_pay: 150000,
    region: "Москва",
    address: "ул. Тверская, 12",
    metro_station: "Тверская",
    work_experience: "от 2 лет",
    work_schedule: "Полный день",
    type_of_employment: "Полная занятость",
    responsibilities: "Разработка и поддержка веб-приложений на React.",
    wishes: "Опыт работы с TypeScript, Redux Toolkit.",
    advantages: "Гибкий график, удалённая работа.",
    our_offers: "ДМС, компенсация спорта, обучение.",
  },
  {
    id: "2",
    vacancy_name: "HR-специалист",
    department: "Кадры",
    opening_date: "05.02.2025",
    closing_date: "10.03.2025",
    sex: "F",
    education: "Высшее",
    pay: "До вычета налогов",
    min_pay: 80000,
    max_pay: 100000,
    region: "Санкт-Петербург",
    address: "пр. Невский, 50",
    metro_station: "Гостиный двор",
    work_experience: "от 1 года",
    work_schedule: "Сменный 5/2",
    type_of_employment: "Полная занятость",
    responsibilities: "Поиск и подбор персонала, проведение собеседований.",
    wishes: "Опыт работы в крупных компаниях.",
    advantages: "Корпоративные мероприятия, бонусы.",
    our_offers: "ДМС, премии за успешный подбор.",
  },
  {
    id: "3",
    vacancy_name: "Оператор call-центра",
    department: "Поддержка клиентов",
    opening_date: "2025-02-10",
    closing_date: "2025-03-15",
    sex: "M",
    education: "Среднее",
    pay: "На руки",
    min_pay: 50000,
    region: "Екатеринбург",
    address: "ул. Ленина, 22",
    work_experience: "Без опыта",
    work_schedule: "Сменный 2/2",
    type_of_employment: "Частичная занятость",
    responsibilities: "Консультирование клиентов по телефону.",
    wishes: "Грамотная речь, стрессоустойчивость.",
    advantages: "Обучение, карьерный рост.",
    our_offers: "Официальное трудоустройство, дружный коллектив.",
  },
];

export default mockApplications;

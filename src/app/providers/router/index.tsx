import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage/HomePage";
import CreaCreateApplicationPage from "@/pages/CreateApplicationPage/CreateApplicationPage";
import EditApplicationPage from "@/pages/EditApplicationPage/EditApplicationPage";
import MainLayout from "@/app/layouts/MainLayout";

const RouterProvider = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="/create" element={<CreaCreateApplicationPage />} />
          <Route path="/edit/:id" element={<EditApplicationPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default RouterProvider;

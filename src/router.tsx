import { BrowserRouter, Routes, Route } from "react-router";
import Homepage from "./pages/home.tsx";
import ProjectOverview from "./pages/projectOverview.tsx";
import ProjectDetail from "./pages/projectDetail.tsx";


const Router = () => {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="projectOverview" element={<ProjectOverview />} />
            <Route path="projectDetails" element={<ProjectDetail />} />
          </Routes>
      </BrowserRouter >
    </>
  );
};

export default Router;
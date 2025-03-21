
import { Route, Routes } from "react-router-dom";
import Calculator from "@/pages/Calculator";
import ToolPage from "@/components/ToolPage";

const ToolRoutes = () => {
  return (
    <Routes>
      {/* Implement the Calculator as a full page */}
      <Route path="/calculator" element={<Calculator />} />
      
      {/* For all other tools, use the dynamic ToolPage with the correct route parameter */}
      <Route path="/:toolId" element={<ToolPage />} />
    </Routes>
  );
};

export default ToolRoutes;

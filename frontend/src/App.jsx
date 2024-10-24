import DashBoard from "./pages/DashBoard";
import SendMoney from "./pages/SendMoney";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedLayout from "./ProtectedRoute";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          {/* Use ProtectedLayout for protected routes */}
          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/send" element={<SendMoney />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

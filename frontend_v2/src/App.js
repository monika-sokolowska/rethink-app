import SharedLayout from "./pages/Dashboard/SharedLayout";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import FirstPage from "./pages/FirstPage/FirstPage";
import Stats from "./pages/Dashboard/Stats/Stats";
import Goals from "./pages/Dashboard/Goals/Goals";
import Activity from "./pages/Dashboard/Activity/Activity";
import FootprintPage from "./pages/Dashboard/Activity/FootprintPage/FootprintPage";
import News from "./pages/Dashboard/News/News";
import PersonalInformation from "./pages/Dashboard/PersonalInformation/PersonalInformation";
import SharedAdminLayout from "./pages/AdminDashboard/SharedAdminLayout";
import StatsAdmin from "./pages/AdminDashboard/StatsAdmin/StatsAdmin";
import NewsAdmin from "./pages/AdminDashboard/NewsAdmin/NewsAdmin";
import PersonalInformationAdmin from "./pages/AdminDashboard/PersonalInformation/PersonalInformation";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store } from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AdminRoute = ({ children }) => {
  const { user } = useSelector((store) => store.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.roles?.includes("ROLE_ADMIN")) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FirstPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <SharedLayout />
              </ProtectedRoute>
            }>
            <Route index element={<Stats />} />
            <Route path="/home/goals" element={<Goals />} />
            <Route path="/home/activity" element={<Activity />}>
              <Route index element={<FootprintPage />} />
            </Route>
            <Route path="/home/news" element={<News />} />
            <Route
              path="/home/personalInformation"
              element={<PersonalInformation />}
            />
          </Route>

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <SharedAdminLayout />
              </AdminRoute>
            }>
            <Route index element={<StatsAdmin />} />
            <Route path="/admin/news" element={<NewsAdmin />} />
            <Route
              path="/admin/personalInformation"
              element={<PersonalInformationAdmin />}
            />
          </Route>
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          pauseOnHover={false}
          progress={undefined}
          hideProgressBar
        />
      </BrowserRouter>
    </Provider>
  );
}

export default App;

import React, { CSSProperties, Suspense, lazy } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store"; // Import your Redux store
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Lazy loading components
const Landing = lazy(() => import("./components/home/Landing"));
const AdminRegistrationForm = lazy(
  () => import("./components/auth/AdminRegistrationForm"),
);
const ForgotPassword = lazy(() => import("./components/shared/ForgotPassword"));
const VerifyPassword = lazy(() => import("./components/shared/VerifyPassword"));
const AdminLoginForm = lazy(() => import("./components/auth/AdminLoginForm"));
const AdminDashboard = lazy(() => import("./components/admin/AdminDashboard"));
const StudentLoginForm = lazy(
  () => import("./components/auth/StudentLoginForm"),
);
const FacultyLoginForm = lazy(
  () => import("./components/auth/FacultyLoginForm"),
);
const FacultyDashboard = lazy(
  () => import("./components/faculty/FacultyDashboard"),
);
const StudentDashboard = lazy(
  () => import("./components/student/StudentDashboard"),
);

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Suspense
          fallback={
            <div className=" flex flex-col h-screen justify-center items-center">
              <ClipLoader
                color={"#048c7f"}
                loading={true}
                size={120}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              <p className="m-2 text-lg ">Loading...</p>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/admin-register" element={<AdminRegistrationForm />} />
            <Route path="/admin-login" element={<AdminLoginForm />} />
            <Route path="/faculty-login" element={<FacultyLoginForm />} />
            <Route path="/student-login" element={<StudentLoginForm />} />
            <Route path="/admin/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/faculty/forgot-password"
              element={<ForgotPassword />}
            />
            <Route
              path="/student/forgot-password"
              element={<ForgotPassword />}
            />
            <Route
              path="/admin/verify-reset-password"
              element={<VerifyPassword />}
            />
            <Route
              path="/faculty/verify-reset-password"
              element={<VerifyPassword />}
            />
            <Route
              path="/student/verify-reset-password"
              element={<VerifyPassword />}
            />
            {/* Protected Routes */}
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/faculty-dashboard"
              element={
                <ProtectedRoute allowedRoles={["Faculty"]}>
                  <FacultyDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student-dashboard"
              element={
                <ProtectedRoute allowedRoles={["Student"]}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
};

export default App;

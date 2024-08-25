import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './component/HomePage';
import Register from './component/Auth/Register';
import Login from './component/Auth/Login';
import ParentNavBar from './component/Navigation/ParentNavBar';
import AddCategory from './component/Categories/AddCategory';
import CategoryList from './component/Categories/CategoryList';
import UpdateCategory from './component/Categories/UpdateCategory';
import AdminProtectedRoute from './component/ProtectedRoutes/AdminProtectedRoute';
import PrivateRoutes from './component/ProtectedRoutes/PrivateRoutes';
import CreatePost from './component/Posts/CreatePost';
import PostsList from './component/Posts/postList';
import PostDetails from './component/Posts/PostDetails';
import UpdatePost from './component/Posts/UpdatePost';
import CreateReport from './component/Reports/CreateReport';
import GetAllReports from './component/Reports/GetAllReports';
import Profile from './component/Auth/Profile';
import ReportDetails from './component/Reports/ReportDetails';
import Authors from './component/Posts/Authors';
import ReportForwarded from './component/Reports/ReportForwarded';
import NotFoundPage from './component/NotFoundPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <ParentNavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/update-category/:id" element={<UpdateCategory />} />
          <Route path="/posts" element={<PostsList />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/create-report" element={<CreateReport />} />
          <Route path="//reports/details/:id" element={<ReportDetails />} />

          {/* Protected Routes */}
          <Route
            path="/category-list"
            element={
              <AdminProtectedRoute>
                <CategoryList />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <AdminProtectedRoute>
                <Authors />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin-profile/:id"
            element={
              <AdminProtectedRoute>
                <ReportForwarded />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/add-category"
            element={
              <AdminProtectedRoute>
                <AddCategory />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/create-post"
            element={<PrivateRoutes>{<CreatePost />}</PrivateRoutes>}
          />
          <Route
            path="/profile/:id"
            element={<PrivateRoutes>{<Profile />}</PrivateRoutes>}
          />
          <Route
            path="/reports/:id"
            element={<PrivateRoutes>{<GetAllReports />}</PrivateRoutes>}
          />
          <Route
            path="/update-post/:id"
            element={<PrivateRoutes>{<UpdatePost />}</PrivateRoutes>}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;

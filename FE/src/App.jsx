import { ToastContainer } from 'react-toastify'
import './App.css'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MovieManagement from './pages/Admin/AdminMovieManagement/MovieManagement';
import StaffManagement from './pages/Admin/AdminStaffManagement/StaffManagement';
import { AdminLayoutManagement } from './layouts/Admin/AdminLayoutManagement';
import { ROUTE_AUTHORIZATION, ROUTE_FORBIDDEN, ROUTE_LOGIN, ROUTE_MANAGEMENT_AREA, ROUTE_MANAGEMENT_BRANCH, ROUTE_MANAGEMENT_CHAIR, ROUTE_MANAGEMENT_COUNTRY, ROUTE_MANAGEMENT_DIRECTOR, ROUTE_MANAGEMENT_FORMAT, ROUTE_MANAGEMENT_GENRE, ROUTE_MANAGEMENT_MOVIE, ROUTE_MANAGEMENT_ORDER, ROUTE_MANAGEMENT_PROMOTION, ROUTE_MANAGEMENT_ROOM, ROUTE_MANAGEMENT_SHOWTIME, ROUTE_MANAGEMENT_STAFF, ROUTE_MANAGEMENT_STAFF_ADD, ROUTE_MANAGEMENT_STAFF_UPDATE, ROUTE_MANAGEMENT_STATISTICS, ROUTE_MANAGEMENT_WELCOME } from './app/BaseUrl/BaseUrl';
import { AreaManagement } from './pages/Admin/AdminAreaManagement/AreaManagement';
import { BranchManagement } from './pages/Admin/AdminBranchManagement/BranchManagement';
import { ChairManagement } from './pages/Admin/AdminChairManagement/ChairManagement';
import { CountryManagement } from './pages/Admin/AdminCountryManagement/CountryManagement';
import { DirectorManagement } from './pages/Admin/AdminDirectorManagement/DirectorManagement';
import { FormatManagement } from './pages/Admin/AdminFormatManagement/FormatManagement';
import { GenreManagement } from './pages/Admin/AdminGenreManagement/GenreManagement';
import { OrderManagement } from './pages/Admin/AdminOrderManagement/OrderManagement';
import { PromotionManagement } from './pages/Admin/AdminPromotionManagement/PromotionManagement';
import { RoomManagement } from './pages/Admin/AdminRoomManagement/RoomManagement';
import StatisticsManagement from './pages/Admin/AdminStatisticsManagement/StatisticsManagement';
import { ShowTimeManagement } from './pages/Admin/AdminShowTimeManagement/ShowTimeManagement';
import { AdminWelcomeManagement } from './pages/Admin/AdminWelcomeManagement/AdminWelcomeManagement';
import { Login } from './pages/Login/Login';
import { AuthorizationPage } from './pages/Error/Authorization/AuthorizationPage';
import { ForbiddenPage } from './pages/Error/Forbidden/ForbiddenPage';
import { GlobalLoading } from './app/Loading/GlobalLoading';
import { StaffProvider } from './pages/Admin/AdminStaffManagement/store/provider/StaffProvider';
import { AddOrUpdateStaffManagement } from './pages/Admin/AdminStaffManagement/layout/AddOrUpdateStaffManagement';

function App() {

  //react-redux
  const loadingStore = useSelector(state => state.loading.loading);

  //Start Error Route
  const ErrorRoute = [
    {
      key: ROUTE_AUTHORIZATION,
      route: ROUTE_AUTHORIZATION,
      component: <AuthorizationPage />
    },
    {
      key: ROUTE_FORBIDDEN,
      route: ROUTE_FORBIDDEN,
      component: <ForbiddenPage />
    },
  ];

  const loadingErrorRoute = useCallback(() => {
    return ErrorRoute.map(item => (
      <Route key={item.key} path={item.route} element={item.component} />
    ));
  }, []);
  //End Error Route

  //Start All Admin Route
  const AdminRoute = [
    {
      key: ROUTE_MANAGEMENT_WELCOME,
      route: ROUTE_MANAGEMENT_WELCOME,
      component: <AdminWelcomeManagement />,
    },
    {
      key: ROUTE_MANAGEMENT_MOVIE,
      route: ROUTE_MANAGEMENT_MOVIE,
      component: <MovieManagement />,
    },
    {
      key: ROUTE_MANAGEMENT_GENRE,
      route: ROUTE_MANAGEMENT_GENRE,
      component: <GenreManagement />,
    },
    {
      key: ROUTE_MANAGEMENT_SHOWTIME,
      route: ROUTE_MANAGEMENT_SHOWTIME,
      component: <ShowTimeManagement />,
    },
    {
      key: ROUTE_MANAGEMENT_FORMAT,
      route: ROUTE_MANAGEMENT_FORMAT,
      component: <FormatManagement />,
    },
    {
      key: ROUTE_MANAGEMENT_DIRECTOR,
      route: ROUTE_MANAGEMENT_DIRECTOR,
      component: <DirectorManagement />,
    },
    {
      key: ROUTE_MANAGEMENT_COUNTRY,
      route: ROUTE_MANAGEMENT_COUNTRY,
      component: <CountryManagement />,
    },
    {
      key: ROUTE_MANAGEMENT_AREA,
      route: ROUTE_MANAGEMENT_AREA,
      component: <AreaManagement />,
    },
    {
      key: ROUTE_MANAGEMENT_BRANCH,
      route: ROUTE_MANAGEMENT_BRANCH,
      component: <BranchManagement />,
    },
    {
      key: ROUTE_MANAGEMENT_ROOM,
      route: ROUTE_MANAGEMENT_ROOM,
      component: <RoomManagement />,
    },
    {
      key: ROUTE_MANAGEMENT_CHAIR,
      route: ROUTE_MANAGEMENT_CHAIR,
      component: <ChairManagement />,
    },
    {
      key: ROUTE_MANAGEMENT_STATISTICS,
      route: ROUTE_MANAGEMENT_STATISTICS,
      component: <StatisticsManagement />,
    },
    {
      key: ROUTE_MANAGEMENT_PROMOTION,
      route: ROUTE_MANAGEMENT_PROMOTION,
      component: <PromotionManagement />,
    },
    {
      key: ROUTE_MANAGEMENT_ORDER,
      route: ROUTE_MANAGEMENT_ORDER,
      component: <OrderManagement />,
    },
    // Staff Route
    {
      key: ROUTE_MANAGEMENT_STAFF,
      route: ROUTE_MANAGEMENT_STAFF,
      component: <StaffProvider>
        <StaffManagement />
      </StaffProvider>
    },
    {
      key: ROUTE_MANAGEMENT_STAFF_ADD,
      route: ROUTE_MANAGEMENT_STAFF_ADD,
      component: <StaffProvider>
        <AddOrUpdateStaffManagement />
      </StaffProvider>
    },
    {
      key: ROUTE_MANAGEMENT_STAFF_UPDATE,
      route: ROUTE_MANAGEMENT_STAFF_UPDATE,
      component: <StaffProvider>
        <AddOrUpdateStaffManagement />
      </StaffProvider>
    },
  ];

  const loadingAdminRoute = useCallback(() => {
    return AdminRoute.map(item => (
      <Route key={item.key} path={item.route} element={
        <AdminLayoutManagement>
          {item.component}
        </AdminLayoutManagement>
      } />
    ));
  }, []);
  //End All Admin Route

  return (
    <>
      {/* loading global */}
      {loadingStore && <GlobalLoading />}

      {/*toast message*/}
      <ToastContainer />

      {/*Route App*/}
      <BrowserRouter>
        <Routes>
          {/*Login Route*/}
          <Route path={ROUTE_LOGIN} element={<Login />} />;

          {/*Error Route*/}
          {loadingErrorRoute()};

          {/*Admin Route*/}
          {loadingAdminRoute()};
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

import { ToastContainer } from 'react-toastify';
import './App.css';
import { useCallback } from 'react';
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MovieManagement from './pages/Admin/AdminMovieManagement/MovieManagement';
import StaffManagement from './pages/Admin/AdminStaffManagement/StaffManagement';
import { AdminLayoutManagement } from './layouts/Admin/AdminLayoutManagement';
import {
  ROUTE_AUTHORIZATION,
  ROUTE_CLIENT_ACCOUNT,
  ROUTE_CLIENT_BOOK_CHAIR,
  ROUTE_CLIENT_BOOK_TICKET,
  ROUTE_CLIENT_HOME,
  ROUTE_CLIENT_INFORMATION,
  ROUTE_FORBIDDEN,
  ROUTE_LOGIN,
  ROUTE_MANAGEMENT_AREA,
  ROUTE_MANAGEMENT_BRANCH,
  ROUTE_MANAGEMENT_COMBO_FOOD,
  ROUTE_MANAGEMENT_COUNTRY,
  ROUTE_MANAGEMENT_DIRECTOR,
  ROUTE_MANAGEMENT_FORMAT,
  ROUTE_MANAGEMENT_GENRE,
  ROUTE_MANAGEMENT_MOVIE,
  ROUTE_MANAGEMENT_MOVIE_ADD,
  ROUTE_MANAGEMENT_MOVIE_UPDATE,
  ROUTE_MANAGEMENT_ORDER,
  ROUTE_MANAGEMENT_PROMOTION,
  ROUTE_MANAGEMENT_ROOM,
  ROUTE_MANAGEMENT_SHOWTIME,
  ROUTE_MANAGEMENT_STAFF,
  ROUTE_MANAGEMENT_STAFF_ADD,
  ROUTE_MANAGEMENT_STAFF_UPDATE,
  ROUTE_MANAGEMENT_STATISTICS,
  ROUTE_MANAGEMENT_WELCOME
} from './app/BaseUrl/BaseUrl';
import { AreaManagement } from './pages/Admin/AdminAreaManagement/AreaManagement';
import { BranchManagement } from './pages/Admin/AdminBranchManagement/BranchManagement';
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
import { MovieProvider } from './pages/Admin/AdminMovieManagement/store/provider/MovieProvider';
import { AddOrUpdateMovieManagement } from './pages/Admin/AdminMovieManagement/layout/AddOrUpdateMovieManagement';
import { RoomProvider } from './pages/Admin/AdminRoomManagement/store/provider/RoomProvider';
import { ShowTimeProvider } from './pages/Admin/AdminShowTimeManagement/store/provider/ShowTimeProvider';
import { PromotionEventProvider } from './pages/Admin/AdminPromotionManagement/store/provider/PromotionEventProvider';
import { ClientLayoutManagement } from './layouts/Client/ClientLayoutManagement';
import { LoginClient } from './pages/Client/ClientLoginManagement/layout/LoginClient';
import { HomeClient } from './pages/Client/ClientHomeManagement/layout/HomeClient';
import { BookTicket } from './pages/Client/ClientBookTicketManagement/layout/BookTicket';
import { BookChair } from './pages/Client/ClientBookChairManagement/layout/BookChair';
import { ComboFoodManagement } from './pages/Admin/AdminComboFoodManagement/ComboFoodManagement';
import { InformationClient } from './pages/Client/ClientInformationManagement/layout/InformationClient';

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
      component:
        <MovieProvider>
          <MovieManagement />
        </MovieProvider>,
    },
    {
      key: ROUTE_MANAGEMENT_MOVIE_ADD,
      route: ROUTE_MANAGEMENT_MOVIE_ADD,
      component:
        <MovieProvider>
          <AddOrUpdateMovieManagement />
        </MovieProvider>,
    },
    {
      key: ROUTE_MANAGEMENT_MOVIE_UPDATE,
      route: ROUTE_MANAGEMENT_MOVIE_UPDATE,
      component:
        <MovieProvider>
          <AddOrUpdateMovieManagement />
        </MovieProvider>,
    },
    {
      key: ROUTE_MANAGEMENT_GENRE,
      route: ROUTE_MANAGEMENT_GENRE,
      component: <GenreManagement />,
    },
    {
      key: ROUTE_MANAGEMENT_SHOWTIME,
      route: ROUTE_MANAGEMENT_SHOWTIME,
      component:
        <ShowTimeProvider>
          <ShowTimeManagement />
        </ShowTimeProvider>,
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
      key: ROUTE_MANAGEMENT_COMBO_FOOD,
      route: ROUTE_MANAGEMENT_COMBO_FOOD,
      component: <ComboFoodManagement />,
    },
    {
      key: ROUTE_MANAGEMENT_BRANCH,
      route: ROUTE_MANAGEMENT_BRANCH,
      component: <BranchManagement />,
    },
    {
      key: ROUTE_MANAGEMENT_ROOM,
      route: ROUTE_MANAGEMENT_ROOM,
      component:
        <RoomProvider>
          <RoomManagement />
        </RoomProvider>,
    },
    {
      key: ROUTE_MANAGEMENT_STATISTICS,
      route: ROUTE_MANAGEMENT_STATISTICS,
      component: <StatisticsManagement />,
    },
    {
      key: ROUTE_MANAGEMENT_PROMOTION,
      route: ROUTE_MANAGEMENT_PROMOTION,
      component:
        <PromotionEventProvider>
          <PromotionManagement />
        </PromotionEventProvider>,
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
      component:
        <StaffProvider>
          <StaffManagement />
        </StaffProvider>
    },
    {
      key: ROUTE_MANAGEMENT_STAFF_ADD,
      route: ROUTE_MANAGEMENT_STAFF_ADD,
      component:
        <StaffProvider>
          <AddOrUpdateStaffManagement />
        </StaffProvider>
    },
    {
      key: ROUTE_MANAGEMENT_STAFF_UPDATE,
      route: ROUTE_MANAGEMENT_STAFF_UPDATE,
      component:
        <StaffProvider>
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

  // START All Client Route
  const ClientRoute = [
    {
      key: ROUTE_CLIENT_ACCOUNT,
      route: ROUTE_CLIENT_ACCOUNT,
      component: <LoginClient />,
    },
    {
      key: ROUTE_CLIENT_HOME,
      route: ROUTE_CLIENT_HOME,
      component: <HomeClient />,
    },
    {
      key: ROUTE_CLIENT_BOOK_TICKET,
      route: ROUTE_CLIENT_BOOK_TICKET,
      component: <BookTicket />,
    },
    {
      key: ROUTE_CLIENT_BOOK_CHAIR,
      route: ROUTE_CLIENT_BOOK_CHAIR,
      component: <BookChair />,
    },
    {
      key: ROUTE_CLIENT_INFORMATION,
      route: ROUTE_CLIENT_INFORMATION,
      component: <InformationClient />,
    },
  ];

  const loadingClientRoute = useCallback(() => {
    return ClientRoute.map(item => (
      <Route key={item.key} path={item.route} element={
        <ClientLayoutManagement>
          {item.component}
        </ClientLayoutManagement>
      } />
    ));
  }, []);
  // END All Client Route

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

          {/*Client Route */}
          {loadingClientRoute()};
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

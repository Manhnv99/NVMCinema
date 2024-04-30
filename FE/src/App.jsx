import { ToastContainer } from 'react-toastify';
import './App.css';
import { useCallback } from 'react';
import { useSelector } from "react-redux";
import {
  ROUTE_ADMIN_AREA_MANAGEMENT_SHOWTIME,
  ROUTE_ADMIN_AREA_MANAGEMENT_STAFF,
  ROUTE_ADMIN_AREA_MANAGEMENT_STAFF_ADD,
  ROUTE_ADMIN_AREA_MANAGEMENT_STAFF_UPDATE,
  ROUTE_ADMIN_AREA_MANAGEMENT_STATISTICS,
  ROUTE_ADMIN_AREA_MANAGEMENT_WELCOME,
  ROUTE_ADMIN_MANAGEMENT_AREA,
  ROUTE_ADMIN_MANAGEMENT_BRANCH,
  ROUTE_ADMIN_MANAGEMENT_COMBO_FOOD,
  ROUTE_ADMIN_MANAGEMENT_COUNTRY,
  ROUTE_ADMIN_MANAGEMENT_DIRECTOR,
  ROUTE_ADMIN_MANAGEMENT_FORMAT,
  ROUTE_ADMIN_MANAGEMENT_GENRE,
  ROUTE_ADMIN_MANAGEMENT_MOVIE,
  ROUTE_ADMIN_MANAGEMENT_MOVIE_ADD,
  ROUTE_ADMIN_MANAGEMENT_MOVIE_UPDATE,
  ROUTE_ADMIN_MANAGEMENT_PROMOTION,
  ROUTE_ADMIN_MANAGEMENT_ROOM,
  ROUTE_ADMIN_MANAGEMENT_SHOWTIME,
  ROUTE_ADMIN_MANAGEMENT_STAFF,
  ROUTE_ADMIN_MANAGEMENT_STAFF_ADD,
  ROUTE_ADMIN_MANAGEMENT_STAFF_UPDATE,
  ROUTE_ADMIN_MANAGEMENT_STATISTICS,
  ROUTE_ADMIN_MANAGEMENT_WELCOME,
  ROUTE_AUTHORIZATION,
  ROUTE_CLIENT_ACCOUNT,
  ROUTE_CLIENT_BOOK_CHAIR,
  ROUTE_CLIENT_BOOK_TICKET,
  ROUTE_CLIENT_HOME,
  ROUTE_CLIENT_INFORMATION,
  ROUTE_FORBIDDEN,
  ROUTE_LOGIN,
  ROUTE_STAFF_MANAGEMENT_ORDER,
  ROUTE_STAFF_MANAGEMENT_SALE_COUNTER,
  ROUTE_STAFF_MANAGEMENT_SALE_COUNTER_BOOK_CHAIR,
  ROUTE_STAFF_MANAGEMENT_SALE_COUNTER_BOOK_SHOWTIME,
  ROUTE_STAFF_MANAGEMENT_WELCOME
} from './app/BaseUrl/BaseUrl';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import MovieManagement from './pages/Admin/AdminMovieManagement/MovieManagement';
import { StaffManagement as AdminStaffManagement } from './pages/Admin/AdminStaffManagement/StaffManagement';
import { StaffManagement as AdminAreaStaffManagement } from './pages/AdminArea/AdminAreaStaffManagement/StaffManagement';
import { AdminLayoutManagement } from './layouts/Admin/AdminLayoutManagement';
import { AreaManagement } from './pages/Admin/AdminAreaManagement/AreaManagement';
import { BranchManagement } from './pages/Admin/AdminBranchManagement/BranchManagement';
import { CountryManagement } from './pages/Admin/AdminCountryManagement/CountryManagement';
import { DirectorManagement } from './pages/Admin/AdminDirectorManagement/DirectorManagement';
import { FormatManagement } from './pages/Admin/AdminFormatManagement/FormatManagement';
import { GenreManagement } from './pages/Admin/AdminGenreManagement/GenreManagement';
import { PromotionManagement } from './pages/Admin/AdminPromotionManagement/PromotionManagement';
import { RoomManagement } from './pages/Admin/AdminRoomManagement/RoomManagement';
import { StatisticsManagement as AdminStatisticsManagement } from './pages/Admin/AdminStatisticsManagement/StatisticsManagement';
import { StatisticsManagement as AdminAreaStatisticsManagement } from './pages/AdminArea/AdminAreaStatisticsManagement/StatisticsManagement';
import { ShowTimeManagement as AdminShowTimeManagement } from './pages/Admin/AdminShowTimeManagement/ShowTimeManagement';
import { ShowTimeManagement as AdminAreaShowTimeManagement } from './pages/AdminArea/AdminAreaShowTimeManagement/ShowTimeManagement';
import { AdminWelcomeManagement } from './pages/Admin/AdminWelcomeManagement/AdminWelcomeManagement';
import { Login } from './pages/Login/Login';
import { AuthorizationPage } from './pages/Error/Authorization/AuthorizationPage';
import { ForbiddenPage } from './pages/Error/Forbidden/ForbiddenPage';
import { GlobalLoading } from './app/Loading/GlobalLoading';
import { StaffProvider as AdminStaffProvider } from './pages/Admin/AdminStaffManagement/store/provider/StaffProvider';
import { StaffProvider as AdminAreaStaffProvider } from './pages/AdminArea/AdminAreaStaffManagement/store/provider/StaffProvider';
import { AddOrUpdateStaffManagement as AdminAddOrUpdateStaffManagement } from './pages/Admin/AdminStaffManagement/layout/AddOrUpdateStaffManagement';
import { AddOrUpdateStaffManagement as AdminAreaAddOrUpdateStaffManagement } from './pages/AdminArea/AdminAreaStaffManagement/layout/AddOrUpdateStaffManagement';
import { MovieProvider } from './pages/Admin/AdminMovieManagement/store/provider/MovieProvider';
import { AddOrUpdateMovieManagement } from './pages/Admin/AdminMovieManagement/layout/AddOrUpdateMovieManagement';
import { RoomProvider } from './pages/Admin/AdminRoomManagement/store/provider/RoomProvider';
import { ShowTimeProvider as AdminShowTimeProvider } from './pages/Admin/AdminShowTimeManagement/store/provider/ShowTimeProvider';
import { ShowTimeProvider as AdminAreaShowTimeProvider } from './pages/AdminArea/AdminAreaShowTimeManagement/store/provider/ShowTimeProvider';
import { PromotionEventProvider } from './pages/Admin/AdminPromotionManagement/store/provider/PromotionEventProvider';
import { ClientLayoutManagement } from './layouts/Client/ClientLayoutManagement';
import { LoginClient } from './pages/Client/ClientLoginManagement/layout/LoginClient';
import { HomeClient } from './pages/Client/ClientHomeManagement/layout/HomeClient';
import { BookTicket } from './pages/Client/ClientBookTicketManagement/layout/BookTicket';
import { BookChair } from './pages/Client/ClientBookChairManagement/layout/BookChair';
import { ComboFoodManagement } from './pages/Admin/AdminComboFoodManagement/ComboFoodManagement';
import { InformationClient } from './pages/Client/ClientInformationManagement/layout/InformationClient';
import { AdminAreaLayoutManagement } from './layouts/AdminArea/AdminAreaLayoutManagement';
import { AdminAreaWelcomeManagement } from './pages/AdminArea/AdminAreaWelcomeManagement/AdminAreaWelcomeManagement';
import { OrderManagement } from './pages/Staff/StaffOrderManagement/layout/OrderManagement';
import { SaleCounterManagement } from './pages/Staff/StaffSaleCounterManagement/layout/SaleCounterManagement';
import { StaffLayoutManagement } from './layouts/Staff/StaffLayoutManagement';
import { StaffWelcomeManagement } from './pages/Staff/StaffWelcomeManagement/StaffWelcomeManagement';
import { OrderProvider } from './pages/Staff/StaffOrderManagement/store/provider/OrderProvider';
import { SaleCounterProvider } from './pages/Staff/StaffSaleCounterManagement/store/provider/SaleCounterProvider';
import { SaleCounterBookShowTime } from './pages/Staff/StaffSaleCounterManagement/layout/SaleCounterBookShowTime';
import { SaleCounterBookChair } from './pages/Staff/StaffSaleCounterManagement/layout/SaleCounterBookChair';

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

  //START All Admin Route
  const AdminRoute = [
    {
      key: ROUTE_ADMIN_MANAGEMENT_WELCOME,
      route: ROUTE_ADMIN_MANAGEMENT_WELCOME,
      component: <AdminWelcomeManagement />,
    },
    {
      key: ROUTE_ADMIN_MANAGEMENT_MOVIE,
      route: ROUTE_ADMIN_MANAGEMENT_MOVIE,
      component:
        <MovieProvider>
          <MovieManagement />
        </MovieProvider>,
    },
    {
      key: ROUTE_ADMIN_MANAGEMENT_MOVIE_ADD,
      route: ROUTE_ADMIN_MANAGEMENT_MOVIE_ADD,
      component:
        <MovieProvider>
          <AddOrUpdateMovieManagement />
        </MovieProvider>,
    },
    {
      key: ROUTE_ADMIN_MANAGEMENT_MOVIE_UPDATE,
      route: ROUTE_ADMIN_MANAGEMENT_MOVIE_UPDATE,
      component:
        <MovieProvider>
          <AddOrUpdateMovieManagement />
        </MovieProvider>,
    },
    {
      key: ROUTE_ADMIN_MANAGEMENT_GENRE,
      route: ROUTE_ADMIN_MANAGEMENT_GENRE,
      component: <GenreManagement />,
    },
    {
      key: ROUTE_ADMIN_MANAGEMENT_SHOWTIME,
      route: ROUTE_ADMIN_MANAGEMENT_SHOWTIME,
      component:
        <AdminShowTimeProvider>
          <AdminShowTimeManagement />
        </AdminShowTimeProvider>,
    },
    {
      key: ROUTE_ADMIN_MANAGEMENT_FORMAT,
      route: ROUTE_ADMIN_MANAGEMENT_FORMAT,
      component: <FormatManagement />,
    },
    {
      key: ROUTE_ADMIN_MANAGEMENT_DIRECTOR,
      route: ROUTE_ADMIN_MANAGEMENT_DIRECTOR,
      component: <DirectorManagement />,
    },
    {
      key: ROUTE_ADMIN_MANAGEMENT_COUNTRY,
      route: ROUTE_ADMIN_MANAGEMENT_COUNTRY,
      component: <CountryManagement />,
    },
    {
      key: ROUTE_ADMIN_MANAGEMENT_AREA,
      route: ROUTE_ADMIN_MANAGEMENT_AREA,
      component: <AreaManagement />,
    },
    {
      key: ROUTE_ADMIN_MANAGEMENT_COMBO_FOOD,
      route: ROUTE_ADMIN_MANAGEMENT_COMBO_FOOD,
      component: <ComboFoodManagement />,
    },
    {
      key: ROUTE_ADMIN_MANAGEMENT_BRANCH,
      route: ROUTE_ADMIN_MANAGEMENT_BRANCH,
      component: <BranchManagement />,
    },
    {
      key: ROUTE_ADMIN_MANAGEMENT_ROOM,
      route: ROUTE_ADMIN_MANAGEMENT_ROOM,
      component:
        <RoomProvider>
          <RoomManagement />
        </RoomProvider>,
    },
    {
      key: ROUTE_ADMIN_MANAGEMENT_STATISTICS,
      route: ROUTE_ADMIN_MANAGEMENT_STATISTICS,
      component: <AdminStatisticsManagement />,
    },
    {
      key: ROUTE_ADMIN_MANAGEMENT_PROMOTION,
      route: ROUTE_ADMIN_MANAGEMENT_PROMOTION,
      component:
        <PromotionEventProvider>
          <PromotionManagement />
        </PromotionEventProvider>,
    },
    {
      key: ROUTE_ADMIN_MANAGEMENT_STAFF,
      route: ROUTE_ADMIN_MANAGEMENT_STAFF,
      component:
        <AdminStaffProvider>
          <AdminStaffManagement />
        </AdminStaffProvider>
    },
    {
      key: ROUTE_ADMIN_MANAGEMENT_STAFF_ADD,
      route: ROUTE_ADMIN_MANAGEMENT_STAFF_ADD,
      component:
        <AdminStaffProvider>
          <AdminAddOrUpdateStaffManagement />
        </AdminStaffProvider>
    },
    {
      key: ROUTE_ADMIN_MANAGEMENT_STAFF_UPDATE,
      route: ROUTE_ADMIN_MANAGEMENT_STAFF_UPDATE,
      component:
        <AdminStaffProvider>
          <AdminAddOrUpdateStaffManagement />
        </AdminStaffProvider>
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
  //END All Admin Route

  //START All AdminArea Route
  const AdminAreaRoute = [
    {
      key: ROUTE_ADMIN_AREA_MANAGEMENT_WELCOME,
      route: ROUTE_ADMIN_AREA_MANAGEMENT_WELCOME,
      component: <AdminAreaWelcomeManagement />,
    },
    {
      key: ROUTE_ADMIN_AREA_MANAGEMENT_STATISTICS,
      route: ROUTE_ADMIN_AREA_MANAGEMENT_STATISTICS,
      component: <AdminAreaStatisticsManagement />,
    },
    {
      key: ROUTE_ADMIN_AREA_MANAGEMENT_SHOWTIME,
      route: ROUTE_ADMIN_AREA_MANAGEMENT_SHOWTIME,
      component:
        <AdminAreaShowTimeProvider>
          <AdminAreaShowTimeManagement />
        </AdminAreaShowTimeProvider>,
    },
    {
      key: ROUTE_ADMIN_AREA_MANAGEMENT_STAFF,
      route: ROUTE_ADMIN_AREA_MANAGEMENT_STAFF,
      component:
        <AdminAreaStaffProvider>
          <AdminAreaStaffManagement />
        </AdminAreaStaffProvider>
    },
    {
      key: ROUTE_ADMIN_AREA_MANAGEMENT_STAFF_ADD,
      route: ROUTE_ADMIN_AREA_MANAGEMENT_STAFF_ADD,
      component:
        <AdminAreaStaffProvider>
          <AdminAreaAddOrUpdateStaffManagement />
        </AdminAreaStaffProvider>
    },
    {
      key: ROUTE_ADMIN_AREA_MANAGEMENT_STAFF_UPDATE,
      route: ROUTE_ADMIN_AREA_MANAGEMENT_STAFF_UPDATE,
      component:
        <AdminAreaStaffProvider>
          <AdminAreaAddOrUpdateStaffManagement />
        </AdminAreaStaffProvider>
    },
  ];
  const loadingAdminAreaRoute = useCallback(() => {
    return AdminAreaRoute.map(item => (
      <Route key={item.key} path={item.route} element={
        <AdminAreaLayoutManagement>
          {item.component}
        </AdminAreaLayoutManagement>
      } />
    ));
  }, []);
  //END All AdminArea Route

  //START All Staff Route
  const StaffRoute = [
    {
      key: ROUTE_STAFF_MANAGEMENT_WELCOME,
      route: ROUTE_STAFF_MANAGEMENT_WELCOME,
      component: <StaffWelcomeManagement />,
    },
    {
      key: ROUTE_STAFF_MANAGEMENT_ORDER,
      route: ROUTE_STAFF_MANAGEMENT_ORDER,
      component: <OrderProvider>
        <OrderManagement />
      </OrderProvider>,
    },
    {
      key: ROUTE_STAFF_MANAGEMENT_SALE_COUNTER,
      route: ROUTE_STAFF_MANAGEMENT_SALE_COUNTER,
      component: <SaleCounterProvider>
        <SaleCounterManagement />
      </SaleCounterProvider>,
    },
    {
      key: ROUTE_STAFF_MANAGEMENT_SALE_COUNTER_BOOK_SHOWTIME,
      route: ROUTE_STAFF_MANAGEMENT_SALE_COUNTER_BOOK_SHOWTIME,
      component: <SaleCounterProvider>
        <SaleCounterBookShowTime />
      </SaleCounterProvider>,
    },
    {
      key: ROUTE_STAFF_MANAGEMENT_SALE_COUNTER_BOOK_CHAIR,
      route: ROUTE_STAFF_MANAGEMENT_SALE_COUNTER_BOOK_CHAIR,
      component: <SaleCounterProvider>
        <SaleCounterBookChair />
      </SaleCounterProvider>,
    },
  ];
  const loadingStaffRoute = useCallback(() => {
    return StaffRoute.map(item => (
      <Route key={item.key} path={item.route} element={
        <StaffLayoutManagement>
          {item.component}
        </StaffLayoutManagement>
      } />
    ))
  }, []);
  //END All Staff Route

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
          {/*HomePage auto Redirect*/}
          <Route path='/' element={<Navigate to={ROUTE_CLIENT_HOME} />}>
            {/* <Redirect to={ROUTE_CLIENT_HOME} /> */}
          </Route>
          {/*Login Route*/}
          <Route path={ROUTE_LOGIN} element={<Login />} />;

          {/*Error Route*/}
          {loadingErrorRoute()};

          {/*Admin Route*/}
          {loadingAdminRoute()};

          {/*Admin Area Route*/}
          {loadingAdminAreaRoute()}

          {/*Staff Route*/}
          {loadingStaffRoute()}

          {/*Client Route */}
          {loadingClientRoute()};
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

export const baseURL = import.meta.env.VITE_REACT_APP_API_URL;

// base API Follow by role

export const URL_AUTHENTICATION = "/api/auth";

export const URL_API_ADMIN = "/api/admin";

export const URL_API_ADMIN_AREA = "/api/admin-area";

export const URL_API_STAFF = "/api/staff";

export const URL_API_CLIENT = "/api/client";

// các API của authen
export const URL_LOGIN_API = URL_AUTHENTICATION + "/login";

export const URL_REGISTER_API = URL_AUTHENTICATION + "/register";

export const URL_PUT_REGISTER_API = URL_AUTHENTICATION + "/put-register";

// các API của admin
export const URL_API_ADMIN_STAFF_MANAGEMENT = URL_API_ADMIN + "/staff-management";

export const URL_API_ADMIN_MOVIE_MANAGEMENT = URL_API_ADMIN + "/movie-management";

export const URL_API_ADMIN_DIRECTOR_MANAGEMENT = URL_API_ADMIN + "/director-management";

export const URL_API_ADMIN_FORMAT_MANAGEMENT = URL_API_ADMIN + "/format-management";

export const URL_API_ADMIN_COUNTRY_MANAGEMENT = URL_API_ADMIN + "/country-management";

export const URL_API_ADMIN_GENRE_MANAGEMENT = URL_API_ADMIN + "/genre-management";

export const URL_API_ADMIN_AREA_MANAGEMENT = URL_API_ADMIN + "/area-management";

export const URL_API_ADMIN_BRANCH_MANAGEMENT = URL_API_ADMIN + "/branch-management";

export const URL_API_ADMIN_ROOM_MANAGEMENT = URL_API_ADMIN + "/room-management";

export const URL_API_ADMIN_CHAIR_MANAGEMENT = URL_API_ADMIN + "/chair-management";

export const URL_API_ADMIN_SHOWTIME_MANAGEMENT = URL_API_ADMIN + "/showtime-management";

export const URL_API_ADMIN_STATISTICS_MANAGEMENT = URL_API_ADMIN + "/statistics-management";

export const URL_API_ADMIN_COMBO_FOOD_MANAGEMENT = URL_API_ADMIN + "/combo-food-management";

export const URL_API_ADMIN_PROMOTION_EVENT_MANAGEMENT = URL_API_ADMIN + "/promotion_event-management";

// các API của admin-area
export const URL_API_ADMIN_AREA_STATISTICS_MANAGEMENT = URL_API_ADMIN_AREA + "/statistics-management";

export const URL_API_ADMIN_AREA_SHOWTIME_MANAGEMENT = URL_API_ADMIN_AREA + "/showtime-management";

export const URL_API_ADMIN_AREA_STAFF_MANAGEMENT = URL_API_ADMIN_AREA + "/staff-management"

// các API của staff
export const URL_API_STAFF_ORDER_MANAGEMENT = URL_API_STAFF + "/order-management";

export const URL_API_STAFF_SALE_COUNTER_MANAGEMENT = URL_API_STAFF + "/sale-counter-management";

// các API của client
export const URL_API_CLIENT_AUTHENTICATION = URL_API_CLIENT + "/authentication";

export const URL_API_CLIENT_HOME_PAGE = URL_API_CLIENT + "/home-page";

export const URL_API_CLIENT_BOOK_TICKET = URL_API_CLIENT + "/book-ticket";

export const URL_API_CLIENT_BOOK_CHAIR = URL_API_CLIENT + "/book-chair";

export const URL_API_CLIENT_INFORMATION_CLIENT = URL_API_CLIENT + "/information-client";

export const URL_API_CLIENT_CINEMA_SYSTEM = URL_API_CLIENT + "/cinema-system";

export const URL_API_CLIENT_PROMOTION_EVENT = URL_API_CLIENT + "/promotion-event";
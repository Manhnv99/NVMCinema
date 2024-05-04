
//Login
export const ROUTE_LOGIN = "/admin-login";

//Error
export const ADMIN_ROUTE_AUTHORIZATION = "/error-authorization";

export const ADMIN_ROUTE_FORBIDDEN = "/error-forbidden";

//START Route Admin
export const ROUTE_ADMIN_MANAGEMENT_WELCOME = "/admin";

export const ROUTE_ADMIN_MANAGEMENT_STATISTICS = "/admin/management-statistics";

export const ROUTE_ADMIN_MANAGEMENT_MOVIE = "/admin/management-movie";
export const ROUTE_ADMIN_MANAGEMENT_MOVIE_ADD = "/admin/management-movie/add";
export const ROUTE_ADMIN_MANAGEMENT_MOVIE_UPDATE = "/admin/management-movie/update/:id";

export const ROUTE_ADMIN_MANAGEMENT_STAFF = "/admin/management-staff";
export const ROUTE_ADMIN_MANAGEMENT_STAFF_ADD = "/admin/management-staff/add";
export const ROUTE_ADMIN_MANAGEMENT_STAFF_UPDATE = "/admin/management-staff/update/:id";

export const ROUTE_ADMIN_MANAGEMENT_PROMOTION = "/admin/management-promotion";

export const ROUTE_ADMIN_MANAGEMENT_GENRE = "/admin/management-genre";

export const ROUTE_ADMIN_MANAGEMENT_FORMAT = "/admin/management-format";

export const ROUTE_ADMIN_MANAGEMENT_DIRECTOR = "/admin/management-director";

export const ROUTE_ADMIN_MANAGEMENT_COUNTRY = "/admin/management-country";

export const ROUTE_ADMIN_MANAGEMENT_AREA = "/admin/management-area";

export const ROUTE_ADMIN_MANAGEMENT_COMBO_FOOD = "/admin/management-combo-food";

export const ROUTE_ADMIN_MANAGEMENT_BRANCH = "/admin/management-branch";

export const ROUTE_ADMIN_MANAGEMENT_ROOM = "/admin/management-room";

export const ROUTE_ADMIN_MANAGEMENT_SHOWTIME = "/admin/management-showtime";
//END Route Admin


//START Route AdminArea
export const ROUTE_ADMIN_AREA_MANAGEMENT_WELCOME = "/admin-area";

export const ROUTE_ADMIN_AREA_MANAGEMENT_STATISTICS = "/admin-area/management-statistics";

export const ROUTE_ADMIN_AREA_MANAGEMENT_SHOWTIME = "/admin-area/management-showtime";

export const ROUTE_ADMIN_AREA_MANAGEMENT_STAFF = "/admin-area/management-staff";
export const ROUTE_ADMIN_AREA_MANAGEMENT_STAFF_ADD = "/admin-area/management-staff/add";
export const ROUTE_ADMIN_AREA_MANAGEMENT_STAFF_UPDATE = "/admin-area/management-staff/update/:id";
//END Route AdminArea

//START Route Staff
export const ROUTE_STAFF_MANAGEMENT_WELCOME = "/staff";

export const ROUTE_STAFF_MANAGEMENT_ORDER = "/staff/management-order";

export const ROUTE_STAFF_MANAGEMENT_SALE_COUNTER = "/staff/management-sale-counter";

export const ROUTE_STAFF_MANAGEMENT_SALE_COUNTER_BOOK_SHOWTIME = "/staff/management-sale-counter/dat-ve/:movieId";

export const ROUTE_STAFF_MANAGEMENT_SALE_COUNTER_BOOK_CHAIR = "/staff/management-sale-counter/dat-cho-ngoi/:showTimeId";
//END Route Staff

//START Route Client
export const ROUTE_CLIENT_ACCOUNT = "/tai-khoan";

export const ROUTE_CLIENT_HOME = "/trang-chu";

export const ROUTE_CLIENT_BOOK_TICKET = "/dat-ve/:movieId";

export const ROUTE_CLIENT_BOOK_CHAIR = "/dat-cho-ngoi/:showTimeId";

export const ROUTE_CLIENT_INFORMATION = "/thong-tin-tai-khoan";

export const ROUTE_CLIENT_BRANCH_SYSTEM = "/rap-chieu";

export const ROUTE_CLIENT_PROMOTION_EVENT = "/khuyen-mai-su-kien";
//END Route Client
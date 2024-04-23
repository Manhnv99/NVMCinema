package nvm.project.qlcinema.infrastructure.constant;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class UrlPath {

    public static final String URL_API_AUTHENTICATION = "/api/auth";

    public static final String URL_API_ADMIN = "/api/admin";

    public static final String URL_API_ADMIN_AREA = "/api/admin-area";

    public static final String URL_API_STAFF = "/api/staff";

    public static final String URL_API_CLIENT = "/api/client";

    /**
     * Các API của ADMIN
    */

    public static final String URL_API_ADMIN_STAFF_MANAGEMENT = URL_API_ADMIN + "/staff-management";

    public static final String URL_API_ADMIN_MOVIE_MANAGEMENT = URL_API_ADMIN + "/movie-management";

    public static final String URL_API_ADMIN_DIRECTOR_MANAGEMENT = URL_API_ADMIN + "/director-management";

    public static final String URL_API_ADMIN_FORMAT_MANAGEMENT = URL_API_ADMIN + "/format-management";

    public static final String URL_API_ADMIN_COUNTRY_MANAGEMENT = URL_API_ADMIN + "/country-management";

    public static final String URL_API_ADMIN_GENRE_MANAGEMENT = URL_API_ADMIN + "/genre-management";

    public static final String URL_API_ADMIN_AREA_MANAGEMENT = URL_API_ADMIN + "/area-management";

    public static final String URL_API_ADMIN_BRANCH_MANAGEMENT = URL_API_ADMIN + "/branch-management";

    public static final String URL_API_ADMIN_ROOM_MANAGEMENT = URL_API_ADMIN + "/room-management";

    public static final String URL_API_ADMIN_CHAIR_MANAGEMENT = URL_API_ADMIN + "/chair-management";

    public static final String URL_API_ADMIN_SHOWTIME_MANAGEMENT = URL_API_ADMIN + "/showtime-management";

    public static final String URL_API_ADMIN_STATISTICS_MANAGEMENT = URL_API_ADMIN + "/statistics-management"
            ;
    public static final String URL_API_ADMIN_ORDER_MANAGEMENT = URL_API_ADMIN + "/order-management";

    public static final String URL_API_ADMIN_PROMOTION_EVENT_MANAGEMENT = URL_API_ADMIN + "/promotion_event-management";

    /**
     * Các API của STAFF
     */

    /**
     * Các API của CLIENT
     */

    public static final String URL_API_CLIENT_AUTHENTICATION = URL_API_CLIENT + "/authentication";

    public static final String URL_API_CLIENT_HOME_PAGE = URL_API_CLIENT + "/home-page";

    public static final String URL_API_CLIENT_BOOK_TICKET = URL_API_CLIENT + "/book-ticket";

    public static final String URL_API_CLIENT_BOOK_CHAIR = URL_API_ADMIN + "/book-chair";

}

package nvm.project.qlcinema.core.client.homepage.service;

import nvm.project.qlcinema.core.common.ResponseObject;

public interface ClientHomePageService {

    ResponseObject getListMovieCurrentShowing(String areaId);

    ResponseObject getListMoviePreTicket(String areaId);

    ResponseObject getListMovieUpComing(String areaId);

    ResponseObject getListArea();

    ResponseObject getDetailMovie(String movieId);

}

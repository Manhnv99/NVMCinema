package nvm.project.qlcinema.core.client.homepage.service;

import nvm.project.qlcinema.core.common.ResponseObject;

public interface ClientHomePageService {

    ResponseObject getListMovieCurrentShowing();

    ResponseObject getListMoviePreTicket();

    ResponseObject getListMovieUpComing();

    ResponseObject getListArea();

    ResponseObject getDetailMovie(String movieId);

}

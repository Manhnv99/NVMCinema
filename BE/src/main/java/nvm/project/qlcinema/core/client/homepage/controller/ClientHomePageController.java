package nvm.project.qlcinema.core.client.homepage.controller;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.client.homepage.service.ClientHomePageService;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.infrastructure.constant.UrlPath;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping(UrlPath.URL_API_CLIENT_HOME_PAGE)
public class ClientHomePageController {

    private final ClientHomePageService clientHomePageService;

    @GetMapping("/list-movie-current-showing/{areaId}")
    public ResponseObject getListMovieCurrentShowing(@PathVariable String areaId) {
        return clientHomePageService.getListMovieCurrentShowing(areaId);
    }

    @GetMapping("/list-movie-pre-ticket/{areaId}")
    public ResponseObject getListMoviePreTicket(@PathVariable String areaId) {
        return clientHomePageService.getListMoviePreTicket(areaId);
    }

    @GetMapping("/list-movie-upcoming")
    public ResponseObject getListMovieUpComing() {
        return clientHomePageService.getListMovieUpComing();
    }

    @GetMapping("/list-area")
    public ResponseObject getListArea() {
        return clientHomePageService.getListArea();
    }

    @GetMapping("/detail-movie/{movieId}")
    public ResponseObject getDetailMovie(@PathVariable String movieId) {
        return clientHomePageService.getDetailMovie(movieId);
    }

}

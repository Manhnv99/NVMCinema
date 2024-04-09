package nvm.project.qlcinema.core.admin.moviemanagement.controller;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.infrastructure.constant.UrlPath;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RequestMapping(UrlPath.URL_API_ADMIN_MOVIE_MANAGEMENT)
@RestController
@RequiredArgsConstructor
public class AdminMovieManagementController {
}

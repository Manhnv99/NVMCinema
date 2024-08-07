package nvm.project.qlcinema.core.admin.moviemanagement.service.impl;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.admin.moviemanagement.model.request.AdminMovieManagementListMovieRequest;
import nvm.project.qlcinema.core.admin.moviemanagement.model.request.AdminMovieManagementPostRequest;
import nvm.project.qlcinema.core.admin.moviemanagement.model.request.AdminMovieManagementPutRequest;
import nvm.project.qlcinema.core.admin.moviemanagement.model.response.AdminMovieManagementDetailMovieResponse;
import nvm.project.qlcinema.core.admin.moviemanagement.model.response.AdminMovieManagementGetOneMovieResponse;
import nvm.project.qlcinema.core.admin.moviemanagement.model.response.AdminMovieManagementListMovieResponse;
import nvm.project.qlcinema.core.admin.moviemanagement.repository.AdminMovieManagementCountryRepository;
import nvm.project.qlcinema.core.admin.moviemanagement.repository.AdminMovieManagementDirectorRepository;
import nvm.project.qlcinema.core.admin.moviemanagement.repository.AdminMovieManagementFormatRepository;
import nvm.project.qlcinema.core.admin.moviemanagement.repository.AdminMovieManagementGenreRepository;
import nvm.project.qlcinema.core.admin.moviemanagement.repository.AdminMovieManagementRepository;
import nvm.project.qlcinema.core.admin.moviemanagement.service.AdminMovieManagementService;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.entity.Area;
import nvm.project.qlcinema.entity.Country;
import nvm.project.qlcinema.entity.Director;
import nvm.project.qlcinema.entity.Format;
import nvm.project.qlcinema.entity.Genre;
import nvm.project.qlcinema.entity.Movie;
import nvm.project.qlcinema.infrastructure.config.cloudinary.CloudinaryConfig;
import nvm.project.qlcinema.infrastructure.constant.Subtitle;
import nvm.project.qlcinema.infrastructure.exception.RestApiException;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminMovieManagementServiceImpl implements AdminMovieManagementService {

    private final AdminMovieManagementRepository adminMovieManagementRepository;

    private final AdminMovieManagementCountryRepository adminMovieManagementCountryRepository;

    private final AdminMovieManagementDirectorRepository adminMovieManagementDirectorRepository;

    private final AdminMovieManagementFormatRepository adminMovieManagementFormatRepository;

    private final AdminMovieManagementGenreRepository adminMovieManagementGenreRepository;

    private final CloudinaryConfig cloudinaryConfig;

    @Override
    public PageableObject<AdminMovieManagementListMovieResponse> getSearchListMovie(AdminMovieManagementListMovieRequest request) {
        try {
            PageRequest pageRequest = PageRequest.of(request.getPage() - 1, request.getSize());
            return new PageableObject<>(adminMovieManagementRepository.getSearchListMovie(pageRequest, request));
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách phim!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getOneMovie(String id) {
        try {
            return new ResponseObject(adminMovieManagementRepository.getOneMovie(id));
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được bộ phim này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getDetailMovie(String id) {
        try {
            return new ResponseObject(adminMovieManagementRepository.getDetailMovie(id));
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được bộ phim này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject postMovie(AdminMovieManagementPostRequest postRequest) throws IOException {
        List<String> errors = new ArrayList<>();

        //check Banner Empty
        if (postRequest.getBanner().isEmpty()) {
            errors.add("Bạn chưa chọn banner cho bộ phim này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
        //check isExist Entity
        Optional<Country> isCountryExist = adminMovieManagementCountryRepository.findById(postRequest.getCountryId());
        if (isCountryExist.isEmpty()) {
            errors.add("Không tìm thấy quốc gia bạn chọn!");
        }
        Optional<Director> isDirectorExist = adminMovieManagementDirectorRepository.findById(postRequest.getDirectorId());
        if (isDirectorExist.isEmpty()) {
            errors.add("Không tìm thấy đạo diễn bạn chọn!");
        }
        Optional<Format> isFormatExist = adminMovieManagementFormatRepository.findById(postRequest.getFormatId());
        if (isFormatExist.isEmpty()) {
            errors.add("Không tìm thấy phân giải bạn chọn!");
        }
        Optional<Genre> isGenreExist = adminMovieManagementGenreRepository.findById(postRequest.getGenreId());
        if (isGenreExist.isEmpty()) {
            errors.add("Không tìm thấy thể loại bạn chọn!");
        }
        //throw error
        if (!errors.isEmpty()) {
            throw new RestApiException(errors, HttpStatus.NOT_FOUND);
        }

        //postMovie
        Movie postMovie = new Movie();
        Optional<Movie> movieNewest = adminMovieManagementRepository.getNewest();
        if (movieNewest.isPresent()) {
            String code = movieNewest.get().getCode();
            postMovie.setCode(code.substring(0, 2) + ((Integer.parseInt(code.substring(2))) + 1));
        } else {
            postMovie.setCode("MV1");
        }
        postMovie.setName(postRequest.getName());
        postMovie.setDuration(postRequest.getDuration());
        postMovie.setAgeRestriction(postRequest.getAgeRestriction());
        postMovie.setReleaseDate(postRequest.getReleaseDate());
        postMovie.setVideoPath(postRequest.getVideoPath());
        postMovie.setActor(postRequest.getActor());
        postMovie.setDescription(postRequest.getDescription());
        var result = cloudinaryConfig.upload(postRequest.getBanner());//upload image to cloudinary
        postMovie.setBannerId((String) result.get("public_id"));
        postMovie.setBannerUrl((String) result.get("url"));
        for (Subtitle subtitle : Subtitle.values()) {
            if (postRequest.getSubTitle().equals(subtitle.getName())) {
                postMovie.setSubTitle(subtitle.getName());
            }
        }
        postMovie.setDirectorId(isDirectorExist.get());
        postMovie.setGenreId(isGenreExist.get());
        postMovie.setCountryId(isCountryExist.get());
        postMovie.setFormatId(isFormatExist.get());
        postMovie.setDeleted(true);
        postMovie.setCreatedAt(new Date());
        adminMovieManagementRepository.save(postMovie);

        return new ResponseObject("Tạo mới thành công bộ phim!");
    }

    @Override
    public ResponseObject putMovie(AdminMovieManagementPutRequest putRequest) throws IOException {
        List<String> errors = new ArrayList<>();

        //check Duplicate
        Optional<Movie> isMovieExist = adminMovieManagementRepository.findById(putRequest.getId());
        if (isMovieExist.isEmpty()) {
            errors.add("Không tìm thấy bộ phim này!");
            throw new RestApiException(errors, HttpStatus.NOT_FOUND);
        }
        //check isExist Entity
        Optional<Country> isCountryExist = adminMovieManagementCountryRepository.findById(putRequest.getCountryId());
        if (isCountryExist.isEmpty()) {
            errors.add("Không tìm thấy quốc gia bạn chọn!");
        }
        Optional<Director> isDirectorExist = adminMovieManagementDirectorRepository.findById(putRequest.getDirectorId());
        if (isDirectorExist.isEmpty()) {
            errors.add("Không tìm thấy đạo diễn bạn chọn!");
        }
        Optional<Format> isFormatExist = adminMovieManagementFormatRepository.findById(putRequest.getFormatId());
        if (isFormatExist.isEmpty()) {
            errors.add("Không tìm thấy phân giải bạn chọn!");
        }
        Optional<Genre> isGenreExist = adminMovieManagementGenreRepository.findById(putRequest.getGenreId());
        if (isGenreExist.isEmpty()) {
            errors.add("Không tìm thấy thể loại bạn chọn!");
        }
        //throw error
        if (!errors.isEmpty()) {
            throw new RestApiException(errors, HttpStatus.NOT_FOUND);
        }

        //postMovie
        Movie putMovie = isMovieExist.get();
        putMovie.setName(putRequest.getName());
        putMovie.setDuration(putRequest.getDuration());
        putMovie.setAgeRestriction(putRequest.getAgeRestriction());
        putMovie.setReleaseDate(putRequest.getReleaseDate());
        putMovie.setVideoPath(putRequest.getVideoPath());
        putMovie.setActor(putRequest.getActor());
        putMovie.setDescription(putRequest.getDescription());
        if (!putRequest.getBanner().isEmpty()) {
            cloudinaryConfig.delete(putMovie.getBannerId());
            var result = cloudinaryConfig.upload(putRequest.getBanner());//upload image to cloudinary
            putMovie.setBannerId((String) result.get("public_id"));
            putMovie.setBannerUrl((String) result.get("url"));
        }
        for (Subtitle subtitle : Subtitle.values()) {
            if (putRequest.getSubTitle().equals(subtitle.getName())) {
                putMovie.setSubTitle(subtitle.getName());
            }
        }
        putMovie.setDirectorId(isDirectorExist.get());
        putMovie.setGenreId(isGenreExist.get());
        putMovie.setCountryId(isCountryExist.get());
        putMovie.setFormatId(isFormatExist.get());
        adminMovieManagementRepository.save(putMovie);

        return new ResponseObject("Cập nhật thành công bộ phim!");
    }

    @Override
    public ResponseObject deleteMovie(String id) {
        List<String> errors = new ArrayList<>();
        //check isExist
        Optional<Movie> isMovieExist = adminMovieManagementRepository.findById(id);
        if (isMovieExist.isEmpty()) {
            errors.add("Không tìm thấy bộ phim này!");
            throw new RestApiException(errors, HttpStatus.NOT_FOUND);
        }
        Movie deleteMovie = isMovieExist.get();
        deleteMovie.setDeleted(!deleteMovie.isDeleted());
        adminMovieManagementRepository.save(deleteMovie);

        return new ResponseObject("Thay đổi trạng thái bộ phim thành công!");
    }

    @Override
    public ResponseObject getListCountry() {
        try {
            return new ResponseObject(adminMovieManagementCountryRepository.getListCountry());
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách quốc gia!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getListDirector() {
        try {
            return new ResponseObject(adminMovieManagementDirectorRepository.getListDirector());
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách đạo diễn!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getListFormat() {
        try {
            return new ResponseObject(adminMovieManagementFormatRepository.getListFormat());
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách phân giải!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getListGenre() {
        try {
            return new ResponseObject(adminMovieManagementGenreRepository.getListGenre());
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách thể loại!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

}

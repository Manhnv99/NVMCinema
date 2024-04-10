package nvm.project.qlcinema.core.admin.moviemanagement.service.impl;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.admin.moviemanagement.model.request.AdminMovieManagementPostRequest;
import nvm.project.qlcinema.core.admin.moviemanagement.model.request.AdminMovieManagementPutRequest;
import nvm.project.qlcinema.core.admin.moviemanagement.repository.AdminMovieManagementCountryRepository;
import nvm.project.qlcinema.core.admin.moviemanagement.repository.AdminMovieManagementDirectorRepository;
import nvm.project.qlcinema.core.admin.moviemanagement.repository.AdminMovieManagementFormatRepository;
import nvm.project.qlcinema.core.admin.moviemanagement.repository.AdminMovieManagementGenreRepository;
import nvm.project.qlcinema.core.admin.moviemanagement.repository.AdminMovieManagementRepository;
import nvm.project.qlcinema.core.admin.moviemanagement.service.AdminMovieManagementService;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.entity.Country;
import nvm.project.qlcinema.entity.Director;
import nvm.project.qlcinema.entity.Format;
import nvm.project.qlcinema.entity.Genre;
import nvm.project.qlcinema.entity.Movie;
import nvm.project.qlcinema.infrastructure.config.cloudinary.CloudinaryConfig;
import nvm.project.qlcinema.infrastructure.constant.Subtitle;
import nvm.project.qlcinema.infrastructure.exception.RestApiException;
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
    public ResponseObject postMovie(AdminMovieManagementPostRequest postRequest) throws IOException {
        List<String> errors = new ArrayList<>();

        //check Banner Empty
        if(postRequest.getBanner().isEmpty()){
            errors.add("Bạn chưa chọn banner cho bộ phim này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
        //check Duplicate
        Optional<Movie> isCodeExist = adminMovieManagementRepository.findByCode(postRequest.getCode());
        if(isCodeExist.isPresent()){
            errors.add("Đã tồn tại mã phim này trong hệ thống!");
            throw new RestApiException(errors, HttpStatus.CONFLICT);
        }
        //check isExist Entity
        Optional<Country> isCountryExist = adminMovieManagementCountryRepository.findById(postRequest.getCountryId());
        if(isCountryExist.isEmpty()){
            errors.add("Không tìm thấy đất nước bạn chọn!");
        }
        Optional<Director> isDirectorExist = adminMovieManagementDirectorRepository.findById(postRequest.getDirectorId());
        if(isDirectorExist.isEmpty()){
            errors.add("Không tìm thấy đạo diễn bạn chọn!");
        }
        Optional<Format> isFormatExist = adminMovieManagementFormatRepository.findById(postRequest.getFormatId());
        if(isFormatExist.isEmpty()){
            errors.add("Không tìm thấy phân giải bạn chọn!");
        }
        Optional<Genre> isGenreExist = adminMovieManagementGenreRepository.findById(postRequest.getGenreId());
        if(isGenreExist.isEmpty()){
            errors.add("Không tìm thấy thể loại bạn chọn!");
        }
        //throw error
        if(!errors.isEmpty()){
            throw new RestApiException(errors,HttpStatus.NOT_FOUND);
        }

        //postMovie
        Movie postMovie = new Movie();
        postMovie.setCode(postRequest.getCode());
        postMovie.setName(postRequest.getName());
        postMovie.setDuration(postRequest.getDuration());
        postMovie.setAgeRestriction(postRequest.getAgeRestriction());
        postMovie.setReleaseDate(postRequest.getReleaseDate());
        postMovie.setVideoPath(postRequest.getVideoPath());
        postMovie.setActor(postRequest.getActor());
        postMovie.setDescription(postRequest.getCode());
        var result=cloudinaryConfig.upload(postRequest.getBanner());//upload image to cloudinary
        postMovie.setBannerId((String) result.get("public_id"));
        postMovie.setBannerUrl((String) result.get("url"));
        for (Subtitle subtitle : Subtitle.values()){
            if(postRequest.getSubTitle().equals(subtitle.name())){
                postMovie.setSubTitle(subtitle);
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
        if(isMovieExist.isEmpty()){
            errors.add("Không tìm thấy bộ phim này!");
            throw new RestApiException(errors,HttpStatus.NOT_FOUND);
        }else{
            if(!putRequest.getCode().equals(isMovieExist.get().getCode())){
                Optional<Movie> isCodeExist = adminMovieManagementRepository.findByCode(putRequest.getCode());
                if(isCodeExist.isPresent()){
                    errors.add("Đã tồn tại mã phim này trong hệ thống!");
                    throw new RestApiException(errors, HttpStatus.CONFLICT);
                }
            }
        }
        //check isExist Entity
        Optional<Country> isCountryExist = adminMovieManagementCountryRepository.findById(putRequest.getCountryId());
        if(isCountryExist.isEmpty()){
            errors.add("Không tìm thấy đất nước bạn chọn!");
        }
        Optional<Director> isDirectorExist = adminMovieManagementDirectorRepository.findById(putRequest.getDirectorId());
        if(isDirectorExist.isEmpty()){
            errors.add("Không tìm thấy đạo diễn bạn chọn!");
        }
        Optional<Format> isFormatExist = adminMovieManagementFormatRepository.findById(putRequest.getFormatId());
        if(isFormatExist.isEmpty()){
            errors.add("Không tìm thấy phân giải bạn chọn!");
        }
        Optional<Genre> isGenreExist = adminMovieManagementGenreRepository.findById(putRequest.getGenreId());
        if(isGenreExist.isEmpty()){
            errors.add("Không tìm thấy thể loại bạn chọn!");
        }
        //throw error
        if(!errors.isEmpty()){
            throw new RestApiException(errors,HttpStatus.NOT_FOUND);
        }

        //postMovie
        Movie putMovie = isMovieExist.get();
        putMovie.setCode(putRequest.getCode());
        putMovie.setName(putRequest.getName());
        putMovie.setDuration(putRequest.getDuration());
        putMovie.setAgeRestriction(putRequest.getAgeRestriction());
        putMovie.setReleaseDate(putRequest.getReleaseDate());
        putMovie.setVideoPath(putRequest.getVideoPath());
        putMovie.setActor(putRequest.getActor());
        putMovie.setDescription(putRequest.getCode());
        if(!putRequest.getBanner().isEmpty()){
            var result=cloudinaryConfig.upload(putRequest.getBanner());//upload image to cloudinary
            putMovie.setBannerId((String) result.get("public_id"));
            putMovie.setBannerUrl((String) result.get("url"));
        }
        for (Subtitle subtitle : Subtitle.values()){
            if(putRequest.getSubTitle().equals(subtitle.name())){
                putMovie.setSubTitle(subtitle);
            }
        }
        putMovie.setDirectorId(isDirectorExist.get());
        putMovie.setGenreId(isGenreExist.get());
        putMovie.setCountryId(isCountryExist.get());
        putMovie.setFormatId(isFormatExist.get());
        adminMovieManagementRepository.save(putMovie);

        return new ResponseObject("Cập nhật thành công bộ phim!");
    }
}

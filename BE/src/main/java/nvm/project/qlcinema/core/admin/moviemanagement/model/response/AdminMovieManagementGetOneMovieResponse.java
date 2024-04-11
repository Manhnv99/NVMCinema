package nvm.project.qlcinema.core.admin.moviemanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDate;

public interface AdminMovieManagementGetOneMovieResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.code}")
     String getCode();

    @Value("#{target.name}")
     String getName();

    @Value("#{target.duration}")
     int getDuration();

    @Value("#{target.ageRestriction}")
     int getAgeRestriction();

    @Value("#{target.releaseDate}")
     LocalDate getReleaseDate();

    @Value("#{target.videoPath}")
     String getVideoPath();

    @Value("#{target.bannerUrl}")
     String getBannerUrl();

    @Value("#{target.actor}")
     String getActor();

    @Value("#{target.description}")
     String getDescription();

    @Value("#{target.subTitle}")
     String getSubTitle();

    @Value("#{target.directorId}")
     String getDirectorId();

    @Value("#{target.genreId}")
     String getGenreId();

    @Value("#{target.countryId}")
     String getCountryId();

    @Value("#{target.formatId}")
     String getFormatId();
    
}

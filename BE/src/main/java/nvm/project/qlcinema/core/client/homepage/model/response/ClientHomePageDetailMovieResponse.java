package nvm.project.qlcinema.core.client.homepage.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDate;

public interface ClientHomePageDetailMovieResponse {

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

    @Value("#{target.director}")
    String getDirector();

    @Value("#{target.genre}")
    String getGenre();

    @Value("#{target.country}")
    String getCountry();

    @Value("#{target.format}")
    String getFormat();

    @Value("#{target.deleted}")
    String getDeleted();

}

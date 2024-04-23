package nvm.project.qlcinema.core.client.homepage.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface ClientHomePageListMovieCurrentShowingResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.movie}")
    String getMovie();

    @Value("#{target.imageUrl}")
    String getImageUrl();

    @Value("#{target.ageRestriction}")
    int getAgeRestriction();

    @Value("#{target.subTitle}")
    String getSubTitle();

    @Value("#{target.format}")
    String getFormat();

    @Value("#{target.genre}")
    String getGenre();

}

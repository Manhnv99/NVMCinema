package nvm.project.qlcinema.core.client.homepage.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.client.homepage.repository.ClientHomePageMovieRepository;
import nvm.project.qlcinema.core.client.homepage.service.ClientHomePageService;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.infrastructure.config.redis.service.BaseRedisService;
import nvm.project.qlcinema.infrastructure.constant.RedisPrefix;
import nvm.project.qlcinema.infrastructure.exception.RestApiException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ClientHomePageServiceImpl implements ClientHomePageService {

    private final ClientHomePageMovieRepository clientHomePageMovieRepository;

    private final BaseRedisService baseRedisService;

    private final ObjectMapper redisObjectMapper;

    @Override
    public ResponseObject getListMovieCurrentShowing(String areaId) {
        try {
            return new ResponseObject(clientHomePageMovieRepository.getListMovieCurrentShowing(areaId));
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách bộ phim đang chiếu!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getListMoviePreTicket(String areaId) {
        try {
            return new ResponseObject(clientHomePageMovieRepository.getListMoviePreTicket(areaId));
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách bộ phim bán trước!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getListMovieUpComing() {
        try {
            return new ResponseObject(clientHomePageMovieRepository.getListMovieUpComing());
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách bộ phim sắp chiếu!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getListArea() {
        try {
            return new ResponseObject(clientHomePageMovieRepository.getListArea());
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách khu vực!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getDetailMovie(String movieId) {
        try {
            String key = RedisPrefix.Redis_Prefix_Detail_Movie + movieId;
            //check Data from Redis
            Object foundKeyRedis = baseRedisService.get(key);
            if (foundKeyRedis != null) {
                return new ResponseObject(foundKeyRedis);
            }
            Object detailMovie = clientHomePageMovieRepository.getDetailMovie(movieId);
            String value = redisObjectMapper.writeValueAsString(detailMovie);
            baseRedisService.set(key, value);
            return new ResponseObject(detailMovie);
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được bộ phim này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

}

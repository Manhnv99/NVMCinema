package nvm.project.qlcinema.entity.listener;

import jakarta.persistence.PostUpdate;
import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.entity.Movie;
import nvm.project.qlcinema.infrastructure.config.redis.service.BaseRedisService;
import nvm.project.qlcinema.infrastructure.constant.RedisPrefix;

@RequiredArgsConstructor
public class MovieListenerRedis {

    private final BaseRedisService baseRedisService;

    @PostUpdate
    public void postUpdate(Object entity) {
        Movie movie = (Movie) entity;
        String key = RedisPrefix.Redis_Prefix_Detail_Movie + movie.getId();
        if (baseRedisService.get(key) != null) {
            baseRedisService.delete(RedisPrefix.Redis_Prefix_Detail_Movie + movie.getId());
        }
    }

}

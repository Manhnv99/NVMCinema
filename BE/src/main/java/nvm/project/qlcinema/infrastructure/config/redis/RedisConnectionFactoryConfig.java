//package nvm.project.qlcinema.infrastructure.config.redis;
//
//import org.springframework.dao.DataAccessException;
//import org.springframework.data.redis.connection.RedisClusterConnection;
//import org.springframework.data.redis.connection.RedisConnection;
//import org.springframework.data.redis.connection.RedisConnectionFactory;
//import org.springframework.data.redis.connection.RedisSentinelConnection;
//
//public class RedisConnectionFactoryConfig implements RedisConnectionFactory {
//
//    @Override
//    public boolean getConvertPipelineAndTxResults() {
//        return false;
//    }
//
//    @Override
//    public RedisConnection getConnection() {
//        return null;
//    }
//
//    @Override
//    public RedisClusterConnection getClusterConnection() {
//        return null;
//    }
//
//    @Override
//    public RedisSentinelConnection getSentinelConnection() {
//        return null;
//    }
//
//    @Override
//    public DataAccessException translateExceptionIfPossible(RuntimeException ex) {
//        return null;
//    }
//}

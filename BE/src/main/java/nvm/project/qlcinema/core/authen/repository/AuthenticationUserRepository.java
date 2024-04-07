package nvm.project.qlcinema.core.authen.repository;

import nvm.project.qlcinema.entity.User;
import nvm.project.qlcinema.repository.UserRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthenticationUserRepository extends UserRepository {

    Optional<User> findUserByEmail(String email);

    Optional<User> findUserByCccd(String cccd);

    Optional<User> findUserByPhoneNumber(String phone);

}

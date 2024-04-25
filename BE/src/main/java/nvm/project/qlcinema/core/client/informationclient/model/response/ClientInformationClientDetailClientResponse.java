package nvm.project.qlcinema.core.client.informationclient.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDate;

public interface ClientInformationClientDetailClientResponse {

    @Value("#{target.name}")
    String getName();

    @Value("#{target.email}")
    String getEmail();

    @Value("#{target.phone}")
    String getPhone();

    @Value("#{target.birthDay}")
    LocalDate getBirthDay();

    @Value("#{target.province}")
    String getProvince();

    @Value("#{target.address}")
    String getAddress();

    @Value("#{target.password}")
    String getPassword();

    @Value("#{target.imageUrl}")
    String getImageUrl();

}

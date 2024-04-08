package nvm.project.qlcinema.core.admin.staffmanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDate;

public interface AdminManagementGetOneStaffResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.code}")
    String getCode();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.cccd}")
    String getCCCD();

    @Value("#{target.gender}")
    boolean getGender();

    @Value("#{target.birthday}")
    LocalDate getBirthDay();

    @Value("#{target.email}")
    String getEmail();

    @Value("#{target.phone}")
    String getPhone();

    @Value("#{target.address}")
    String getAddress();

    @Value("#{target.status}")
    boolean getStatus();

    @Value("#{target.role}")
    String getRole();

    @Value("#{target.areaId}")
    String getAreaId();

    @Value("#{target.imageUrl}")
    String getImageUrl();

}

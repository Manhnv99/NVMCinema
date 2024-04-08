package nvm.project.qlcinema.core.admin.directormanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface AdminDirectorManagementListDirectorResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.code}")
    String getCode();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.gender}")
    boolean getGender();

    @Value("#{target.age}")
    int getAge();

    @Value("#{target.description}")
    String getDescription();

    @Value("#{target.deleted}")
    boolean getDeleted();

}

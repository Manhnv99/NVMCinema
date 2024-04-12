package nvm.project.qlcinema.core.admin.branchmanagement.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface AdminBranchManagementListBranchResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.code}")
    String getCode();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.email}")
    String getEmail();

    @Value("#{target.address}")
    String getAddress();

    @Value("#{target.hostline}")
    String getHostLine();

    @Value("#{target.image}")
    String getImage();

    @Value("#{target.area}")
    String getArea();

    @Value("#{target.deleted}")
    boolean getDeleted();

}

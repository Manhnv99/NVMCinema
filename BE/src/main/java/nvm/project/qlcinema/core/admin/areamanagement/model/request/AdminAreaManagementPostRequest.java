package nvm.project.qlcinema.core.admin.areamanagement.model.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminAreaManagementPostRequest {

    @NotBlank(message = "Tên đất nước không được để trống!")
    private String name;

}

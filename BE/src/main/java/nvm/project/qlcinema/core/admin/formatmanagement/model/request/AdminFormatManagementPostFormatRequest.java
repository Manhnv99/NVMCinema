package nvm.project.qlcinema.core.admin.formatmanagement.model.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminFormatManagementPostFormatRequest {

    @NotBlank(message = "Tên format không được để trống!")
    private String name;

}

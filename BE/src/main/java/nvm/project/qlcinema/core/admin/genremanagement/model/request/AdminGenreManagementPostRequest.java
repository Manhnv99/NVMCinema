package nvm.project.qlcinema.core.admin.genremanagement.model.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminGenreManagementPostRequest {

    @NotBlank(message = "Tên format không được để trống!")
    private String name;

}

package nvm.project.qlcinema.core.admin.directormanagement.model.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminDirectorManagementPostDirectorRequest {

    @NotBlank(message = "Tên đạo diễn không được để trống!")
    private String name;

    @NotNull(message = "Giới tính chưa được chọn!")
    private boolean gender;

    @NotNull(message = "Tuổi đạo diễn không được để trống!")
    @Min(value = 1,message = "Tuổi phải lớn hơn 1!")
    private int age;

    @NotBlank(message = "Mô tả về đạo diễn không được để trống!")
    private String description;

}

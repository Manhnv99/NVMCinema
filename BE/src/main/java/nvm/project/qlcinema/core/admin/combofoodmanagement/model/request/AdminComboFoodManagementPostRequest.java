package nvm.project.qlcinema.core.admin.combofoodmanagement.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

@Getter
@Setter
public class AdminComboFoodManagementPostRequest {

    @NotBlank(message = "Tên Combo đồ ăn không được để trống!")
    private String name;

    @NotNull(message = "Giá Combo đồ ăn không được để trống!")
    private BigDecimal price;

    private MultipartFile image;

}

package nvm.project.qlcinema.core.admin.countrymanagement.model.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminCountryManagementPostCountryRequest {

    @NotBlank(message = "Tên đất nước không được để trống!")
    private String name;

}

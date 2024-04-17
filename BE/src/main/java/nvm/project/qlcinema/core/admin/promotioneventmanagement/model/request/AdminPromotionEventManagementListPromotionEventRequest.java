package nvm.project.qlcinema.core.admin.promotioneventmanagement.model.request;

import lombok.Getter;
import lombok.Setter;
import nvm.project.qlcinema.core.common.PageableRequest;

import java.time.LocalDate;

@Getter
@Setter
public class AdminPromotionEventManagementListPromotionEventRequest extends PageableRequest {

    private String name;

    private LocalDate timeStart;

    private LocalDate timeEnd;

}

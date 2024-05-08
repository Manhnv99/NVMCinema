package nvm.project.qlcinema.core.staff.ordermanagement.model.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import nvm.project.qlcinema.core.common.PageableRequest;

import java.sql.Time;
import java.time.LocalDate;

@Getter
@Setter
@ToString
public class StaffOrderManagementListOrderRequest extends PageableRequest {

    private String orderCode;

    private LocalDate dateStart;

    private LocalDate dateEnd;

    private String timeStart;

    private String branchId; //chi nhánh của nhân viên

    private String orderStatus;

}

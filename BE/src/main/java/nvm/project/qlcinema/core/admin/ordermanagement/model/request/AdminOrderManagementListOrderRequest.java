package nvm.project.qlcinema.core.admin.ordermanagement.model.request;

import lombok.Getter;
import lombok.Setter;
import nvm.project.qlcinema.core.common.PageableRequest;

import java.sql.Time;
import java.time.LocalDate;

@Getter
@Setter
public class AdminOrderManagementListOrderRequest extends PageableRequest {

    private String orderCode;

    private String clientName;

    private LocalDate date;

    private Time timeStart;

    private String areaId;

    private String orderStatus;

}

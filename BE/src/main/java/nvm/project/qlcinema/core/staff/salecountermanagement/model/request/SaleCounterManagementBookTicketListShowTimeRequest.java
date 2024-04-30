package nvm.project.qlcinema.core.staff.salecountermanagement.model.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@Setter
@ToString
public class SaleCounterManagementBookTicketListShowTimeRequest {

    private String movieId;

    private String branchId;

    private LocalDate date;

}

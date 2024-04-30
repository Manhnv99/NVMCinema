package nvm.project.qlcinema.core.staff.ordermanagement.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StaffOrderManagementApprovedOrCancelRequest {

    private String userId;

    private String orderId;

    private String approvedOrCancelOrRestore; // true is Approved , false is Cancel

}

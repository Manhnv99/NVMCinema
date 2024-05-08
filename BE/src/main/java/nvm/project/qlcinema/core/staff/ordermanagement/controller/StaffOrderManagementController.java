package nvm.project.qlcinema.core.staff.ordermanagement.controller;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.core.staff.ordermanagement.model.request.StaffOrderManagementApprovedOrCancelRequest;
import nvm.project.qlcinema.core.staff.ordermanagement.model.request.StaffOrderManagementListOrderRequest;
import nvm.project.qlcinema.core.staff.ordermanagement.model.response.StaffOrderManagementListOrderResponse;
import nvm.project.qlcinema.core.staff.ordermanagement.service.StaffOrderManagementService;
import nvm.project.qlcinema.infrastructure.constant.UrlPath;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping(UrlPath.URL_API_STAFF_ORDER_MANAGEMENT)
public class StaffOrderManagementController {

    private final StaffOrderManagementService staffOrderManagementService;

    @GetMapping("/get-search-order")
    public PageableObject<StaffOrderManagementListOrderResponse> getListSearchOrder(final StaffOrderManagementListOrderRequest request) {
        System.out.println(request.toString());
        return staffOrderManagementService.getListSearchOrder(request);
    }

    @PutMapping("/approved-or-cancel")
    public ResponseObject handleApprovedOrCancel(final StaffOrderManagementApprovedOrCancelRequest approvedOrCancelRequest) {
        return staffOrderManagementService.handleApprovedOrCancel(approvedOrCancelRequest);
    }

    @GetMapping("/get-detail-order/{orderId}")
    public ResponseObject getDetailOrder(@PathVariable String orderId) {
        return staffOrderManagementService.getDetailOrder(orderId);
    }

}

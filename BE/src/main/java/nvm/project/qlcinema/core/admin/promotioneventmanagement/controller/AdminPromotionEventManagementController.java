package nvm.project.qlcinema.core.admin.promotioneventmanagement.controller;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.admin.promotioneventmanagement.model.request.AdminPromotionEventManagementListPromotionEventRequest;
import nvm.project.qlcinema.core.admin.promotioneventmanagement.model.request.AdminPromotionEventManagementPostRequest;
import nvm.project.qlcinema.core.admin.promotioneventmanagement.model.request.AdminPromotionEventManagementPutRequest;
import nvm.project.qlcinema.core.admin.promotioneventmanagement.model.response.AdminPromotionEventManagementListPromotionEventResponse;
import nvm.project.qlcinema.core.admin.promotioneventmanagement.service.AdminPromotionEventManagementService;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.infrastructure.constant.UrlPath;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping(UrlPath.URL_API_ADMIN_PROMOTION_EVENT_MANAGEMENT)
public class AdminPromotionEventManagementController {

    private final AdminPromotionEventManagementService adminPromotionEventManagementService;

    @GetMapping("/get-list-search-promotion_event")
    public PageableObject<AdminPromotionEventManagementListPromotionEventResponse> getListSearchPromotionEvent(final AdminPromotionEventManagementListPromotionEventRequest request){
        return adminPromotionEventManagementService.getListSearchPromotionEvent(request);
    }

    @GetMapping("/get-detail-promotion_event/{id}")
    public ResponseObject getDetailPromotionEvent(@PathVariable String id){
        return adminPromotionEventManagementService.getDetailPromotionEvent(id);
    }

    @PostMapping("/post-promotion_event")
    public ResponseObject postPromotionEvent(@ModelAttribute AdminPromotionEventManagementPostRequest postRequest) throws IOException {
        return adminPromotionEventManagementService.postPromotionEvent(postRequest);
    }

    @PutMapping("/put-promotion_event")
    public ResponseObject putPromotionEvent(@ModelAttribute AdminPromotionEventManagementPutRequest putRequest) throws IOException {
        return adminPromotionEventManagementService.putPromotionEvent(putRequest);
    }

}

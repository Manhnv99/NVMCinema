package nvm.project.qlcinema.core.adminarea.showtimemanagement.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.adminarea.showtimemanagement.model.request.AdminAreaShowTimeManagementListShowTimeRequest;
import nvm.project.qlcinema.core.adminarea.showtimemanagement.model.request.AdminAreaShowTimeManagementPostRequest;
import nvm.project.qlcinema.core.adminarea.showtimemanagement.model.request.AdminAreaShowTimeManagementPutRequest;
import nvm.project.qlcinema.core.adminarea.showtimemanagement.model.response.AdminAreaShowTimeManagementListShowTimeResponse;
import nvm.project.qlcinema.core.adminarea.showtimemanagement.service.AdminAreaShowTimeManagementService;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.infrastructure.constant.UrlPath;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@CrossOrigin("*")
@RequestMapping(UrlPath.URL_API_ADMIN_AREA_SHOWTIME_MANAGEMENT)
@RestController
@RequiredArgsConstructor
public class AdminAreaShowTimeManagementController {

    private final AdminAreaShowTimeManagementService adminAreaShowTimeManagementService;

    @GetMapping("/get-search-showtime")
    public PageableObject<AdminAreaShowTimeManagementListShowTimeResponse> getListSearchShowTime(final AdminAreaShowTimeManagementListShowTimeRequest request){
        return adminAreaShowTimeManagementService.getListSearchShowTime(request);
    }

    @GetMapping("/get-one-showtime/{id}")
    public ResponseObject getOneShowTime(@PathVariable String id){
        return adminAreaShowTimeManagementService.getOneShowTime(id);
    }

    @GetMapping("/get-detail-showtime/{id}")
    public ResponseObject getDetailShowTime(@PathVariable String id){
        return adminAreaShowTimeManagementService.getDetailShowTime(id);
    }

    @GetMapping("/get-list-ticket-chair/{showTimeId}")
    public ResponseObject getListTicketChair(@PathVariable String showTimeId){
        return adminAreaShowTimeManagementService.getListTicketChair(showTimeId);
    }

    @GetMapping("/get-list-branch/{areaId}")
    public ResponseObject getListBranch(@PathVariable String areaId){
        return adminAreaShowTimeManagementService.getListBranch(areaId);
    }

    @GetMapping("/get-list-room/{branchId}")
    public ResponseObject getListRoom(@PathVariable String branchId){
        return adminAreaShowTimeManagementService.getListRoom(branchId);
    }

    @GetMapping("/get-list-movie")
    public ResponseObject getListMovie(){
        return adminAreaShowTimeManagementService.getListMovie();
    }

    @PostMapping("/post-showtime")
    public ResponseObject postShowTime(@RequestBody @Valid AdminAreaShowTimeManagementPostRequest postRequest) throws ParseException {
        return adminAreaShowTimeManagementService.postShowTime(postRequest);
    }

    @PutMapping("/put-showtime")
    public ResponseObject putShowTime(@RequestBody @Valid AdminAreaShowTimeManagementPutRequest putRequest) throws ParseException {
        return adminAreaShowTimeManagementService.putShowTime(putRequest);
    }

}

package nvm.project.qlcinema.core.admin.showtimemanagement.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.admin.showtimemanagement.model.request.AdminShowTimeManagementListShowTimeRequest;
import nvm.project.qlcinema.core.admin.showtimemanagement.model.request.AdminShowTimeManagementPostRequest;
import nvm.project.qlcinema.core.admin.showtimemanagement.model.request.AdminShowTimeManagementPutRequest;
import nvm.project.qlcinema.core.admin.showtimemanagement.model.response.AdminShowTimeManagementListShowTimeResponse;
import nvm.project.qlcinema.core.admin.showtimemanagement.service.AdminShowTimeManagementService;
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
@RequestMapping(UrlPath.URL_API_ADMIN_SHOWTIME_MANAGEMENT)
@RestController
@RequiredArgsConstructor
public class AdminShowTimeManagementController {

    private final AdminShowTimeManagementService adminShowTimeManagementService;

    @GetMapping("/get-search-showtime")
    public PageableObject<AdminShowTimeManagementListShowTimeResponse> getListSearchShowTime(final AdminShowTimeManagementListShowTimeRequest request) {
        return adminShowTimeManagementService.getListSearchShowTime(request);
    }

    @GetMapping("/get-one-showtime/{id}")
    public ResponseObject getOneShowTime(@PathVariable String id) {
        return adminShowTimeManagementService.getOneShowTime(id);
    }

    @GetMapping("/get-detail-showtime/{id}")
    public ResponseObject getDetailShowTime(@PathVariable String id) {
        return adminShowTimeManagementService.getDetailShowTime(id);
    }

    @GetMapping("/get-list-ticket-chair/{showTimeId}")
    public ResponseObject getListTicketChair(@PathVariable String showTimeId) {
        return adminShowTimeManagementService.getListTicketChair(showTimeId);
    }

    @GetMapping("/get-list-area")
    public ResponseObject getListTicketChair() {
        return adminShowTimeManagementService.getListArea();
    }

    @GetMapping("/get-list-branch/{areaId}")
    public ResponseObject getListBranch(@PathVariable String areaId) {
        return adminShowTimeManagementService.getListBranch(areaId);
    }

    @GetMapping("/get-list-room/{branchId}")
    public ResponseObject getListRoom(@PathVariable String branchId) {
        return adminShowTimeManagementService.getListRoom(branchId);
    }

    @GetMapping("/get-list-movie-current-showing")
    public ResponseObject getListMovieCurrentShowing() {
        return adminShowTimeManagementService.getListMovieCurrentShowing();
    }

    @GetMapping("/get-list-movie-pre-ticker")
    public ResponseObject getListMoviePreTicket() {
        return adminShowTimeManagementService.getListMoviePreTicket();
    }

    @PostMapping("/post-showtime")
    public ResponseObject postShowTime(@RequestBody @Valid AdminShowTimeManagementPostRequest postRequest) throws ParseException {
        return adminShowTimeManagementService.postShowTime(postRequest);
    }

    @PutMapping("/put-showtime")
    public ResponseObject putShowTime(@RequestBody @Valid AdminShowTimeManagementPutRequest putRequest) throws ParseException {
        return adminShowTimeManagementService.putShowTime(putRequest);
    }

}

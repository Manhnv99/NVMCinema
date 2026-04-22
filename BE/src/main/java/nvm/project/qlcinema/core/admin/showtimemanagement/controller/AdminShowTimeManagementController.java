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

    @GetMapping
    public PageableObject<AdminShowTimeManagementListShowTimeResponse> getListSearchShowTime(final AdminShowTimeManagementListShowTimeRequest request) {
        return adminShowTimeManagementService.getListSearchShowTime(request);
    }

    @GetMapping("/one/{id}")
    public ResponseObject getOneShowTime(@PathVariable String id) {
        return adminShowTimeManagementService.getOneShowTime(id);
    }

    @GetMapping("/{id}")
    public ResponseObject getDetailShowTime(@PathVariable String id) {
        return adminShowTimeManagementService.getDetailShowTime(id);
    }

    @GetMapping("/ticket-chair/{showTimeId}")
    public ResponseObject getListTicketChair(@PathVariable String showTimeId) {
        return adminShowTimeManagementService.getListTicketChair(showTimeId);
    }

    @GetMapping("/areas")
    public ResponseObject getListTicketChair() {
        return adminShowTimeManagementService.getListArea();
    }

    @GetMapping("/branches/{areaId}")
    public ResponseObject getListBranch(@PathVariable String areaId) {
        return adminShowTimeManagementService.getListBranch(areaId);
    }

    @GetMapping("/rooms/{branchId}")
    public ResponseObject getListRoom(@PathVariable String branchId) {
        return adminShowTimeManagementService.getListRoom(branchId);
    }

    @GetMapping("/movie-current-showing")
    public ResponseObject getListMovieCurrentShowing() {
        return adminShowTimeManagementService.getListMovieCurrentShowing();
    }

    @GetMapping("/movie-pre-ticker")
    public ResponseObject getListMoviePreTicket() {
        return adminShowTimeManagementService.getListMoviePreTicket();
    }

    @PostMapping
    public ResponseObject postShowTime(@RequestBody @Valid AdminShowTimeManagementPostRequest postRequest) throws ParseException {
        return adminShowTimeManagementService.postShowTime(postRequest);
    }

    @PutMapping
    public ResponseObject putShowTime(@RequestBody @Valid AdminShowTimeManagementPutRequest putRequest) throws ParseException {
        return adminShowTimeManagementService.putShowTime(putRequest);
    }

}

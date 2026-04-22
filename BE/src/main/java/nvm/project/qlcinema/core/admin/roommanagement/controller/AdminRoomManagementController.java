package nvm.project.qlcinema.core.admin.roommanagement.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.admin.roommanagement.model.request.AdminRoomManagementListRoomRequest;
import nvm.project.qlcinema.core.admin.roommanagement.model.request.AdminRoomManagementPostRoomRequest;
import nvm.project.qlcinema.core.admin.roommanagement.model.request.AdminRoomManagementPutRoomRequest;
import nvm.project.qlcinema.core.admin.roommanagement.model.response.AdminRoomManagementListRoomResponse;
import nvm.project.qlcinema.core.admin.roommanagement.service.AdminRoomManagementService;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.infrastructure.constant.UrlPath;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping(UrlPath.URL_API_ADMIN_ROOM_MANAGEMENT)
public class AdminRoomManagementController {

    private final AdminRoomManagementService adminRoomManagementService;

    @GetMapping
    public PageableObject<AdminRoomManagementListRoomResponse> getListSearchRoom(final AdminRoomManagementListRoomRequest roomRequest) {
        return adminRoomManagementService.getListSearchRoom(roomRequest);
    }

    @GetMapping("/one/{id}")
    public ResponseObject getOneRoom(@PathVariable String id) {
        return adminRoomManagementService.getOneRoom(id);
    }

    @GetMapping("/{id}")
    public ResponseObject getDetailRoom(@PathVariable String id) {
        return adminRoomManagementService.getDetailRoom(id);
    }

    @GetMapping("/get-list-chair/{roomId}")
    public ResponseObject getListChair(@PathVariable String roomId) {
        return adminRoomManagementService.getListChair(roomId);
    }

    @GetMapping("/areas")
    public ResponseObject getListArea() {
        return adminRoomManagementService.getListArea();
    }

    @GetMapping("/branchs/{areaId}")
    public ResponseObject getListBranch(@PathVariable String areaId) {
        return adminRoomManagementService.getListBranch(areaId);
    }

    @PostMapping
    public ResponseObject postRoom(@RequestBody @Valid AdminRoomManagementPostRoomRequest postRequest) {
        return adminRoomManagementService.postRoom(postRequest);
    }

    @PutMapping
    public ResponseObject putRoom(@RequestBody @Valid AdminRoomManagementPutRoomRequest putRequest) {
        return adminRoomManagementService.putRoom(putRequest);
    }

    @DeleteMapping("/{id}")
    public ResponseObject putRoom(@PathVariable String id) {
        return adminRoomManagementService.deleteRoom(id);
    }

}

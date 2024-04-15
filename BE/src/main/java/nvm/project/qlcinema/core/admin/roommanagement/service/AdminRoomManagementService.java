package nvm.project.qlcinema.core.admin.roommanagement.service;

import nvm.project.qlcinema.core.admin.roommanagement.model.request.AdminRoomManagementListRoomRequest;
import nvm.project.qlcinema.core.admin.roommanagement.model.request.AdminRoomManagementPostRoomRequest;
import nvm.project.qlcinema.core.admin.roommanagement.model.request.AdminRoomManagementPutRoomRequest;
import nvm.project.qlcinema.core.admin.roommanagement.model.response.AdminRoomManagementListRoomResponse;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;

public interface AdminRoomManagementService {

    PageableObject<AdminRoomManagementListRoomResponse> getListSearchRoom(AdminRoomManagementListRoomRequest roomRequest);

    ResponseObject getOneRoom(String id);

    ResponseObject getDetailRoom(String id);

    ResponseObject getListChair(String roomId);

    ResponseObject getListArea();

    ResponseObject getListBranch(String areaId);

    ResponseObject postRoom(AdminRoomManagementPostRoomRequest postRequest);

    ResponseObject putRoom(AdminRoomManagementPutRoomRequest putRequest);

    ResponseObject deleteRoom(String id);

}

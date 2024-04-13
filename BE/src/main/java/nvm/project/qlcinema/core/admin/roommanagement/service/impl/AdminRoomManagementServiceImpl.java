package nvm.project.qlcinema.core.admin.roommanagement.service.impl;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.admin.roommanagement.model.request.AdminRoomManagementListRoomRequest;
import nvm.project.qlcinema.core.admin.roommanagement.model.response.AdminRoomManagementListRoomResponse;
import nvm.project.qlcinema.core.admin.roommanagement.repository.AdminRoomManagementChairRepository;
import nvm.project.qlcinema.core.admin.roommanagement.repository.AdminRoomManagementRepository;
import nvm.project.qlcinema.core.admin.roommanagement.service.AdminRoomManagementService;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.infrastructure.exception.RestApiException;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminRoomManagementServiceImpl implements AdminRoomManagementService {

    private final AdminRoomManagementRepository adminRoomManagementRepository;

    private final AdminRoomManagementChairRepository adminRoomManagementChairRepository;

    @Override
    public PageableObject<AdminRoomManagementListRoomResponse> getListSearchRoom(AdminRoomManagementListRoomRequest roomRequest) {
        try{
            PageRequest pageRequest = PageRequest.of(roomRequest.getPage() - 1, roomRequest.getSize());
            return new PageableObject<>(adminRoomManagementRepository.getListSearchRoom(pageRequest,roomRequest));
        }catch(Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách phòng!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getOneRoom(String id) {
        try{
            return new ResponseObject(adminRoomManagementRepository.getOneRoom(id));
        }catch(Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được phòng này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getListArea() {
        try{
            return new ResponseObject(adminRoomManagementRepository.getListArea());
        }catch(Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách khu vực!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getListBranch(String areaId) {
        try{
            return new ResponseObject(adminRoomManagementRepository.getListBranch(areaId));
        }catch(Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách chi nhánh!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

}

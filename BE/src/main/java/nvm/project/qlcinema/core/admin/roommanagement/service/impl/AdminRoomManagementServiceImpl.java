package nvm.project.qlcinema.core.admin.roommanagement.service.impl;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.admin.roommanagement.model.request.AdminRoomManagementListRoomRequest;
import nvm.project.qlcinema.core.admin.roommanagement.model.request.AdminRoomManagementPostRoomRequest;
import nvm.project.qlcinema.core.admin.roommanagement.model.request.AdminRoomManagementPutRoomRequest;
import nvm.project.qlcinema.core.admin.roommanagement.model.response.AdminRoomManagementListRoomResponse;
import nvm.project.qlcinema.core.admin.roommanagement.repository.AdminRoomManagementBranchRepository;
import nvm.project.qlcinema.core.admin.roommanagement.repository.AdminRoomManagementChairRepository;
import nvm.project.qlcinema.core.admin.roommanagement.repository.AdminRoomManagementRepository;
import nvm.project.qlcinema.core.admin.roommanagement.service.AdminRoomManagementService;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.entity.Branch;
import nvm.project.qlcinema.entity.Room;
import nvm.project.qlcinema.infrastructure.exception.RestApiException;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminRoomManagementServiceImpl implements AdminRoomManagementService {

    private final AdminRoomManagementRepository adminRoomManagementRepository;

    private final AdminRoomManagementChairRepository adminRoomManagementChairRepository;

    private final AdminRoomManagementBranchRepository adminRoomManagementBranchRepository;

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

    @Override
    public ResponseObject postRoom(AdminRoomManagementPostRoomRequest postRequest) {
        List<String> errors = new ArrayList<>();

        //check isBranchExist
        Optional<Branch> isBranchExist = adminRoomManagementBranchRepository.findById(postRequest.getBranchId());
        if(isBranchExist.isEmpty()){
            errors.add("Không tìm thấy chi nhánh bạn chọn!");
            throw new RestApiException(errors,HttpStatus.CONFLICT);
        }
        //check isRoomExist
        Optional<Room> isRoomExist = adminRoomManagementRepository.findRoomByName(postRequest.getName());
        if(isRoomExist.isPresent()){
            errors.add("Đã tồn tại phòng chiếu có tên này!");
            throw new RestApiException(errors,HttpStatus.CONFLICT);
        }

        //post Room
        Room postRoom = new Room();
        Optional<Room> roomNewest = adminRoomManagementRepository.getNewest();
        if(roomNewest.isEmpty()){
            postRoom.setCode("ROOM1");
        }else{
            String code = roomNewest.get().getCode();
            postRoom.setCode(code.substring(0,4)+((Integer.parseInt(code.substring(4)))+1));
        }
        postRoom.setName(postRequest.getName());
        postRoom.setBranchId(isBranchExist.get());
        Room roomSaved = adminRoomManagementRepository.save(postRoom);

        //post Chair
        for (String columns: postRequest.getColumns()){
            for(int i = 0 ; i < postRequest.getRow() ; i++){

            }
        }

        return null;
    }

    @Override
    public ResponseObject putRoom(AdminRoomManagementPutRoomRequest putRequest) {
        return null;
    }

}

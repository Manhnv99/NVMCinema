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
import nvm.project.qlcinema.entity.Chair;
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
            errors.add("Không lấy được danh sách phòng chiếu!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getOneRoom(String id) {
        try{
            return new ResponseObject(adminRoomManagementRepository.getOneRoom(id));
        }catch(Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được phòng chiếu này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getDetailRoom(String id) {
        try{
            return new ResponseObject(adminRoomManagementRepository.getDetailRoom(id));
        }catch(Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được phòng chiếu này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getListChair(String roomId) {
        try{
            return new ResponseObject(adminRoomManagementRepository.getListChair(roomId));
        }catch(Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách ghế!");
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
        generateChair(postRequest.getColumns(),postRequest.getRow(),roomSaved,"post");

        return new ResponseObject("Tạo phòng chiếu thành công!");
    }

    @Override
    public ResponseObject putRoom(AdminRoomManagementPutRoomRequest putRequest) {
        List<String> errors = new ArrayList<>();
        //put Room
        Optional<Room> optionalRoom = adminRoomManagementRepository.findById(putRequest.getId());
        if(optionalRoom.isEmpty()){
            errors.add("Không tìm thấy phòng chiếu này!");
            throw new RestApiException(errors,HttpStatus.NOT_FOUND);
        }
        Optional<Branch> isBranchExist = adminRoomManagementBranchRepository.findById(putRequest.getBranchId());
        if(isBranchExist.isEmpty()){
            errors.add("Không tìm thấy chi nhánh này!");
            throw new RestApiException(errors,HttpStatus.NOT_FOUND);
        }

        Room putRoom = optionalRoom.get();
        putRoom.setName(putRequest.getName());
        putRoom.setBranchId(isBranchExist.get());
        Room roomSaved = adminRoomManagementRepository.save(putRoom);
        //put Chair
        if(putRequest.getRow() != 0 && !putRequest.getColumns().isEmpty()){
            //update ghế
            adminRoomManagementChairRepository.deleteByRoomId(putRoom.getId());
            generateChair(putRequest.getColumns(), putRequest.getRow(), roomSaved,"put");
        }

        return new ResponseObject("Cập nhật phòng chiếu thành công!");
    }

    @Override
    public ResponseObject deleteRoom(String id) {
        try{
            Optional<Room> isRoomExist = adminRoomManagementRepository.findById(id);
            if(isRoomExist.isEmpty()){
                throw new Exception();
            }
            isRoomExist.get().setDeleted(!isRoomExist.get().isDeleted());
            adminRoomManagementRepository.save(isRoomExist.get());
            return new ResponseObject("Cập nhật trạng thái phòng chiếu thành công!");
        }catch(Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được phòng chiếu này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    private void generateChair(List<String> listC ,int row,Room roomSaved,String type){
        try {
            for (String columns: listC){
                for(int i = 1 ; i <= row ; i++){
                    Optional<Chair> isChairExist = adminRoomManagementChairRepository.getNewest();
                    if(isChairExist.isEmpty()){
                        adminRoomManagementChairRepository.save(new Chair(
                                "CHAIR1", columns+i,row, true, roomSaved, true,new Date()
                        ));
                    }else{
                        adminRoomManagementChairRepository.save(new Chair(
                                isChairExist.get().getCode().substring(0,5)+((Integer.parseInt(isChairExist.get().getCode().substring(5)))+1),
                                columns+i,row, true, roomSaved, true,new Date()
                        ));
                    }
                }
            }
        }catch (Exception e){
            if(type.equalsIgnoreCase("post")){
                adminRoomManagementRepository.delete(roomSaved);
            }
            List<String> errors = new ArrayList<>();
            errors.add("Đã xảy ra 1 vài lỗi");
            throw new RestApiException(errors,HttpStatus.BAD_REQUEST);
        }
    }

}

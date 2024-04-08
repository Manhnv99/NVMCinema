package nvm.project.qlcinema.core.admin.areamanagement.service.impl;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.admin.areamanagement.model.request.AdminAreaManagementListAreaRequest;
import nvm.project.qlcinema.core.admin.areamanagement.model.request.AdminAreaManagementPostAreaRequest;
import nvm.project.qlcinema.core.admin.areamanagement.model.request.AdminAreaManagementPutAreaRequest;
import nvm.project.qlcinema.core.admin.areamanagement.model.response.AdminAreaManagementListAreaResponse;
import nvm.project.qlcinema.core.admin.areamanagement.repository.AdminAreaManagementRepository;
import nvm.project.qlcinema.core.admin.areamanagement.service.AdminAreaManagementService;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.entity.Area;
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
public class AdminAreaManagementServiceImpl implements AdminAreaManagementService {

    private final AdminAreaManagementRepository adminAreaManagementRepository;

    @Override
    public PageableObject<AdminAreaManagementListAreaResponse> getListArea(AdminAreaManagementListAreaRequest request) {
        try {
            PageRequest pageRequest = PageRequest.of(request.getPage() - 1, request.getPage());
            return new PageableObject<>(adminAreaManagementRepository.getListArea(pageRequest,request));
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách khu vực!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject postArea(AdminAreaManagementPostAreaRequest postRequest) {
        List<String> errors = new ArrayList<>();

        //check isExist
        Optional<Area> isAreaNameExist = adminAreaManagementRepository.findByName(postRequest.getName());
        if(isAreaNameExist.isPresent()){
            errors.add("Đã tồn tại tên khu vực này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }

        //post
        Area postArea = new Area();
        Optional<Area> AreaNewest = adminAreaManagementRepository.getNewest();
        if(AreaNewest.isPresent()){
            String code = AreaNewest.get().getCode();
            postArea.setCode(code.substring(0,2)+((Integer.parseInt(code.substring(2)))+1));
        }else{
            postArea.setCode("DN1");
        }
        postArea.setName(postRequest.getName());
        postArea.setDeleted(true);
        postArea.setCreatedAt(new Date());
        adminAreaManagementRepository.save(postArea);

        return new ResponseObject("Tạo mới thành công khu vực!");
    }

    @Override
    public ResponseObject putArea(AdminAreaManagementPutAreaRequest putRequest) {
        List<String> errors = new ArrayList<>();

        //check isExist
        Optional<Area> AreaOptional = adminAreaManagementRepository.findById(putRequest.getAreaId());
        if(AreaOptional.isEmpty()){
            errors.add("Không tìm thấy khu vực này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }else{
            if(!AreaOptional.get().getName().equals(putRequest.getName())){
                Optional<Area> isAreaNameExist = adminAreaManagementRepository.findByName(putRequest.getName());
                if(isAreaNameExist.isPresent()){
                    errors.add("Đã tồn tại tên khu vực này!");
                    throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
                }
            }
        }

        //post
        Area postArea = AreaOptional.get();
        postArea.setName(putRequest.getName());
        adminAreaManagementRepository.save(postArea);

        return new ResponseObject("Cập nhật thành công khu vực!");
    }

    @Override
    public ResponseObject deleteArea(String AreaId) {
        try {
            Optional<Area> optionalArea = adminAreaManagementRepository.findById(AreaId);
            if(optionalArea.isEmpty()){
                throw new Exception();
            }else{
                Area deleteArea = optionalArea.get();
                deleteArea.setDeleted(!deleteArea.isDeleted());
                adminAreaManagementRepository.save(deleteArea);
                return new ResponseObject("Thay đổi trạng thái khu vực thành công!");
            }
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được khu vực này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getDetailArea(String AreaId) {
        try {
            return new ResponseObject(adminAreaManagementRepository.getDetailArea(AreaId));
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được khu vực này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

}

package nvm.project.qlcinema.core.admin.formatmanagement.service.impl;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.admin.formatmanagement.model.request.AdminFormatManagementListFormatRequest;
import nvm.project.qlcinema.core.admin.formatmanagement.model.request.AdminFormatManagementPostFormatRequest;
import nvm.project.qlcinema.core.admin.formatmanagement.model.request.AdminFormatManagementPutFormatRequest;
import nvm.project.qlcinema.core.admin.formatmanagement.model.response.AdminFormatManagementListFormatResponse;
import nvm.project.qlcinema.core.admin.formatmanagement.repository.AdminFormatManagementRepository;
import nvm.project.qlcinema.core.admin.formatmanagement.service.AdminFormatManagementService;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.entity.Format;
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
public class AdminFormatManagementServiceImpl implements AdminFormatManagementService {

    private final AdminFormatManagementRepository adminFormatManagementRepository;

    @Override
    public PageableObject<AdminFormatManagementListFormatResponse> getListFormat(AdminFormatManagementListFormatRequest request) {
        try {
            PageRequest pageRequest = PageRequest.of(request.getPage(), request.getPage());
            return new PageableObject<>(adminFormatManagementRepository.getListFormat(pageRequest,request));
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách format!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject postFormat(AdminFormatManagementPostFormatRequest postRequest) {
        List<String> errors = new ArrayList<>();

        //check isExist
        Optional<Format> isFormatNameExist = adminFormatManagementRepository.findByName(postRequest.getName());
        if(isFormatNameExist.isPresent()){
            errors.add("Đã tồn tại tên format này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }

        //post
        Format postFormat = new Format();
        Optional<Format> formatNewest = adminFormatManagementRepository.getNewest();
        if(formatNewest.isPresent()){
            String code = formatNewest.get().getCode();
            postFormat.setCode(code.substring(0,2)+((Integer.parseInt(code.substring(2)))+1));
        }else{
            postFormat.setCode("FM1");
        }
        postFormat.setName(postRequest.getName());
        postFormat.setDeleted(true);
        postFormat.setCreatedAt(new Date());
        adminFormatManagementRepository.save(postFormat);

        return new ResponseObject("Tạo mới thành công format!");
    }

    @Override
    public ResponseObject putFormat(AdminFormatManagementPutFormatRequest putRequest) {
        List<String> errors = new ArrayList<>();

        //check isExist
        Optional<Format> formatOptional = adminFormatManagementRepository.findById(putRequest.getFormatId());
        if(formatOptional.isEmpty()){
            errors.add("Không tìm thấy format này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }else{
            if(!formatOptional.get().getName().equals(putRequest.getName())){
                Optional<Format> isFormatNameExist = adminFormatManagementRepository.findByName(putRequest.getName());
                if(isFormatNameExist.isPresent()){
                    errors.add("Đã tồn tại tên format này!");
                    throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
                }
            }
        }

        //post
        Format postFormat = formatOptional.get();
        postFormat.setName(putRequest.getName());
        adminFormatManagementRepository.save(postFormat);

        return new ResponseObject("Cập nhật thành công format!");
    }

    @Override
    public ResponseObject deleteFormat(String formatId) {
        try {
            Optional<Format> optionalFormat = adminFormatManagementRepository.findById(formatId);
            if(optionalFormat.isEmpty()){
                throw new Exception();
            }else{
                Format deleteFormat = optionalFormat.get();
                deleteFormat.setDeleted(!deleteFormat.isDeleted());
                adminFormatManagementRepository.save(deleteFormat);
                return new ResponseObject("Thay đổi trạng thái format thành công!");
            }
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được format này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getDetailFormat(String formatId) {
        try {
            return new ResponseObject(adminFormatManagementRepository.getDetailFormat(formatId));
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được format này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }
}

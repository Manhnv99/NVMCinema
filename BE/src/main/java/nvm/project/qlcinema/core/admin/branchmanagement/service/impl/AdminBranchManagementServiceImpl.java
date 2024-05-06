package nvm.project.qlcinema.core.admin.branchmanagement.service.impl;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.admin.branchmanagement.model.request.AdminBranchManagementListBranchRequest;
import nvm.project.qlcinema.core.admin.branchmanagement.model.request.AdminBranchManagementPostRequest;
import nvm.project.qlcinema.core.admin.branchmanagement.model.request.AdminBranchManagementPutRequest;
import nvm.project.qlcinema.core.admin.branchmanagement.model.response.AdminBranchManagementListBranchResponse;
import nvm.project.qlcinema.core.admin.branchmanagement.repository.AdminBranchManagementAreaRepository;
import nvm.project.qlcinema.core.admin.branchmanagement.repository.AdminBranchManagementRepository;
import nvm.project.qlcinema.core.admin.branchmanagement.service.AdminBranchManagementService;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.entity.Area;
import nvm.project.qlcinema.entity.Branch;
import nvm.project.qlcinema.infrastructure.config.cloudinary.CloudinaryConfig;
import nvm.project.qlcinema.infrastructure.exception.RestApiException;
import nvm.project.qlcinema.utils.ValidUtils;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminBranchManagementServiceImpl implements AdminBranchManagementService {

    private final AdminBranchManagementRepository adminBranchManagementRepository;

    private final AdminBranchManagementAreaRepository adminBranchManagementAreaRepository;

    private final CloudinaryConfig cloudinaryConfig;

    private final ValidUtils validUtils;

    @Override
    public PageableObject<AdminBranchManagementListBranchResponse> getListBranch(AdminBranchManagementListBranchRequest request) {
        try {
            PageRequest pageRequest = PageRequest.of(request.getPage() - 1, request.getSize());
            return new PageableObject<>(adminBranchManagementRepository.getListBranch(pageRequest, request));
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách khu vực!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getListArea() {
        try {
            return new ResponseObject(adminBranchManagementAreaRepository.getListArea());
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách khu vực!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject postBranch(AdminBranchManagementPostRequest postRequest) throws IOException {
        List<String> errors = new ArrayList<>();

        if (postRequest.getImage().isEmpty()) {
            errors.add("Bạn chưa chọn ảnh cho chi nhánh!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }

        Optional<Area> isAreaExist = adminBranchManagementAreaRepository.findById(postRequest.getAreaId());
        if (isAreaExist.isEmpty()) {
            errors.add("Không tìm thấy tên khu vực bạn chọn!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }

        if (validUtils.isPhoneValid(postRequest.getHostLine())) {
            errors.add("Số hostline không đúng định dạng!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }

        //check isExist
        Optional<Branch> isBranchExist = adminBranchManagementRepository.isBranchExist(
                postRequest.getName(),
                postRequest.getEmail(),
                postRequest.getAddress(),
                postRequest.getHostLine(),
                postRequest.getAreaId()
        );
        if (isBranchExist.isPresent()) {
            errors.add("Đã tồn tại chi nhánh này trong hệ thống!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }

        //post
        Branch postBranch = new Branch();
        Optional<Branch> branchNewest = adminBranchManagementRepository.getNewest();
        if (branchNewest.isPresent()) {
            String code = branchNewest.get().getCode();
            postBranch.setCode(code.substring(0, 3) + ((Integer.parseInt(code.substring(3))) + 1));
        } else {
            postBranch.setCode("BRA1");
        }
        postBranch.setName(postRequest.getName());
        postBranch.setEmail(postRequest.getEmail());
        postBranch.setAddress(postRequest.getAddress());
        postBranch.setHostLine(postRequest.getHostLine());
        postBranch.setAreaId(isAreaExist.get());
        var result = cloudinaryConfig.upload(postRequest.getImage());//upload image to cloudinary
        postBranch.setImageId((String) result.get("public_id"));
        postBranch.setImageUrl((String) result.get("url"));
        postBranch.setDeleted(true);
        postBranch.setCreatedAt(new Date());
        adminBranchManagementRepository.save(postBranch);

        return new ResponseObject("Tạo mới thành công khu vực!");
    }

    @Override
    public ResponseObject putBranch(AdminBranchManagementPutRequest putRequest) throws IOException {
        List<String> errors = new ArrayList<>();

        Optional<Area> isAreaExist = adminBranchManagementAreaRepository.findById(putRequest.getAreaId());
        if (isAreaExist.isEmpty()) {
            errors.add("Không tìm thấy tên chi nhánh bạn chọn!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }

        if (validUtils.isPhoneValid(putRequest.getHostLine())) {
            errors.add("Số hostline không đúng định dạng!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }

        //check isExist
        Optional<Branch> branchOptional = adminBranchManagementRepository.findById(putRequest.getId());
        if (branchOptional.isEmpty()) {
            errors.add("Không tìm thấy chi nhánh này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        } else {
            if (!branchOptional.get().getName().equals(putRequest.getName()) ||
                    !branchOptional.get().getEmail().equals(putRequest.getEmail()) ||
                    !branchOptional.get().getHostLine().equals(putRequest.getHostLine()) ||
                    !branchOptional.get().getAddress().equals(putRequest.getAddress())
            ) {
                Optional<Branch> isBranchExist = adminBranchManagementRepository.isBranchExist(
                        putRequest.getName(),
                        putRequest.getEmail(),
                        putRequest.getAddress(),
                        putRequest.getHostLine(),
                        putRequest.getAreaId()
                );
                if (isBranchExist.isPresent()) {
                    errors.add("Đã tồn tại chi nhánh này trong hệ thống!");
                    throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
                }
            }
        }

        //post
        Branch putBranch = branchOptional.get();
        putBranch.setName(putRequest.getName());
        putBranch.setEmail(putRequest.getEmail());
        putBranch.setAddress(putRequest.getAddress());
        putBranch.setHostLine(putRequest.getHostLine());
        if (!putRequest.getImage().isEmpty()) {
            cloudinaryConfig.delete(putBranch.getImageId());
            var result = cloudinaryConfig.upload(putRequest.getImage());//upload image to cloudinary
            putBranch.setImageId((String) result.get("public_id"));
            putBranch.setImageUrl((String) result.get("url"));
        }
        putBranch.setAreaId(isAreaExist.get());
        adminBranchManagementRepository.save(putBranch);

        return new ResponseObject("Cập nhật thành công khu vực!");
    }

    @Override
    public ResponseObject deleteBranch(String id) {
        try {
            Optional<Branch> optionalBranch = adminBranchManagementRepository.findById(id);
            if (optionalBranch.isEmpty()) {
                throw new Exception();
            } else {
                Branch deleteBranch = optionalBranch.get();
                deleteBranch.setDeleted(!deleteBranch.isDeleted());
                adminBranchManagementRepository.save(deleteBranch);
                return new ResponseObject("Thay đổi trạng thái chi nhánh thành công!");
            }
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được chi nhánh này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getDetailBranch(String id) {
        try {
            return new ResponseObject(adminBranchManagementRepository.getDetailBranch(id));
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được chi nhánh này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getOneBranch(String id) {
        try {
            return new ResponseObject(adminBranchManagementRepository.getOneBranch(id));
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được chi nhánh này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

}

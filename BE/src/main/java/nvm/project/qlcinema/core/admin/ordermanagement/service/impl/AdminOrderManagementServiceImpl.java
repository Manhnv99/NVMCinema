package nvm.project.qlcinema.core.admin.ordermanagement.service.impl;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.admin.ordermanagement.model.request.AdminOrderManagementListOrderRequest;
import nvm.project.qlcinema.core.admin.ordermanagement.model.response.AdminOrderManagementListOrderResponse;
import nvm.project.qlcinema.core.admin.ordermanagement.repository.AdminOrderManagementRepository;
import nvm.project.qlcinema.core.admin.ordermanagement.service.AdminOrderManagementService;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.infrastructure.exception.RestApiException;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminOrderManagementServiceImpl implements AdminOrderManagementService {

    private final AdminOrderManagementRepository adminOrderManagementRepository;

    @Override
    public PageableObject<AdminOrderManagementListOrderResponse> getListSearchOrder(AdminOrderManagementListOrderRequest request) {
        try {
            PageRequest pageRequest = PageRequest.of(request.getPage() - 1 , request.getSize());
            return new PageableObject<>(adminOrderManagementRepository.getListSearchOrder(pageRequest,request));
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách hóa đơn");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

}

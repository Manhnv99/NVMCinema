package nvm.project.qlcinema.core.staff.ordermanagement.service.impl;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.core.staff.ordermanagement.model.request.StaffOrderManagementApprovedOrCancelRequest;
import nvm.project.qlcinema.core.staff.ordermanagement.model.request.StaffOrderManagementListOrderRequest;
import nvm.project.qlcinema.core.staff.ordermanagement.model.response.StaffOrderManagementListOrderResponse;
import nvm.project.qlcinema.core.staff.ordermanagement.repository.StaffOrderManagementRepository;
import nvm.project.qlcinema.core.staff.ordermanagement.repository.StaffOrderManagementUserRepository;
import nvm.project.qlcinema.core.staff.ordermanagement.service.StaffOrderManagementService;
import nvm.project.qlcinema.entity.Order;
import nvm.project.qlcinema.infrastructure.constant.OrderStatus;
import nvm.project.qlcinema.infrastructure.exception.RestApiException;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StaffOrderManagementServiceImpl implements StaffOrderManagementService {

    //constant
    private static final  String CANCEL_ORDER = "CANCEL_ORDER";
    private static final  String APPROVED_ORDER = "APPROVED_ORDER";
    private static final  String RESTORE_ORDER = "RESTORE_ORDER";

    //repository
    private final StaffOrderManagementRepository staffOrderManagementRepository;

    private final StaffOrderManagementUserRepository staffOrderManagementUserRepository;

    @Override
    public PageableObject<StaffOrderManagementListOrderResponse> getListSearchOrder(StaffOrderManagementListOrderRequest request) {
        try {
            PageRequest pageRequest = PageRequest.of(request.getPage() - 1 , request.getSize());
            return new PageableObject<>(staffOrderManagementRepository.getListSearchOrder(pageRequest,request));
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách hóa đơn");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject handleApprovedOrCancel(StaffOrderManagementApprovedOrCancelRequest approvedOrCancelRequest) {
        List<String> errors = new ArrayList<>();

        //Check isOrderEmpty
        Optional<Order> orderOptional = staffOrderManagementRepository.findById(approvedOrCancelRequest.getOrderId());
        if(orderOptional.isEmpty()){
            errors.add("Không tìm thấy hóa đơn này!");
        }
        //throwError
        if(!errors.isEmpty()){
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }

        String messageResponse = "";
        //approvedOrCancel
        if(approvedOrCancelRequest.getApprovedOrCancelOrRestore().equals(APPROVED_ORDER)){
            messageResponse = "Hóa đơn đã được duyệt thành công";
            orderOptional.get().setOrderStatus(OrderStatus.DA_DUYET);
        }else if(approvedOrCancelRequest.getApprovedOrCancelOrRestore().equals(CANCEL_ORDER)){
            messageResponse = "Hóa đơn đã được hủy bỏ thành công!";
            orderOptional.get().setOrderStatus(OrderStatus.DA_HUY);
        }else {
            //RESTORE make it NOT Approved
            LocalDate screeningDate = staffOrderManagementRepository.getDateScreeningByOrderId(approvedOrCancelRequest.getOrderId());
            Time timeStart = staffOrderManagementRepository.getTimeStartByOrderId(approvedOrCancelRequest.getOrderId());

            if(screeningDate.isBefore(LocalDate.now())){
                errors.add("Giờ chiếu của hóa đơn này đã quá thời gian không thể khôi phục!");
                throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
            }else if(screeningDate.isEqual(LocalDate.now()) && timeStart.before(new Time(System.currentTimeMillis()))){
                errors.add("Giờ chiếu của hóa đơn này đã quá thời gian không thể khôi phục!");
                throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
            }else {
                messageResponse = "Hóa đơn đã được khôi phục thành công!";
                orderOptional.get().setOrderStatus(OrderStatus.CHUA_DUYET);
            }
        }

        orderOptional.get().setUserId(staffOrderManagementUserRepository.getReferenceById(approvedOrCancelRequest.getUserId()));
        staffOrderManagementRepository.save(orderOptional.get());

        return new ResponseObject(messageResponse);
    }

}

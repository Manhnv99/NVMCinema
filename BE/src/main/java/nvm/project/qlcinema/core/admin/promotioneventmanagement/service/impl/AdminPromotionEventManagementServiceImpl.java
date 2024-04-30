package nvm.project.qlcinema.core.admin.promotioneventmanagement.service.impl;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.admin.promotioneventmanagement.model.request.AdminPromotionEventManagementListPromotionEventRequest;
import nvm.project.qlcinema.core.admin.promotioneventmanagement.model.request.AdminPromotionEventManagementPostRequest;
import nvm.project.qlcinema.core.admin.promotioneventmanagement.model.request.AdminPromotionEventManagementPutRequest;
import nvm.project.qlcinema.core.admin.promotioneventmanagement.model.response.AdminPromotionEventManagementListPromotionEventResponse;
import nvm.project.qlcinema.core.admin.promotioneventmanagement.repository.AdminPromotionEventManagementRepository;
import nvm.project.qlcinema.core.admin.promotioneventmanagement.service.AdminPromotionEventManagementService;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.entity.PromotionEvent;
import nvm.project.qlcinema.infrastructure.config.cloudinary.CloudinaryConfig;
import nvm.project.qlcinema.infrastructure.constant.PromotionEventStatus;
import nvm.project.qlcinema.infrastructure.exception.RestApiException;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminPromotionEventManagementServiceImpl implements AdminPromotionEventManagementService {

    private final AdminPromotionEventManagementRepository adminPromotionEventManagementRepository;

    private final CloudinaryConfig cloudinaryConfig;

    @Override
    public PageableObject<AdminPromotionEventManagementListPromotionEventResponse> getListSearchPromotionEvent(
            AdminPromotionEventManagementListPromotionEventRequest request
    ) {
        List<String> errors = new ArrayList<>();
        if (request.getTimeStart() == null && request.getTimeEnd() != null){
            errors.add("Bạn chưa chọn ngày bắt đầu!!");
            throw new RestApiException(errors,HttpStatus.BAD_REQUEST);
        }else if(request.getTimeStart() != null && request.getTimeEnd() == null){
            errors.add("Bạn chưa chọn ngày kết thúc!!");
            throw new RestApiException(errors,HttpStatus.BAD_REQUEST);
        }else if(request.getTimeEnd() != null && request.getTimeStart() != null){
            if(request.getTimeEnd().isBefore(request.getTimeStart())){
                errors.add("Ngày kết thúc phải lớn hơn ngày bắt đầu!");
                throw new RestApiException(errors,HttpStatus.BAD_REQUEST);
            }
        }
        try {
            PageRequest pageRequest = PageRequest.of(request.getPage() - 1, request.getSize());
            return new PageableObject<>(adminPromotionEventManagementRepository.getListSearchPromotionEvent(pageRequest,request));
        }catch (Exception e){
            errors.add("Không lấy được danh sách sự kiện khuyến mãi!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getDetailPromotionEvent(String id) {
        try {
            return new ResponseObject(adminPromotionEventManagementRepository.getDetailPromotionEvent(id));
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được sự kiện khuyến mãi này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject postPromotionEvent(AdminPromotionEventManagementPostRequest postRequest) throws IOException {
        List<String> errors = new ArrayList<>();
        //check Image
        if(postRequest.getImage().isEmpty()){
            errors.add("Bạn chưa chọn ảnh cho khuyến mãi sự kiện!");
            throw new RestApiException(errors,HttpStatus.BAD_REQUEST);
        }
        //check Date Valid
        this.handleCheckDateValid(postRequest.getTimeStart(),postRequest.getTimeEnd());
        //check Dup
        this.handleCheckDuplicate(postRequest.getName());

        //post
        PromotionEvent postPromotionEvent = new PromotionEvent();
        Optional<PromotionEvent> peNewest = adminPromotionEventManagementRepository.getNewest();
        if(peNewest.isPresent()){
            String code = peNewest.get().getCode();
            postPromotionEvent.setCode(code.substring(0,2)+((Integer.parseInt(code.substring(2)))+1));
        }else{
            postPromotionEvent.setCode("PE1");
        }
        postPromotionEvent.setName(postRequest.getName());
        postPromotionEvent.setDateStart(postRequest.getTimeStart());
        postPromotionEvent.setDateEnd(postRequest.getTimeEnd());
        postPromotionEvent.setPromotionCode(postRequest.getPromotionCode());
        postPromotionEvent.setPromotionPrice(postRequest.getPromotionPrice());
        postPromotionEvent.setDescription(postRequest.getDescription());
        var result=cloudinaryConfig.upload(postRequest.getImage());//upload image to cloudinary
        postPromotionEvent.setImageId((String) result.get("public_id"));
        postPromotionEvent.setImageUrl((String) result.get("url"));
        postPromotionEvent.setCreatedAt(new Date());
        postPromotionEvent.setPromotionEventStatus(
                handleGenPromotionEvent(postRequest.getTimeStart(),
                        postRequest.getTimeEnd())
        );
        try {
            adminPromotionEventManagementRepository.save(postPromotionEvent);
            return new ResponseObject("Tạo mới khuyến mãi sự kiện thành công!");
        }catch (Exception e){
            errors.add("Đã có 1 vài sự cố sảy ra!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject putPromotionEvent(AdminPromotionEventManagementPutRequest putRequest) throws IOException {
        List<String> errors = new ArrayList<>();
        //check Date Valid
        this.handleCheckDateValid(putRequest.getTimeStart(),putRequest.getTimeEnd());
        //check Dup
        Optional<PromotionEvent> isPromotionEventExist = adminPromotionEventManagementRepository.findById(putRequest.getId());
        if (isPromotionEventExist.isEmpty()){
            errors.add("Không tìm thấy khuyến mãi sự kiện này!");
            throw new RestApiException(errors,HttpStatus.NOT_FOUND);
        }else{
            if(!putRequest.getName().equals(isPromotionEventExist.get().getName())){
                this.handleCheckDuplicate(putRequest.getName());
            }
        }
        //post
        PromotionEvent putPromotionEvent = isPromotionEventExist.get();
        Optional<PromotionEvent> peNewest = adminPromotionEventManagementRepository.getNewest();
        if(peNewest.isPresent()){
            String code = peNewest.get().getCode();
            putPromotionEvent.setCode(code.substring(0,2)+((Integer.parseInt(code.substring(2)))+1));
        }else{
            putPromotionEvent.setCode("PE1");
        }
        putPromotionEvent.setName(putRequest.getName());
        putPromotionEvent.setDateStart(putRequest.getTimeStart());
        putPromotionEvent.setDateEnd(putRequest.getTimeEnd());
        putPromotionEvent.setPromotionCode(putRequest.getPromotionCode());
        putPromotionEvent.setPromotionPrice(putRequest.getPromotionPrice());
        putPromotionEvent.setDescription(putRequest.getDescription());
        if(!putRequest.getImage().isEmpty()){
            cloudinaryConfig.delete(putPromotionEvent.getImageId());
            var result=cloudinaryConfig.upload(putRequest.getImage());//upload image to cloudinary
            putPromotionEvent.setImageId((String) result.get("public_id"));
            putPromotionEvent.setImageUrl((String) result.get("url"));
        }
        putPromotionEvent.setPromotionEventStatus(
                handleGenPromotionEvent(putRequest.getTimeStart(),
                        putRequest.getTimeEnd())
        );
        try {
            adminPromotionEventManagementRepository.save(putPromotionEvent);
            return new ResponseObject("Tạo mới khuyến mãi sự kiện thành công!");
        }catch (Exception e){
            errors.add("Đã có 1 vài sự cố sảy ra!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    private void handleCheckDateValid(LocalDate timeStart,LocalDate timeEnd){
        List<String> errors = new ArrayList<>();
        //check Date Valid
        if(timeStart.isBefore(LocalDate.now())){
            errors.add("Thời gian bắt đầu phải lớn hơn ngày hôm nay!");
            throw new RestApiException(errors,HttpStatus.BAD_REQUEST);
        }
        if(timeEnd.isBefore(timeStart)){
            errors.add("Thời gian kết thúc phải lớn hơn hoặc bằng thời gian bắt đầu!");
            throw new RestApiException(errors,HttpStatus.BAD_REQUEST);
        }
    }

    private void handleCheckDuplicate(String name){
        List<String> errors = new ArrayList<>();
        Optional<PromotionEvent> isPEDuplicate = adminPromotionEventManagementRepository.findPromotionEventByName(name);
        if(isPEDuplicate.isPresent()){
            errors.add("Đã tồn tại sự kiện với tên này");
            throw new RestApiException(errors,HttpStatus.CONFLICT);
        }
    }

    private PromotionEventStatus handleGenPromotionEvent(LocalDate timeStart,LocalDate timeEnd){
        LocalDate now = LocalDate.now();
        if (timeEnd.isBefore(now)) {
            return PromotionEventStatus.DA_HET_HAN;
        } else if (timeStart.isAfter(now) && timeEnd.isAfter(now)) {
            return PromotionEventStatus.SAP_DIEN_RA;
        } else {
            return PromotionEventStatus.DANG_DIEN_RA;
        }
    }

    private void handleUpdatePromotionEventStatus(){
        try {
            for (PromotionEvent peUpdate : adminPromotionEventManagementRepository.findAll()){
                adminPromotionEventManagementRepository.updatePEStatus(
                        this.handleGenPromotionEvent(peUpdate.getDateStart(),
                                peUpdate.getDateEnd()),peUpdate.getId()
                );
            }
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @Scheduled(cron = "0 0 0 * * *",zone = "Asia/Ho_Chi_Minh") //chạy vào mỗi 12h tối -> 0h
    private void updatePEStatusScheduled(){
        this.handleUpdatePromotionEventStatus();
    }

    @PostConstruct
    private void updatePEStatusPostConstruct(){
        this.handleUpdatePromotionEventStatus();
    }

}

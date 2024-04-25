package nvm.project.qlcinema.core.client.bookchair.service.impl;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.client.bookchair.repository.ClientBookChairComboFoodRepository;
import nvm.project.qlcinema.core.client.bookchair.repository.ClientBookChairPromotionEventRepository;
import nvm.project.qlcinema.core.client.bookchair.repository.ClientBookChairRepository;
import nvm.project.qlcinema.core.client.bookchair.service.ClientBookChairService;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.entity.PromotionEvent;
import nvm.project.qlcinema.infrastructure.constant.PromotionEventStatus;
import nvm.project.qlcinema.infrastructure.exception.RestApiException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClientBookChairServiceImpl implements ClientBookChairService {

    private final ClientBookChairRepository clientBookChairRepository;

    private final ClientBookChairComboFoodRepository clientBookChairComboFoodRepository;

    private final ClientBookChairPromotionEventRepository clientBookChairPromotionEventRepository;

    @Override
    public ResponseObject getDetailShowTime(String showTimeId) {
        try{
            return new ResponseObject(clientBookChairRepository.getDetailShowTime(showTimeId));
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được thông tin của xuất chiếu này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getListTicketChair(String showTimeId) {
        try{
            return new ResponseObject(clientBookChairRepository.getListTicketChair(showTimeId));
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách ghế!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getListComboFood() {
        try{
            return new ResponseObject(clientBookChairComboFoodRepository.getListComboFood());
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được ComboFood!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getPromotionEvent(String code) {
        List<String> errors = new ArrayList<>();

        if(code.trim().isEmpty() || code.length() > 255){
            errors.add("Mã giảm giá bạn nhập không hợp lệ!");
            throw new RestApiException(errors,HttpStatus.BAD_REQUEST);
        }
        //check isExist
        Optional<PromotionEvent> isPromotionEventExist = clientBookChairPromotionEventRepository.getPromotionEventByCode(code);
        if(isPromotionEventExist.isEmpty()){
            errors.add("Mã giảm giá bạn nhập không tồn tại!");
            throw new RestApiException(errors,HttpStatus.NOT_FOUND);
        }
        if(isPromotionEventExist.get().getPromotionEventStatus().equals(PromotionEventStatus.DA_HET_HAN)){
            errors.add("Mã giảm giá bạn nhập đã hết hạn sử dụng!");
        } else if (isPromotionEventExist.get().getPromotionEventStatus().equals(PromotionEventStatus.SAP_DIEN_RA)) {
            errors.add("Mã giảm giá bạn nhập chưa đến thời gian diễn ra!");
        }
        //throw Error
        if(!errors.isEmpty()){
            throw new RestApiException(errors,HttpStatus.BAD_REQUEST);
        }
        return new ResponseObject(isPromotionEventExist.get());
    }

}

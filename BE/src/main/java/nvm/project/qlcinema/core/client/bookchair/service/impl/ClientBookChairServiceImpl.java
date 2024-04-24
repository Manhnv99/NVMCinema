package nvm.project.qlcinema.core.client.bookchair.service.impl;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.client.bookchair.repository.ClientBookChairComboFoodRepository;
import nvm.project.qlcinema.core.client.bookchair.repository.ClientBookChairRepository;
import nvm.project.qlcinema.core.client.bookchair.service.ClientBookChairService;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.infrastructure.exception.RestApiException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ClientBookChairServiceImpl implements ClientBookChairService {

    private final ClientBookChairRepository clientBookChairRepository;

    private final ClientBookChairComboFoodRepository clientBookChairComboFoodRepository;

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

}

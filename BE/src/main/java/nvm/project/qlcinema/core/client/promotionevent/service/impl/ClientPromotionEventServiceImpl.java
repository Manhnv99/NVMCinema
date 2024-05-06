package nvm.project.qlcinema.core.client.promotionevent.service.impl;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.client.promotionevent.repository.ClientPromotionEventRepository;
import nvm.project.qlcinema.core.client.promotionevent.service.ClientPromotionEventService;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.infrastructure.exception.RestApiException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ClientPromotionEventServiceImpl implements ClientPromotionEventService {

    private final ClientPromotionEventRepository clientPromotionEventRepository;


    @Override
    public ResponseObject getListPromotionEvent() {
        try {
            return new ResponseObject(clientPromotionEventRepository.getListPromotionEvent());
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách sự kiện!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getDetailPromotionEvent(String peID) {
        try {
            return new ResponseObject(clientPromotionEventRepository.getDetailPromotionEvent(peID));
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được sự kiện này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }
}

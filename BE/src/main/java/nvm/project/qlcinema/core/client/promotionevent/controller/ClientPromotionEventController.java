package nvm.project.qlcinema.core.client.promotionevent.controller;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.client.promotionevent.service.ClientPromotionEventService;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.infrastructure.constant.UrlPath;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping(UrlPath.URL_API_CLIENT_PROMOTION_EVENT)
@RequiredArgsConstructor
public class ClientPromotionEventController {

    public final ClientPromotionEventService clientPromotionEventService;

    @GetMapping("/get-list-promotion_event")
    public ResponseObject getListPromotionEvent(){
        return clientPromotionEventService.getListPromotionEvent();
    }

    @GetMapping("/get-detail-promotion_event/{peId}")
    public ResponseObject getDetailPromotionEvent(@PathVariable String peId){
        return clientPromotionEventService.getDetailPromotionEvent(peId);
    }

}

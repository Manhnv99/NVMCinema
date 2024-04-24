package nvm.project.qlcinema.core.client.bookchair.controller;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.client.bookchair.service.ClientBookChairService;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.infrastructure.constant.UrlPath;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping(UrlPath.URL_API_CLIENT_BOOK_CHAIR)
public class ClientBookChairController {

    private final ClientBookChairService clientBookChairService;

    @GetMapping("/detail-showtime/{showTimeId}")
    public ResponseObject getDetailShowTime(@PathVariable String showTimeId){
        return clientBookChairService.getDetailShowTime(showTimeId);
    }

    @GetMapping("/list-ticket-chair/{showTimeId}")
    public ResponseObject getListTicketChair(@PathVariable String showTimeId){
        return clientBookChairService.getListTicketChair(showTimeId);
    }

    @GetMapping("/list-combo-food")
    public ResponseObject getListComboFood(){
        return clientBookChairService.getListComboFood();
    }

}

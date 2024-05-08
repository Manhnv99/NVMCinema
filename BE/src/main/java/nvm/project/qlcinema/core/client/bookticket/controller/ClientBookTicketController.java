package nvm.project.qlcinema.core.client.bookticket.controller;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.client.bookticket.model.request.ClientBookTicketListShowTimeRequest;
import nvm.project.qlcinema.core.client.bookticket.service.ClientBookTicketService;
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
@RequestMapping(UrlPath.URL_API_CLIENT_BOOK_TICKET)
public class ClientBookTicketController {

    private final ClientBookTicketService clientBookTicketService;

    @GetMapping("/list-show-time")
    public ResponseObject getListShowTime(final ClientBookTicketListShowTimeRequest request) {
        return clientBookTicketService.getListShowTime(request);
    }

    @GetMapping("/list-branch/{areaId}")
    public ResponseObject getListBranch(@PathVariable String areaId) {
        return clientBookTicketService.getListBranch(areaId);
    }

    @GetMapping("/get-closest-screening-date/{movieId}")
    public ResponseObject getClosestScreeningDate(@PathVariable String movieId){
        return clientBookTicketService.getClosestScreeningDate(movieId);
    }

}

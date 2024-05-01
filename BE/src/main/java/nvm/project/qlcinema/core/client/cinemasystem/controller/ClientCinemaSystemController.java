package nvm.project.qlcinema.core.client.cinemasystem.controller;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.client.cinemasystem.service.ClientCinemaSystemService;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.infrastructure.constant.UrlPath;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping(UrlPath.URL_API_CLIENT_CINEMA_SYSTEM)
@RequiredArgsConstructor
public class ClientCinemaSystemController {

    private final ClientCinemaSystemService clientCinemaSystemService;

    @GetMapping("/get-list-branch")
    public ResponseObject getListBranch(){
        return clientCinemaSystemService.getListBranch();
    }

    @GetMapping("/get-detail-branch/{branchId}")
    public ResponseObject getDetailBranch(@PathVariable String branchId){
        return clientCinemaSystemService.getDetailBranch(branchId);
    }

}

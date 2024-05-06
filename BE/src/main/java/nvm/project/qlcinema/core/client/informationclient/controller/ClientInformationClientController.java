package nvm.project.qlcinema.core.client.informationclient.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.client.informationclient.model.request.ClientInformationClientTransactionHistoryRequest;
import nvm.project.qlcinema.core.client.informationclient.model.request.ClientInformationClientPutClientRequest;
import nvm.project.qlcinema.core.client.informationclient.model.response.ClientInformationClientTransactionHistoryResponse;
import nvm.project.qlcinema.core.client.informationclient.service.ClientInformationClientService;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.infrastructure.constant.UrlPath;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@CrossOrigin("*")
@RestController
@RequestMapping(UrlPath.URL_API_CLIENT_INFORMATION_CLIENT)
@RequiredArgsConstructor
public class ClientInformationClientController {

    private final ClientInformationClientService clientInformationClientService;

    @GetMapping("/detail-client/{id}")
    public ResponseObject getInformationClientDetail(@PathVariable String id) {
        return clientInformationClientService.getInformationClientDetail(id);
    }

    @PutMapping("/put-client")
    public ResponseObject putInformationClient(@ModelAttribute @Valid ClientInformationClientPutClientRequest putClientRequest) throws IOException {
        return clientInformationClientService.putClientInformation(putClientRequest);
    }

    @GetMapping("/transaction-history")
    public PageableObject<ClientInformationClientTransactionHistoryResponse> getInformationClientTransactionHistory(final ClientInformationClientTransactionHistoryRequest request) {
        return clientInformationClientService.getInformationClientTransactionHistory(request);
    }

}

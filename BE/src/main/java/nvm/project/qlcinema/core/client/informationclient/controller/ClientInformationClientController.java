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
import nvm.project.qlcinema.infrastructure.exception.RestApiException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

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

    @GetMapping("/provinces")
    public ResponseObject getProvinces() {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String url = "https://provinces.open-api.vn/api/?depth=1";

            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

            return new ResponseObject(response.getBody());
        } catch (Exception e) {
            e.printStackTrace();
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách tỉnh thành phố!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
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

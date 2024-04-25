package nvm.project.qlcinema.core.client.informationclient.service;

import nvm.project.qlcinema.core.client.informationclient.model.request.ClientInformationClientTransactionHistoryRequest;
import nvm.project.qlcinema.core.client.informationclient.model.request.ClientInformationClientPutClientRequest;
import nvm.project.qlcinema.core.client.informationclient.model.response.ClientInformationClientTransactionHistoryResponse;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;

import java.io.IOException;

public interface ClientInformationClientService {

    ResponseObject getInformationClientDetail(String id);

    ResponseObject putClientInformation(ClientInformationClientPutClientRequest putClientRequest) throws IOException;

    PageableObject<ClientInformationClientTransactionHistoryResponse> getInformationClientTransactionHistory(ClientInformationClientTransactionHistoryRequest request);

}

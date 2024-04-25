package nvm.project.qlcinema.core.client.informationclient.model.request;

import lombok.Getter;
import lombok.Setter;
import nvm.project.qlcinema.core.common.PageableRequest;

import java.time.LocalDate;

@Getter
@Setter
public class ClientInformationClientTransactionHistoryRequest extends PageableRequest {

    private String clientId;

    private LocalDate dateFind;

}

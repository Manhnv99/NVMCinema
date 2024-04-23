package nvm.project.qlcinema.core.client.bookticket.service;

import nvm.project.qlcinema.core.client.bookticket.model.request.ClientBookTicketListShowTimeRequest;
import nvm.project.qlcinema.core.common.ResponseObject;

public interface ClientBookTicketService {

    ResponseObject getListShowTime(ClientBookTicketListShowTimeRequest request);

    ResponseObject getListBranch(String areaId);

}

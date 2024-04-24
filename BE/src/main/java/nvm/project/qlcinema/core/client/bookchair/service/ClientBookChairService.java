package nvm.project.qlcinema.core.client.bookchair.service;

import nvm.project.qlcinema.core.common.ResponseObject;

public interface ClientBookChairService {

    ResponseObject getDetailShowTime(String showTimeId);

    ResponseObject getListTicketChair(String showTimeId);

    ResponseObject getListComboFood();

}

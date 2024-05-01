package nvm.project.qlcinema.core.client.promotionevent.service;

import nvm.project.qlcinema.core.common.ResponseObject;

public interface ClientPromotionEventService {

    ResponseObject getListPromotionEvent();

    ResponseObject getDetailPromotionEvent(String peID);

}

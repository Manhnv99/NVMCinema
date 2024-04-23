package nvm.project.qlcinema.core.client.bookticket.service.impl;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.client.bookticket.model.request.ClientBookTicketListShowTimeRequest;
import nvm.project.qlcinema.core.client.bookticket.repository.ClientBookTicketBranchRepository;
import nvm.project.qlcinema.core.client.bookticket.repository.ClientBookTicketRepository;
import nvm.project.qlcinema.core.client.bookticket.service.ClientBookTicketService;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.infrastructure.exception.RestApiException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ClientBookTicketServiceImpl implements ClientBookTicketService {

    private final ClientBookTicketRepository clientBookTicketRepository;

    private final ClientBookTicketBranchRepository clientBookTicketBranchRepository;

    @Override
    public ResponseObject getListShowTime(ClientBookTicketListShowTimeRequest request) {
        try{
            return new ResponseObject(clientBookTicketRepository.getListShowTime(request));
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách lịch chiếu!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getListBranch(String areaId) {
        try{
            return new ResponseObject(clientBookTicketBranchRepository.getListBranch(areaId));
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách chi nhánh!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

}

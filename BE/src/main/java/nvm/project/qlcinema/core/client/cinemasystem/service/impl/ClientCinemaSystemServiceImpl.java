package nvm.project.qlcinema.core.client.cinemasystem.service.impl;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.client.cinemasystem.repository.ClientCinemaSystemRepository;
import nvm.project.qlcinema.core.client.cinemasystem.service.ClientCinemaSystemService;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.infrastructure.exception.RestApiException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ClientCinemaSystemServiceImpl implements ClientCinemaSystemService {

    private final ClientCinemaSystemRepository clientCinemaSystemRepository;

    @Override
    public ResponseObject getListBranch() {
        try {
            return new ResponseObject(clientCinemaSystemRepository.getListCinemaSystem());
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách chi nhánh!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getDetailBranch(String branchId) {
        try {
            return new ResponseObject(clientCinemaSystemRepository.getDetailCinema(branchId));
        }catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được chi nhánh này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

}

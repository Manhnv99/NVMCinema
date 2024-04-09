package nvm.project.qlcinema.core.admin.genremanagement.service.impl;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.admin.genremanagement.model.request.AdminGenreManagementListGenreRequest;
import nvm.project.qlcinema.core.admin.genremanagement.model.request.AdminGenreManagementPostRequest;
import nvm.project.qlcinema.core.admin.genremanagement.model.request.AdminGenreManagementPutRequest;
import nvm.project.qlcinema.core.admin.genremanagement.model.response.AdminGenreManagementListGenreResponse;
import nvm.project.qlcinema.core.admin.genremanagement.repository.AdminGenreManagementRepository;
import nvm.project.qlcinema.core.admin.genremanagement.service.AdminGenreManagementService;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.entity.Genre;
import nvm.project.qlcinema.infrastructure.exception.RestApiException;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminGenreManagementServiceImpl implements AdminGenreManagementService {

    private final AdminGenreManagementRepository adminGenreManagementRepository;

    @Override
    public PageableObject<AdminGenreManagementListGenreResponse> getListGenre(AdminGenreManagementListGenreRequest request) {
        try {
            PageRequest pageRequest = PageRequest.of(request.getPage() - 1, request.getSize());
            return new PageableObject<>(adminGenreManagementRepository.getListGenre(pageRequest,request));
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách thể loại!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject postGenre(AdminGenreManagementPostRequest postRequest) {
        List<String> errors = new ArrayList<>();

        //check isExist
        Optional<Genre> isGenreNameExist = adminGenreManagementRepository.findByName(postRequest.getName());
        if(isGenreNameExist.isPresent()){
            errors.add("Đã tồn tại tên thể loại này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }

        //post
        Genre postGenre = new Genre();
        Optional<Genre> GenreNewest = adminGenreManagementRepository.getNewest();
        if(GenreNewest.isPresent()){
            String code = GenreNewest.get().getCode();
            postGenre.setCode(code.substring(0,2)+((Integer.parseInt(code.substring(2)))+1));
        }else{
            postGenre.setCode("GR1");
        }
        postGenre.setName(postRequest.getName());
        postGenre.setDeleted(true);
        postGenre.setCreatedAt(new Date());
        adminGenreManagementRepository.save(postGenre);

        return new ResponseObject("Tạo mới thành công thể loại!");
    }

    @Override
    public ResponseObject putGenre(AdminGenreManagementPutRequest putRequest) {
        List<String> errors = new ArrayList<>();

        //check isExist
        Optional<Genre> GenreOptional = adminGenreManagementRepository.findById(putRequest.getGenreId());
        if(GenreOptional.isEmpty()){
            errors.add("Không tìm thấy thể loại này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }else{
            if(!GenreOptional.get().getName().equals(putRequest.getName())){
                Optional<Genre> isGenreNameExist = adminGenreManagementRepository.findByName(putRequest.getName());
                if(isGenreNameExist.isPresent()){
                    errors.add("Đã tồn tại tên thể loại này!");
                    throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
                }
            }
        }

        //post
        Genre postGenre = GenreOptional.get();
        postGenre.setName(putRequest.getName());
        adminGenreManagementRepository.save(postGenre);

        return new ResponseObject("Cập nhật thành công thể loại!");
    }

    @Override
    public ResponseObject deleteGenre(String genreId) {
        try {
            Optional<Genre> optionalGenre = adminGenreManagementRepository.findById(genreId);
            if(optionalGenre.isEmpty()){
                throw new Exception();
            }else{
                Genre deleteGenre = optionalGenre.get();
                deleteGenre.setDeleted(!deleteGenre.isDeleted());
                adminGenreManagementRepository.save(deleteGenre);
                return new ResponseObject("Thay đổi trạng thái thể loại thành công!");
            }
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được thể loại này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getDetailGenre(String genreId) {
        try {
            return new ResponseObject(adminGenreManagementRepository.getDetailGenre(genreId));
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được thể loại này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }
}

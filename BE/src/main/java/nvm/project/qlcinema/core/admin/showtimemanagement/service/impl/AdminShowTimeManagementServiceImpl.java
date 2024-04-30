package nvm.project.qlcinema.core.admin.showtimemanagement.service.impl;

import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.core.admin.showtimemanagement.model.request.AdminShowTimeManagementListShowTimeRequest;
import nvm.project.qlcinema.core.admin.showtimemanagement.model.request.AdminShowTimeManagementPostRequest;
import nvm.project.qlcinema.core.admin.showtimemanagement.model.request.AdminShowTimeManagementPutRequest;
import nvm.project.qlcinema.core.admin.showtimemanagement.model.response.AdminShowTimeManagementListShowTimeResponse;
import nvm.project.qlcinema.core.admin.showtimemanagement.repository.AdminShowTimeManagementChairRepository;
import nvm.project.qlcinema.core.admin.showtimemanagement.repository.AdminShowTimeManagementMovieRepository;
import nvm.project.qlcinema.core.admin.showtimemanagement.repository.AdminShowTimeManagementRepository;
import nvm.project.qlcinema.core.admin.showtimemanagement.repository.AdminShowTimeManagementRoomRepository;
import nvm.project.qlcinema.core.admin.showtimemanagement.repository.AdminShowTimeManagementTicketChairRepository;
import nvm.project.qlcinema.core.admin.showtimemanagement.service.AdminShowTimeManagementService;
import nvm.project.qlcinema.core.common.PageableObject;
import nvm.project.qlcinema.core.common.ResponseObject;
import nvm.project.qlcinema.entity.Chair;
import nvm.project.qlcinema.entity.Movie;
import nvm.project.qlcinema.entity.Room;
import nvm.project.qlcinema.entity.ShowTime;
import nvm.project.qlcinema.entity.TicketChair;
import nvm.project.qlcinema.infrastructure.exception.RestApiException;
import nvm.project.qlcinema.utils.ConvertTime;
import org.springframework.cglib.core.Local;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminShowTimeManagementServiceImpl implements AdminShowTimeManagementService {

    private final AdminShowTimeManagementRepository adminShowTimeManagementRepository;

    private final AdminShowTimeManagementRoomRepository adminShowTimeManagementRoomRepository;

    private final AdminShowTimeManagementMovieRepository adminShowTimeManagementMovieRepository;

    private final AdminShowTimeManagementTicketChairRepository adminShowTimeManagementTicketChairRepository;

    private final AdminShowTimeManagementChairRepository adminShowTimeManagementChairRepository;

    private final ConvertTime convertTime;

    @Override
    public PageableObject<AdminShowTimeManagementListShowTimeResponse> getListSearchShowTime(AdminShowTimeManagementListShowTimeRequest request) {
        try{
            PageRequest pageRequest = PageRequest.of(request.getPage() - 1,request.getSize());
            return new PageableObject<>(adminShowTimeManagementRepository.getListSearchShowTime(pageRequest,request));
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách xuất chiếu!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getOneShowTime(String id) {
        try{
            return new ResponseObject(adminShowTimeManagementRepository.getOneShowTime(id));
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được xuất chiếu này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getDetailShowTime(String id) {
        try{
            return new ResponseObject(adminShowTimeManagementRepository.getDetailShowTime(id));
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được xuất chiếu này!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getListTicketChair(String showTimeId) {
        try{
            return new ResponseObject(adminShowTimeManagementTicketChairRepository.getListTicketChair(showTimeId));
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách ghế ngồi!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getListArea() {
        try{
            return new ResponseObject(adminShowTimeManagementRepository.getListArea());
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách khu vực!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getListBranch(String areaId) {
        try{
            return new ResponseObject(adminShowTimeManagementRepository.getListBranch(areaId));
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách chi nhánh!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getListRoom(String branchId) {
        try{
            return new ResponseObject(adminShowTimeManagementRepository.getListRoom(branchId));
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách phòng chiếu!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject getListMovie() {
        try{
            return new ResponseObject(adminShowTimeManagementRepository.getListMovie());
        }catch (Exception e){
            List<String> errors = new ArrayList<>();
            errors.add("Không lấy được danh sách phim!");
            throw new RestApiException(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseObject postShowTime(AdminShowTimeManagementPostRequest postRequest) throws ParseException {
        List<String> errors = new ArrayList<>();

        //check Movie and Room isExist
        Optional<Movie> isMovieExist = adminShowTimeManagementMovieRepository.findById(postRequest.getMovieId());
        if(isMovieExist.isEmpty()){
            errors.add("Không tìm thấy bộ phim bạn chọn!");
            throw new RestApiException(errors,HttpStatus.NOT_FOUND);
        }
        for (String roomId : postRequest.getRoomId()){
            Optional<Room> isRoomExist = adminShowTimeManagementRoomRepository.findById(roomId);
            if(isRoomExist.isEmpty()){
                errors.add("Không tìm thấy phòng chiếu bạn chọn!");
                throw new RestApiException(errors,HttpStatus.NOT_FOUND);
            }
        }

        //checkDateValid
        for(LocalDate date : postRequest.getScreeningDate()){
            if(date.isBefore(LocalDate.now())){
                errors.add("Ngày chiếu không được nhỏ hơn ngày hôm nay!");
                throw new RestApiException(errors,HttpStatus.NOT_FOUND);
            }else if (date.isEqual(LocalDate.now())){
                //checkTimeValid
                for(String time : postRequest.getTimeStart()){
                    Time timeConverted = convertTime.convertStringToTime(time);
                    if(timeConverted.before(new Time(System.currentTimeMillis()))){
                        errors.add("Ngày: "+ date +" Thời gian chiếu không được sau thời điểm hiện tại!");
                        throw new RestApiException(errors,HttpStatus.NOT_FOUND);
                    }
                }
            }
        }

        //check Duplicate
        for(LocalDate date : postRequest.getScreeningDate()){
            for(String strRoom : postRequest.getRoomId()){
                for (String strTime : postRequest.getTimeStart()){
                    Optional<ShowTime> isShowTimeDuplicate = adminShowTimeManagementRepository.isShowTimeDuplicate(
                            date,
                            convertTime.convertStringToTime(strTime),
                            strRoom
                    );
                    if(isShowTimeDuplicate.isPresent()){
                        errors.add("Đã tồn tại phim có cùng khung giờ chiếu: " + strTime + " - Tại phòng chiếu: " + adminShowTimeManagementRoomRepository.getReferenceById(strRoom).getName() + " - Vào ngày: " + date);
                    }
                }
            }
        }
        //throwError
        if(!errors.isEmpty()){
            throw new RestApiException(errors,HttpStatus.CONFLICT);
        }

//        //postShowTime
        for(LocalDate date : postRequest.getScreeningDate()){
            for(String roomId : postRequest.getRoomId()){
                for (String strTime : postRequest.getTimeStart()){
                    ShowTime showTimeSaved = adminShowTimeManagementRepository.save(new ShowTime(
                            date,
                            convertTime.convertStringToTime(strTime),
                            postRequest.getTicketPrice(),
                            isMovieExist.get(),
                            adminShowTimeManagementRoomRepository.getReferenceById(roomId),
                            true,
                            new Date()
                    ));
                    for (Chair chair : adminShowTimeManagementChairRepository.getListChairByRoom(roomId)){
                        adminShowTimeManagementTicketChairRepository.save(new TicketChair(
                                chair.getName(),
                                false,
                                showTimeSaved,
                                new Date()
                        ));
                    }
                }
            }
        }

        return new ResponseObject("Thêm mới xuất chiếu thành công!");
    }

    @Override
    public ResponseObject putShowTime(AdminShowTimeManagementPutRequest putRequest) throws ParseException {
        List<String> errors = new ArrayList<>();
        //check isExist
        Optional<ShowTime> isShowTimeExist = adminShowTimeManagementRepository.findById(putRequest.getId());
        if(isShowTimeExist.isEmpty()){
            errors.add("Không tìm thấy phòng chiếu này!");
        }
        //check Movie and Room isExist
        Optional<Movie> isMovieExist = adminShowTimeManagementMovieRepository.findById(putRequest.getMovieId());
        if(isMovieExist.isEmpty()){
            errors.add("Không tìm thấy bộ phim bạn chọn!");
        }
        Optional<Room> isRoomExist = adminShowTimeManagementRoomRepository.findById(putRequest.getRoomId());
        if(isRoomExist.isEmpty()){
            errors.add("Không tìm thấy phòng chiếu bạn chọn!");
        }
        //throwError
        if(!errors.isEmpty()){
            throw new RestApiException(errors,HttpStatus.NOT_FOUND);
        }

        //checkDateValid
        if(putRequest.getScreeningDate().isBefore(LocalDate.now())){
            errors.add("Ngày chiếu không được nhỏ hơn ngày hôm nay!");
            throw new RestApiException(errors,HttpStatus.NOT_FOUND);
        }

        //putShowTime
        ShowTime putShowTime = isShowTimeExist.get();
        //Check dup
        if(!putRequest.getScreeningDate().isEqual(putShowTime.getScreeningDate()) ||
                !convertTime.convertStringToTime(putRequest.getTimeStart()).equals(putShowTime.getTimeStart()) ||
                !putRequest.getMovieId().equalsIgnoreCase(putShowTime.getMovieId().getId()) ||
                !putRequest.getRoomId().equalsIgnoreCase(putShowTime.getRoomId().getId())
        ){
            Optional<ShowTime> isShowTimeDuplicate = adminShowTimeManagementRepository.isShowTimeDuplicate(
                    putRequest.getScreeningDate(),
                    convertTime.convertStringToTime(putRequest.getTimeStart()),
                    putRequest.getRoomId()
            );
            if(isShowTimeDuplicate.isPresent()){
                errors.add("Đã tồn tại phim có cùng khung giờ chiếu!");
                throw new RestApiException(errors,HttpStatus.CONFLICT);
            }
        }
        SimpleDateFormat formatter = new SimpleDateFormat("HH:mm:ss");
        Date date = formatter.parse(putRequest.getTimeStart());
        putShowTime.setScreeningDate(putRequest.getScreeningDate());
        putShowTime.setTimeStart(new Time(date.getTime()));
        putShowTime.setTicketPrice(putRequest.getTicketPrice());
        putShowTime.setMovieId(isMovieExist.get());
        putShowTime.setRoomId(isRoomExist.get());
        adminShowTimeManagementRepository.save(putShowTime);

        return new ResponseObject("Cập nhật phong chiếu thành công!");
    }


}

package nvm.project.qlcinema.core.admin.moviemanagement.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Getter
@Setter
public class AdminMovieManagementPostRequest {

    @NotBlank(message = "Tên phim không được để trống!")
    private String name;

    @NotNull(message = "Thời lượng phim không được để trống!")
    private int duration;

    @NotNull(message = "Tuổi khuyến cáo không được để trống!")
    private int ageRestriction;

    @NotNull(message = "Ngày công chiếu phim không được để trống!")
    private LocalDate releaseDate;

    @NotBlank(message = "Đường dẫn video không được để trống!")
    private String videoPath;

    private MultipartFile banner;

    @NotBlank(message = "Diễn viên nổi bật không được để trống!")
    private String actor;

    @NotBlank(message = "Mô tả phim không được để trống!")
    private String description;

    @NotBlank(message = "Phụ đề phim không được để trống!")
    private String subTitle;

    @NotBlank(message = "Đạo diễn phim chưa được chọn!")
    private String directorId;

    @NotBlank(message = "Thể loại phim chưa được chọn!")
    private String genreId;

    @NotBlank(message = "Quốc gia của phim chưa được chọn!")
    private String countryId;

    @NotBlank(message = "Độ phân giải của phim chưa được chọn!")
    private String formatId;

}

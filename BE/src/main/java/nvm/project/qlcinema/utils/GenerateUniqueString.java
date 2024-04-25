package nvm.project.qlcinema.utils;

import org.springframework.stereotype.Component;

import java.security.SecureRandom;

@Component
public class GenerateUniqueString {

    public String generateOrderCode() {
        // Các ký tự và số được chấp nhận
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        // Độ dài của chuỗi cần tạo
        int length = 20;

        // StringBuilder để xây dựng chuỗi kết quả
        StringBuilder sb = new StringBuilder(length);

        // Sử dụng SecureRandom để tạo ngẫu nhiên
        SecureRandom random = new SecureRandom();

        // Tạo chuỗi ngẫu nhiên bằng cách chọn ngẫu nhiên ký tự từ danh sách
        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(characters.length());
            char randomChar = characters.charAt(randomIndex);
            sb.append(randomChar);
        }
        sb.insert(10, '-');

        return sb.toString();
    }

}

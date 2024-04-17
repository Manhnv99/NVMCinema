package nvm.project.qlcinema.utils;

import org.springframework.stereotype.Component;

import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;

@Component
public class ConvertTime {

    public Time convertStringToTime(String strTime) throws ParseException {
        SimpleDateFormat formatter = new SimpleDateFormat("HH:mm:ss");
        return new Time(formatter.parse(strTime).getTime());
    }

}

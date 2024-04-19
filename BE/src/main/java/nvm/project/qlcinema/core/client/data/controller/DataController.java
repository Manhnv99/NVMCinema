package nvm.project.qlcinema.core.client.data.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/test")
public class DataController {

    @GetMapping("/data")
    public String testData(){
        return "ok";
    }

}

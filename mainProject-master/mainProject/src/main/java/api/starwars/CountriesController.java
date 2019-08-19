package api.starwars;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CountriesController {


 @RequestMapping("/countries")
public String countriesPage() {
    return "countries.html";
}

}
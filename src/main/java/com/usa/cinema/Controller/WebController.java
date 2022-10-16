package com.usa.cinema.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class WebController {
    @RequestMapping("welcome")
    public String irPaginaBienvenida() {
        return "templates/welcome.html";
    }
    @RequestMapping("")
    public String irPaginaBienvenida1() {
        return "templates/welcome.html";
    }

    @RequestMapping("admin")
    public String irPaginaAdmin() {
        return "templates/admin.html";
    }

    @RequestMapping("categories")
    public String irPaginaCategories() {
        return "templates/category.html";
    }

    @RequestMapping("cinemas")
    public String irPaginaCinemas() {
        return "templates/cinema.html";
    }

    @RequestMapping("clients")
    public String irPaginaClients() {
        return "templates/client.html";
    }

    @RequestMapping("messages")
    public String irPaginaMessages() {
        return "templates/message.html";
    }

    @RequestMapping("reservations")
    public String irPaginaReservations() {
        return "templates/reservation.html";
    }


    @RequestMapping("scores")
    public String irPaginaScores() {
        return "templates/score.html";
    }

}

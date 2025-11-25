package com.medtechhack.bonedensity.controller;

import com.medtechhack.bonedensity.model.BoneDensityReading;
import com.medtechhack.bonedensity.service.BoneDensityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class DashboardController {

    private final BoneDensityService boneDensityService;

    // Constructor injection
    public DashboardController(BoneDensityService boneDensityService) {
        this.boneDensityService = boneDensityService;
    }

    @GetMapping("/")
    public String home(Model model) {
        return "index";
    }

    @GetMapping("/dashboard")
    public String dashboard(@RequestParam(defaultValue = "user001") String userId, Model model) {
        BoneDensityReading latestReading = boneDensityService.getLatestReading(userId);
        List<BoneDensityReading> recentReadings = boneDensityService.getRecentReadings(userId);

        model.addAttribute("latestReading", latestReading);
        model.addAttribute("readings", recentReadings);
        model.addAttribute("userId", userId);

        return "dashboard";
    }

    @GetMapping("/about")
    public String about(Model model) {
        return "about";
    }
}
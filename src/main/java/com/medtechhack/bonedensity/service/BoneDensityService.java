package com.medtechhack.bonedensity.service;

import com.medtechhack.bonedensity.model.BoneDensityReading;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class BoneDensityService {

    // Simulated data for demo - replace with real device data later
    public List<BoneDensityReading> getRecentReadings(String userId) {
        List<BoneDensityReading> readings = new ArrayList<>();

        // Sample data - will be replaced with actual device readings
        readings.add(new BoneDensityReading(userId, 1.15, 3.2, "Healthy",
                LocalDateTime.now().minusHours(1)));
        readings.add(new BoneDensityReading(userId, 1.12, 3.1, "Healthy",
                LocalDateTime.now().minusHours(5)));
        readings.add(new BoneDensityReading(userId, 1.10, 3.0, "Warning",
                LocalDateTime.now().minusDays(1)));

        return readings;
    }

    public BoneDensityReading getLatestReading(String userId) {
        return new BoneDensityReading(userId, 1.15, 3.2, "Healthy", LocalDateTime.now());
    }

    public String determineHealthStatus(double density) {
        // Based on WHO osteoporosis criteria (simplified)
        if (density >= 1.0) {
            return "Healthy";
        } else if (density >= 0.8) {
            return "Warning";
        } else {
            return "Concerning";
        }
    }
}

package com.medtechhack.bonedensity.model;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoneDensityReading {
    private String userId;
    private double density;
    private double acousticImpedance;
    private String healthStatus; // "Healthy", "Warning", "Concerning"
    private LocalDateTime timestamp;
}

package com.zedni.backend.dto.Cours;

import com.zedni.backend.dto.Person.EtudiantDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardDTO {
    private int totalCourses;
    private int totalStudents;// list of enrolled students

}

package com.gouriny.portfolio_be.academicsubdomain.datalayer;

import jdk.jshell.Snippet;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "academics")
@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Academic {
    @Id
    private String id;
    private String title;
    private String years;
    private String description;


}


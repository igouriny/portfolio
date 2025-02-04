package com.gouriny.portfolio_be.informationsubdomain.datalayer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Document(collection = "about")
public class About {

    @Id
    private String id;
    private String name;
    private String subtitle;
    private String content;
    private String leftContent;
    private String rightContent;



}

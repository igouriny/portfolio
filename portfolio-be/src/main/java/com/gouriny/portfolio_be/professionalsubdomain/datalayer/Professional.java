package com.gouriny.portfolio_be.professionalsubdomain.datalayer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "professional")
@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Professional {

    @Id
    private String id;

    private String title;
    private String years;
    private String description;
}

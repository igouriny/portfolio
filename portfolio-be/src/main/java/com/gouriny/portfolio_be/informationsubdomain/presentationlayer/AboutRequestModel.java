package com.gouriny.portfolio_be.informationsubdomain.presentationlayer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AboutRequestModel {
    private String name;
    private String subtitle;
    private String content;
    private String leftContent;
    private String rightContent;
}

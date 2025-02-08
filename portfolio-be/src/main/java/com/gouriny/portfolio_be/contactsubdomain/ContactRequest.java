package com.gouriny.portfolio_be.contactsubdomain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContactRequest {
    private String name;
    private String email;
    private String subject;
    private String message;

}


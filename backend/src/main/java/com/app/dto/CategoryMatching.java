package com.app.dto;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CategoryMatching {
	@NotBlank(message="main category must be provided")
	private String mainCategory;
	
	@NotBlank(message="sub category must be provided")
	private String subCategory;
	
	private String variety;
}

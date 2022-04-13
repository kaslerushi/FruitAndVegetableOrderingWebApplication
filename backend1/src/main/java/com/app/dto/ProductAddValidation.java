package com.app.dto;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import com.app.pojos.Category;
import com.app.pojos.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProductAddValidation {
	@Length(min=5,max=45)
	private String productName;
	
	@NotNull(message="total qty cannot be blank")
	private int totalQty;
	
//	@NotNull(message="organic or not must be provided")
	private boolean isOrganic; 
	
	@NotBlank(message="main category must be provided")
	private String mainCategory;
	
	@NotBlank(message="sub category must be provided")
	private String subCategory;
	
	private String variety;
	
	private String email;

	public boolean getIsOrganic() {
		return isOrganic;
	}
	
}

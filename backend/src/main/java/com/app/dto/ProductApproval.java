package com.app.dto;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@Getter
@Setter
@Data
public class ProductApproval {
	
	@Length(min=5,max=45)
	private String productName;
	
	private boolean available; //will be done by store admin
	
	private boolean approved; //will be done by admin
	
	@NotNull(message="default quantity must be provided")
	private int minBuyQty; //qty to show next to the image on UI page by default at start so user can either buy that much quantity 
	//or further/more than it and this will be set by the admin/store admin looking at the duration of its freshness
	
	@Max(value=80)
	private int discount; //will be set by admin whenever he/she wants
	
	private String originPlace;//will be set by store admin
	
	@NotBlank(message="image must be provided")
	private String img;
	
	@NotNull(message="purchase price must be provided")
	private double purchasePriceOnUnitQty;
	
	public ProductApproval() {
		this.originPlace="Not Available";
		this.discount=0;
	}

	public boolean getApproved() {
		return this.approved;
	}

	public boolean getAvailable() {
		return this.available;
	}


}

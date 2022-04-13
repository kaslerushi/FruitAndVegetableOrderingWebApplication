package com.app.pojos;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "products")
@AllArgsConstructor
@Data
public class Product extends BaseEntity{
	
	@Length(min=5,max=60)
	private String productName;
	
	private LocalDate productInventoryAddedDate;
	
//	@Min(value = 1)
	@Max(value=5)
	private int avgRating;
	
	@NotNull(message="total qty cannot be blank")
	private int totalQty;
	
	private int qtyRemaining; //formulae based automatic and default
	
	private boolean available; //will be done by store admin
	
	private boolean approved; //will be done by admin
	
	@NotNull(message="organic or not must be provided")
	private boolean isOrganic; 
	
	private boolean isPaymentDone; //once admin does payment and if
	
	private int minBuyQty; //qty to show next to the image on UI page by default at start so user can either buy that much quantity 
	//or further/more than it and this will be set by the admin/store admin looking at the duration of its freshness
	
	private double pricePerUnitQty; //formulae based on defaultQty and the purchase price
	
	@Max(value=80)
	private int discount; //will be set by admin whenever he/she wants
	
	private double totalEarning;
	
	@Column(length=20)
	private String originPlace;//will be set by store admin
	
	private double purchasePriceOnUnitQty;//set per defaultUnit for ex;if kg then 40 rs per 1kg,if lt then 1 lt.....if pkt then 1pkt
	
	private LocalDateTime purchaseDate;
	//here purchase price is the price to pay to the farmer later between 48 hours 
	//of selling by farmer and will be assigned by the store admin once he receives it 
	//and purchase date will be the time at which it gets received at the store
	private String img;
	
	@ManyToOne()
	@JoinColumn(name="farmer_id",nullable = false)
	private User user;
	
	@ManyToOne()
	@JoinColumn(name="category_id",nullable = false)
	private Category category;
	
	
	
	public Product(String productName,int totalQty,boolean isOrganic,double purchasePriceOnUnitQty,User u,Category c)
	{
		this();
		this.productName=productName;
		this.totalQty=totalQty;
		this.isOrganic=isOrganic;
		this.purchasePriceOnUnitQty=purchasePriceOnUnitQty;
		this.user=u;
		this.category=c;
		this.qtyRemaining=totalQty;
	}
	public Product()
	{
		this.avgRating=0;
		this.available=false;
		this.approved=false;
		this.isPaymentDone=false;
		this.discount=0;
		this.totalEarning=0;
		this.productInventoryAddedDate=LocalDate.now();
		this.purchasePriceOnUnitQty=0;
		this.purchaseDate=null;
//		this.originPlace="";
	}
}

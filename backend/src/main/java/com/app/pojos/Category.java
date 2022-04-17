package com.app.pojos;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="categories")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Category extends BaseEntity {

	@NotEmpty(message="main category must be provided")
	private String mainCategory;
	
	@NotEmpty(message="sub category must be provided")
	private String subCategory;
	
	@Column(unique = true)
	private String variety;

	@NotEmpty(message="default unit must be provided")
	private String defaultUnit;// create enum for it ex:kg,g,lt,pkt,box,....
	
	@NotNull(message="minimum Qty for buying must be set")
	private int miniSellQty;//minimum quantity that farmer must sell or more than it but not less than it
	
	@NotNull(message="minimum buying price required")
	private double minSellPrice; //must set bby admin and must shown to the farmer at the time he select category for selling product
	
//	@ElementCollection(fetch = FetchType.LAZY)
//	@CollectionTable(name = "facts",joinColumns = @JoinColumn(name="category_id"))
//	@Column(length = 200)
//	private List<String> facts = new ArrayList<>();
//	
//	@ElementCollection(fetch = FetchType.LAZY)
//	@CollectionTable(name = "benefits",joinColumns = @JoinColumn(name="category_id"))
//	@Column(length = 200)
//	private List<String> benefits = new ArrayList<>();
	
}











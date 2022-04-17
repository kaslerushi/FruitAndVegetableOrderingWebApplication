package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "addresses")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Address extends BaseEntity{
	
	private boolean defaultAddr;
	
	@NotEmpty
	@Column(length = 20)
	private String city;
	
	@NotBlank(message="must provide state")
	@Column(length = 20)
	private String state;
	
	@NotEmpty(message="must provide country")
	@Column(length = 20)
	private String country;
	
	@NotBlank(message="must provide the zipcode")
	@Column(length = 20)
	private String zipCode;
	
	@NotBlank(message="must provide the addreess details in line 1")
	@Column(length = 20)
	private String line1;
	
	@Column(length = 20)
	private String line2;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id",nullable = false)
	private User user;

}

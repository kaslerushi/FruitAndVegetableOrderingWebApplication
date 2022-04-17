package com.app.pojos;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="carts")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Cart extends BaseEntity{
	
	@Column(name="total_items")
	private int totalItems;
	
//	@OneToOne
//	@JoinColumn(name="user_id",nullable=false)
//	@MapsId
//	private User user;
	
//	@ManyToMany
//	@JoinTable(name = "cart_items", 
//	joinColumns = @JoinColumn(name = "cart_id"), 
//	inverseJoinColumns = @JoinColumn(name = "product_id"))
//	private Set<Product> products = new HashSet<>();
}

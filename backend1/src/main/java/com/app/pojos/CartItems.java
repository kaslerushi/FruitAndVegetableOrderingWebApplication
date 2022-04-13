package com.app.pojos;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;
import javax.validation.constraints.Min;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="cart_items")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CartItems implements Serializable{
	@Column(name="quantity")
	@Min(value=1)
	private int qty;
	
	@Id
	@ManyToOne()
	@JoinColumn(name="cart_id",nullable = false)
	private Cart cart;
	
	@Id
	@ManyToOne()
	@JoinColumn(name="product_id",nullable = false)
	private Product product;
	
//	@ManyToMany
//	@JoinTable(name = "cart_items", 
//	joinColumns = @JoinColumn(name = "cart_id"), 
//	inverseJoinColumns = @JoinColumn(name = "product_id"))
//	private Set<Product> products = new HashSet<>();
}

package com.app.pojos;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="order_items")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class OrderItems implements Serializable{
	
	private int quantity;
	
	@Min(value = 0)
	@Max(value=5)
	private int itemRating;
	
	private double price;
	
	@Id
	@ManyToOne()
	@JoinColumn(name="order_id",nullable = false)
	private Order order;
	
	@Id
	@ManyToOne()
	@JoinColumn(name="product_id",nullable = false)
	private Product product;
	
//	@ManyToMany
//	@JoinTable(name = "order_items", 
//	joinColumns = @JoinColumn(name = "order_id"), 
//	inverseJoinColumns = @JoinColumn(name = "product_id"))
//	private Set<Product> products = new HashSet<>();
}

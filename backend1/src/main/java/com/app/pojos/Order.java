package com.app.pojos;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "orders")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Order extends BaseEntity{
	
	private LocalDate date;
	
	private double amount;
	
//	@Enumerated(EnumType.STRING)
//	@NotEmpty(message="payment method must be selected")
//	private PaymentMethod paymentMethod;
	
	private boolean delivered;
	
	private boolean paymentStatus;
	
	//when delivery and payment both are done 
	//then make order completed true otherwise false
	private boolean orderCompleted;
	
//	@Length(min = 10,max=100,message="must contain minimum 10 and maximum 100 characters")
//	private String feedback;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="user_id",nullable = false)
	private User user;
	
	private String deliveryAddress;
	
//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name="delivery_addr_id",nullable = false)
//	private Address deliveryAddress;
	
//	@ManyToMany
//	@JoinTable(name = "order_items", 
//	joinColumns = @JoinColumn(name = "order_id"), 
//	inverseJoinColumns = @JoinColumn(name = "product_id"))
//	private Set<Product> products = new HashSet<>();
	
	
	//@ManyToMany // mandatory
//	@JoinTable(name = "projects_students", 
//	joinColumns = @JoinColumn(name = "project_id"), 
//	inverseJoinColumns = @JoinColumn(name = "student_id"))
//	private Set<Student> students = new HashSet<>();
	
//	@ManyToOne(fetch=FetchType.LAZY)
//	@JoinColumn(name="delivery_addr_id",nullable = false)
//	private Address deliveryAddrId;
}

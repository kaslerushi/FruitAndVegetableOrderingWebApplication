package com.app.pojos;

import java.time.LocalDate;
import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="payments")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Payment extends BaseEntity{
	
	private LocalDate paymentDate;
	
	private LocalTime paymentTime;
	
	@NotNull(message="amount cannot be null")
	private double amount;
	
	private Integer senderAcctId;
	
	private Integer receiverAcctId;
	
	@OneToOne
	@JoinColumn(name="product_id")
	private Product product;
	
	@OneToOne
	@JoinColumn(name="order_id")
	private Order order;
}

package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "bank_accounts")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BankAccount extends BaseEntity {
	@NotBlank(message="must provide bank name")
	@Column(length=50)
	private String bankName;
	
	@NotEmpty(message="there should be some balance(minimum 100) in account")
	@Min(100)
	private double balance; 
	
	
	@Enumerated(EnumType.STRING)
	@NotEmpty(message="account type is must")
	@Column(length = 20)
	private AcctType acctType;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="user_id")
	private User user;
	
	@Override
	public String toString() {
		return "BankAccount [bankname="+bankName+", acctType=" + acctType + ", balance=" + balance + "]";
	}
}


//@Enumerated(EnumType.STRING)
//@Column(length = 20)
//private AcctType acctType;
//private double balance;
//@ManyToOne(fetch = FetchType.LAZY)	
//@JsonIgnore
//@JoinColumn(name="cust_id")
//private Customer acctOwner;
//public BankAccount(AcctType acctType, double balance) {
//	super();
//	this.acctType = acctType;
//	this.balance = balance;
//}
//@Override
//public String toString() {
//	return "BankAccount [acctType=" + acctType + ", balance=" + balance + "]";
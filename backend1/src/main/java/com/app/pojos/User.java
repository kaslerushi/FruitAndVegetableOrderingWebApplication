package com.app.pojos;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User extends BaseEntity {
	@NotBlank(message = "First Name is required")
	@Column(length=10)
	private String fname;
	
	@Column(length=10)
	@NotBlank(message = "Last Name is required")
	private String lname;
	
//	@Column(length = 10,unique = true)
//	@Length(min=10,max=13)
//	@Pattern(regexp="^\\\\d{10}$",message="wrong number")
//	@NotBlank(message="cannnot be empty")
//	private String mobno;
	
	@Column(unique = true)
	private String email;
	
	@Column(length=300, nullable = false)
	private String password;
	
//	@Transient
//	@NotNull(message="reenter password field must be filled")
////	@JsonIgnore
//	private String confirmPassword;
	
	
	// UserEntity *------>* Role
	@ManyToMany(fetch = FetchType.EAGER) //acceptable solution since max size of many(roles) is 2
	@JoinTable(name="user_roles",joinColumns = @JoinColumn(name="user_id"),
	inverseJoinColumns = @JoinColumn(name="role_id"))
	private Set<Role> roles=new HashSet<>();
	
	
	public User(String email, String password) {
		super();
		this.email = email;
		this.password = password;
	}
	
	public User(String email, String password,Set<Role> roles ) {
		super();
		this.email = email;
		this.password = password;
		this.roles=roles;
	}
	
	public User(String fname,String lname,String email,String password ) {
		super();
		this.fname = fname;
		this.lname = lname;
		this.email = email;
		this.password=password;
	}
	
}







//tday18


//@Override
//public String toString() {
//	return "BankAccount [acctType=" + acctType + ", balance=" + balance + "]";
//}

//@Column(name = "card_number", unique = true, length = 20)
//private String cardNumber;

//Entity ---> Value type
//	@Embedded // OPTIONAL , added only for understanding
//	private AdharCard card;
	// one to many mapping (collection of basic types : String) between
	// Entity(Student) ----> Hobbies(basic value type)
//	@ElementCollection // Mandatory for configuring collection of basic value types
//	@CollectionTable(name = "student_hobbies",joinColumns = @JoinColumn(name="student_id"))
//	@Column(length = 100)
//	private List<String> hobbies = new ArrayList<>();
	//entity 1--->* value type , collection of embeddables
//	@ElementCollection //MANDATORY
//	@CollectionTable(name="student_qualifications",joinColumns = @JoinColumn(name="student_id"))
//	private List<EducationalQualifications> qualifications=new ArrayList<>();

//many -to -many : uni dir
	// Project *----->* Student
//	@ManyToMany // mandatory
//	@JoinTable(name = "projects_students", 
//	joinColumns = @JoinColumn(name = "project_id"), 
//	inverseJoinColumns = @JoinColumn(name = "student_id"))
//	private Set<Student> students = new HashSet<>();

//@NotNull(message = "salary must be supplied")
//@Min(value = 10000, message="salary < min salary")
//@Max(value=50000, message="salary > max salary")
//private double salary;
//@Future(message = "Join Date must be in future....")
//private LocalDate joinDate;

//@ManyToOne(fetch = FetchType.LAZY)	
//@JsonIgnore
//@JoinColumn(name="cust_id")
//private Customer acctOwner;

//uni dir Many to one association : Tutorail * -----> 1 Topic
//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name="topic_id",nullable = false)
//	private Topic topic;

//@Transient
//private String confirmPassword;

//one to one association : uni dir manner
	//Address 1--->1 Student 
	//which is the additional property ?
//	@OneToOne
//	@JoinColumn(name="s_id",nullable = false)
//	@MapsId
//	private Student student;

//@Lob //column : longblob
//private byte[] image;
//	public Employee(String name, String lastName) {
//		super();
//		this.fname = fname;
//		this.lname = lname;
//	}
	

//	public Employee() {
//		// TODO Auto-generated constructor stub
//	}

//	public Employee(String name, String location, String dept) {
//		super();
//		this.name = name;
//		this.location = location;
//		this.dept = dept;
//	}

//	public String getName() {
//		return name;
//	}
//
//	public void setName(String name) {
//		this.name = name;
//	}
//
//	public String getLocation() {
//		return location;
//	}
//
//	public void setLocation(String location) {
//		this.location = location;
//	}
//
//	public String getDept() {
//		return dept;
//	}
//
//	public void setDept(String dept) {
//		this.dept = dept;
//	}
//
//	@Override
//	public String toString() {
//		return "Employee Id " + getId() + " [name=" + name + ", location=" + location + ", dept=" + dept + "]";
//	}



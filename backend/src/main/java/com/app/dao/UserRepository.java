package com.app.dao;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.pojos.User;

public interface UserRepository extends JpaRepository<User, Integer>{

	Optional<User> findByEmailAndPassword(String email, String password);
	
	Optional<User> findByEmail(String email);
	
	boolean existsByEmail(String email);
//	Optional<User> findByEmail(String email);
	//Find all emps drawing salary > specific value : use derived query methods(finder methods)
//List<User> findBySalaryGreaterThan(double minSalary);
	//Find all emps joined between 2 dates
//List<User> findByJoinDateBetween(LocalDate begin,LocalDate end);
	//Find all emps from specific department n location
//List<User> findByEmailAndPassword(String rushiemail,String pass123);
	//Find an employee with specific lastname
//Optional<User> findByName(String lastName);
	// Update employee salary for specific id.
//@Modifying //=> DML
//@Query("update Employee e set e.salary=e.salary+:incr where e.id=:id") //=> custom query method : no method naming pattern is expected
//int updateEmpSalary(@Param("incr") double salIncr,@Param("id") int empId);
	//Sort all emps from specific dept as per salary
//List<User> findByDeptOrderBySalary(String deptId);
	//Display name n lastName of emps from a specific dept. : custom query with constr expression\
//@Query("select new com.app.pojos.Employee(name,lastName)  from Employee e where e.dept=?1")
//List<User> getEmpFullNamesByDept(String department);//method name can be any thing since it's custom query method
}

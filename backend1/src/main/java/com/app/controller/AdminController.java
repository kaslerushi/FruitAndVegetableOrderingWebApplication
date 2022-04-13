package com.app.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.LoginResponse;
import com.app.dto.ProductAddValidation;
import com.app.dto.ProductApproval;
import com.app.pojos.Category;
import com.app.service.ICategoryService;
import com.app.service.IproductService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/admin")
public class AdminController {
	@Autowired
	private ICategoryService categoryService;
	@Autowired
	private IproductService productService;
	
	@PostMapping("/addCategory")
	public ResponseEntity<?> addCategory(@RequestBody @Valid Category c) // de-serial (un marshalling) + apply validation rules
	{
		System.out.println("printing category from client:"+c);
		return new ResponseEntity<>(categoryService.addCategory(c), HttpStatus.OK);
	}
	
	@PutMapping("/editCategory")
	public ResponseEntity<?> editCategory(@RequestBody @Valid Category c) // de-serial (un marshalling) + apply validation rules
	{
		return new ResponseEntity<>(categoryService.updateCategory(c), HttpStatus.OK);
	}
	
	@DeleteMapping("/categories/delete/{id}")
	public ResponseEntity<?> getCategoryDetails(@PathVariable int id) // de-serial (un marshalling) + apply validation rules
	{
		System.out.println(id);
		return new ResponseEntity<>(categoryService.deleteCategory(id), HttpStatus.OK);
	}
	
//	@PutMapping("/categories/approve")
//	public ResponseEntity<?> approveProduct(@RequestBody @Valid ProductApproval p) // de-serial (un marshalling) + apply validation rules
//	{
//		return new ResponseEntity<>(productService.approveProduct(p),HttpStatus.OK);
//		
//	}
	
	@GetMapping("/allProducts")
	public ResponseEntity<?> getAllProductDetails() // de-serial (un marshalling) + apply validation rules
	{
		return new ResponseEntity<>(productService.getAllProducts(),HttpStatus.OK);
	}
	
	@GetMapping("/allProducts/{id}")
	public ResponseEntity<?> getProductDetails(@PathVariable int id) // de-serial (un marshalling) + apply validation rules
	{
		return new ResponseEntity<>(productService.getProductDetails(id),HttpStatus.OK);
	}
	
	@PutMapping("/allProducts/approve/{id}")
	public ResponseEntity<?> approveProduct(@RequestBody @Valid ProductApproval p,@PathVariable int id) // de-serial (un marshalling) + apply validation rules
	{
		return new ResponseEntity<>(productService.approveProduct(p,id),HttpStatus.OK);
	}
	
//	@PutMapping("/allProducts/editProduct/{id}")
//	public ResponseEntity<?> editProduct(@RequestBody @Valid Product p,@PathVariable int id) // de-serial (un marshalling) + apply validation rules
//	{
//		return new ResponseEntity<>( HttpStatus.OK);
//	}
	
	@DeleteMapping("/allProducts/delete/{id}")
	public ResponseEntity<?> deleteProduct(@PathVariable int id) // de-serial (un marshalling) + apply validation rules
	{
		return new ResponseEntity<>(productService.deleteProduct(id), HttpStatus.OK);
	}
}

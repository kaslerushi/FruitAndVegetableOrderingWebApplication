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
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.CategoryMatching;
import com.app.dto.ProductAddValidation;
import com.app.dto.ProductApproval;
import com.app.pojos.Category;
import com.app.pojos.Product;
import com.app.service.IproductService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/products")
public class ProductController {
	@Autowired
	private IproductService productService;
	
	
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteProduct(@PathVariable int id) // de-serial (un marshalling) + apply validation rules
	{
		return new ResponseEntity<>(productService.deleteProduct(id),HttpStatus.OK);
		
	}
	
//	@PostMapping("/add")
//	public ResponseEntity<?> addProduct(@RequestBody @Valid ProductAddValidation p) // de-serial (un marshalling) + apply validation rules
//	{
//		return new ResponseEntity<>(productService.addProduct(p),HttpStatus.OK);
//	}
	
	
	
	@PutMapping("/update")
	public ResponseEntity<?> updateProduct(@RequestBody @Valid Product p) // de-serial (un marshalling) + apply validation rules
	{
		return new ResponseEntity<>(productService.updateProduct(p),HttpStatus.OK);
		
	}
}

package com.app.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ProductAddValidation;
import com.app.service.ICategoryService;
import com.app.service.IproductService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/farmer")
public class FarmerController {
	@Autowired
	private IproductService productService;
	@Autowired
	private ICategoryService categoryService;
	
	@GetMapping("/categories")
	public ResponseEntity<?> getAllCategories() // de-serial (un marshalling) + apply validation rules
	{
		return new ResponseEntity<>(categoryService.getAllCategories(), HttpStatus.OK);
	}
	
	@PostMapping("/addProduct")
	public ResponseEntity<?> addProduct(@RequestBody @Valid ProductAddValidation p) // de-serial (un marshalling) + apply validation rules
	{
		System.out.println("printing product from farmer:"+p);
		return new ResponseEntity<>(productService.addProduct(p), HttpStatus.OK);
	}
}

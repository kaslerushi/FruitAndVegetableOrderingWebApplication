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
@RequestMapping("/customer")
public class CustomerController {
	@Autowired
	private ICategoryService categoryService;
	@Autowired
	private IproductService productService;
	@GetMapping("/allProducts")
	public ResponseEntity<?> getAllProductDetails() // de-serial (un marshalling) + apply validation rules
	{
		return new ResponseEntity<>(productService.getAllProducts(),HttpStatus.OK);
	}
}

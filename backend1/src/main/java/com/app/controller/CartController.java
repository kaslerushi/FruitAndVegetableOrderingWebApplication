package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.service.ICategoryService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/carts")
public class CartController {
	@Autowired
	private ICategoryService categoryService;
	
	@GetMapping
	public ResponseEntity<?> getAllCategories() // de-serial (un marshalling) + apply validation rules
	{
		return new ResponseEntity<>(categoryService.getAllCategories(), HttpStatus.OK);
	}
}

	
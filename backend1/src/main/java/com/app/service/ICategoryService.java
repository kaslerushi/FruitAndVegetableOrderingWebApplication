package com.app.service;

import java.util.List;

import javax.validation.Valid;

import com.app.pojos.Category;

public interface ICategoryService {
	Category addCategory(Category c);
	
	String deleteCategory(int id);
	
	Category updateCategory(Category c);

	List<Category> getAllCategories();

	Category editCategory(Category c);
}

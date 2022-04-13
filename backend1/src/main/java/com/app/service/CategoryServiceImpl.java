package com.app.service;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exception.DuplicateException;
import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.CategoryRepository;
import com.app.dao.UserRepository;
import com.app.pojos.Category;
import com.app.pojos.User;

@Service
@Transactional
public class CategoryServiceImpl implements ICategoryService{
	@Autowired
	private CategoryRepository categoryRepo;

	@Override
	public Category addCategory(Category c) {
		if(c.getVariety()==null || c.getVariety()=="")
		{
			if(categoryRepo.isSubCategoryPresent(c.getSubCategory())==1)
				throw new DuplicateException("duplicate category");
		}
		else if(categoryRepo.existsByVariety(c.getVariety()))
		{
			throw new DuplicateException("duplicate category");
		}
		return categoryRepo.save(c);
	}
	
	@Override
	public Category updateCategory(Category c) {
		if(!categoryRepo.existsById(c.getId()))
		{
			throw new ResourceNotFoundException("no such category with given id");
		}
		if(c.getVariety()==null || c.getVariety()=="")
		{
			if(categoryRepo.isSubCategoryPresent(c.getSubCategory())==1)
				throw new DuplicateException("duplicate category");
		}
		else if(categoryRepo.existsByVariety(c.getVariety()))
		{
			int id=categoryRepo.getIdByVariety(c.getVariety());
			if(c.getId()!=id)
			{
				throw new DuplicateException("duplicate category");
			}
		}
		return categoryRepo.save(c);
	}
	
	@Override
	public String deleteCategory(int id) {
		// service layer invokes dao's method
		categoryRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("no category present with this id"));
		categoryRepo.deleteById(id);
		return "category with ID " + id + " deleted successfuly... ";
	}
	
	@Override
	public List<Category> getAllCategories()
	{
		return categoryRepo.findAll();
	}
	
	@Override
	public Category editCategory(Category c)
	{
		return categoryRepo.save(c);
	}
	
	
}

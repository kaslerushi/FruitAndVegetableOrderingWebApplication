package com.app.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exception.ProductAddException;
import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.CategoryRepository;
import com.app.dao.ProductRepository;
import com.app.dao.UserRepository;
import com.app.dto.CategoryMatching;
import com.app.dto.ProductAddValidation;
import com.app.dto.ProductApproval;
import com.app.pojos.Category;
import com.app.pojos.Product;
import com.app.pojos.User;

@Service
@Transactional
public class ProductServiceImpl implements IproductService{
	@Autowired
	private ProductRepository productRepo;
	@Autowired
	private CategoryRepository categoryRepo;
	@Autowired
	private IUserService iUserService;
	@Autowired
	private UserRepository userRepo;

	@Override
	public Product addProduct(ProductAddValidation p) {
		Category category=categoryRepo.findByMainCategoryAndSubCategoryAndVariety(p.getMainCategory(), p.getSubCategory(), p.getVariety()).orElseThrow(()->new ResourceNotFoundException("no such category"));
		User user=userRepo.findByEmail(p.getEmail()).orElseThrow(()->new ResourceNotFoundException("user not found"));
		if(p.getTotalQty()<category.getMiniSellQty())
		{
			throw new ProductAddException("quantity is very less should be atleast "+category.getMiniSellQty());
		}
		double purchasePriceOnUnitQty=category.getMinSellPrice();
		//String productName,double totalQty,boolean isOrganic,User u,Category c
		Product product=new Product(p.getProductName(),p.getTotalQty(),p.getIsOrganic(),purchasePriceOnUnitQty,user,category);
		
		return productRepo.save(product);
	}

	@Override
	public Product approveProduct(ProductApproval p,int id) {
		System.out.println("ProductApproval:"+p);
//		Product product=productRepo.findById(p.getId()).orElseThrow(()->new ResourceNotFoundException("product not found"));
		Product product=productRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("product not found"));
		if(p.getPurchasePriceOnUnitQty()<product.getCategory().getMinSellPrice() || p.getPurchasePriceOnUnitQty()<product.getPurchasePriceOnUnitQty())
		{
			throw new ProductAddException("purchase price must be greater than or equal to msp:"+product.getCategory().getMinSellPrice()+" and the previous purchase price :"+product.getPurchasePriceOnUnitQty());
		}
		double priceOnUnitQty=((p.getPurchasePriceOnUnitQty()*product.getTotalQty())*(1-(p.getDiscount()/100)))/product.getTotalQty();
		
		product.setApproved(true);
		product.setAvailable(true);
		product.setProductName(p.getProductName());
		product.setMinBuyQty(p.getMinBuyQty());
		product.setDiscount(p.getDiscount());
		product.setPurchasePriceOnUnitQty(p.getPurchasePriceOnUnitQty());
		product.setOriginPlace(p.getOriginPlace());
		product.setPricePerUnitQty(priceOnUnitQty);
		product.setImg(p.getImg());
		if(product.getPurchaseDate()==null)
		{
			product.setPurchaseDate(LocalDateTime.now());
		}
		return productRepo.save(product);
	}
	
	@Override
	public String deleteProduct(int id) {
		productRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("no product present with this id"));
		productRepo.deleteById(id);
		return "product with ID " + id + " deleted successfuly... ";
	}
	
	@Override
	public List<Product> getAllProducts()
	{
		return productRepo.findAll();
	}

	@Override
	public Product updateProduct(Product p) {
		return productRepo.save(p);
	}

	@Override
	public Product getProductDetails(int id) {
		return productRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("product doesn't exist with this id"));
	}
	
}

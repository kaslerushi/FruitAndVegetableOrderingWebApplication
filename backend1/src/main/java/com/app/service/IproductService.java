package com.app.service;

import java.util.List;

import com.app.dto.CategoryMatching;
import com.app.dto.ProductAddValidation;
import com.app.dto.ProductApproval;
import com.app.pojos.Category;
import com.app.pojos.Product;

public interface IproductService {
	Product addProduct(ProductAddValidation p);
	
	String deleteProduct(int id);
	
	Product approveProduct(ProductApproval p,int id);
	
	Product updateProduct(Product p);

	List<Product> getAllProducts();

	Product getProductDetails(int id);
}

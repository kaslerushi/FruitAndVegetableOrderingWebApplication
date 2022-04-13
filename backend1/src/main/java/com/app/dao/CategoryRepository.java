package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.pojos.Category;

public interface CategoryRepository  extends JpaRepository<Category, Integer>{
	boolean existsByVariety(String variety);

	@Query("select count(*) from Category c where c.variety IS null AND c.subCategory=:s")
	int isSubCategoryPresent(@Param("s") String subCategory);
	
	@Query("select c.id from Category c where c.variety=:v")
	int getIdByVariety(@Param("v") String variety);
	
	@Query("select count(*) from Category c where c.variety=:v AND c.subCategory=:s")
	int getByVarietyAndSubCategory(@Param("v") String variety,@Param("s") String subCategory);
	
	@Query("select count(*) from Category c where c.variety IS null AND c.subCategory=:s and c.mainCategory=:m")
	int getBySubCategoryAndMainCategory(@Param("s") String subCategory,@Param("m") String mainCategory);
	
//	@Query("select c.id from Category c where c.variety=:v")
//	Category findCategory();
	
	
	Optional<Category> findByMainCategoryAndSubCategoryAndVariety(String mainCategory,String subCategory,String variety);
//	@Query("select c.id from Category c where c.variety IS NOT null AND (c.variety=:v OR c.subCategory=:s)")
//	int findIdByVarietyAndCategory(@Param("v") String variety,@Param("s") String subCategory);

//	@Query("select c.id,c.default_unit,c.main_category,c.min_buy_price,c.mini_buy_qty,c.sub_category,c.variety from Category c")
//	List<Category> getAllCategories();
}

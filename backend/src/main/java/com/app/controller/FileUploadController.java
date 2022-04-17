package com.app.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.support.MissingServletRequestPartException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.app.custom_exception.FileNotValidException;
import com.app.helper.FileUploadHelper;

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping
@RestController
public class FileUploadController {
	
	@Autowired
	private FileUploadHelper fileUploadHelper;
	
	@PostMapping("/upload-file")
	public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) 
	{
		if(file.isEmpty())
		{
			throw new FileNotValidException("file is empty");
		}
		if(!file.getContentType().equals("image/jpeg") && !file.getContentType().equals("image/png") && !file.getContentType().equals("image/jpg"))
		{
			throw new FileNotValidException("only jpeg or jpg files can be uploaded");
		}
		
	try{
		boolean f=fileUploadHelper.uploadFile(file);
		if(f)
		{
			System.out.println("i am here in try +"+f);
//			return ResponseEntity.ok("file is successfully uploaded");
			return ResponseEntity.ok(ServletUriComponentsBuilder.fromCurrentContextPath().path("/image/").path(file.getOriginalFilename()).toUriString());
			
		}
	}catch(Exception e) {                                
		System.out.println("i am here in catch"+e);
		e.printStackTrace();
		}
		
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("something went wrong");
	}
}

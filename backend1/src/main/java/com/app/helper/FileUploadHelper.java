package com.app.helper;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class FileUploadHelper {

//	public final String UPLOAD_DIR="D:\\rushikesh\\PG_DAC_Sep21\\core_java\\Java EE\\backend1\\src\\main\\resources\\static\\image"; 
	public final String UPLOAD_DIR=new ClassPathResource("/static/image/").getFile().getAbsolutePath(); 

	public FileUploadHelper() throws IOException
	{
	}
	
	public boolean uploadFile(MultipartFile multipartFile) 
	{
		boolean f=false;
		try {
			System.out.println("in helper try");
			Files.copy(multipartFile.getInputStream(),Paths.get(UPLOAD_DIR+File.separator+multipartFile.getOriginalFilename()), StandardCopyOption.REPLACE_EXISTING);
			f=true;
		}catch(Exception e) {
			System.out.println("in helper catch");
			e.printStackTrace();
		}
		return f;
		
	}
}

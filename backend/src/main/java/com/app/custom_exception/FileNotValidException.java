package com.app.custom_exception;

@SuppressWarnings("serial")
public class FileNotValidException extends RuntimeException{
	public FileNotValidException(String message)
	{
		super(message);
	}
}

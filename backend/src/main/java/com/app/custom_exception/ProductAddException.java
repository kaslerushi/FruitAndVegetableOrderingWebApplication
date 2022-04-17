package com.app.custom_exception;
@SuppressWarnings("serial")
public class ProductAddException extends RuntimeException{
	public ProductAddException(String message)
	{
		super(message);
	}
}

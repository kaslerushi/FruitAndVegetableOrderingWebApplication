package com.app.custom_exception;

@SuppressWarnings("serial")
public class DuplicateException extends RuntimeException{
	public DuplicateException(String message)
	{
		super(message);
	}
}

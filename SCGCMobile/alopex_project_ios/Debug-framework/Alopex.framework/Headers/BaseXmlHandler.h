/*
 * Copyright (c) 2012 SK C&C Co., Ltd. All rights reserved.
 *
 * This software is the confidential and proprietary information of SK C&C.
 * You shall not disclose such confidential information and shall use it
 * only in accordance with the terms of the license agreement you entered into
 * with SK C&C.
 */

#import <Foundation/Foundation.h>
@class AlopexManager;

@interface BaseXmlHandler : NSObject {
	id target;
	SEL selector; 
	SEL endSelector; 

	NSString *contentType;
	
	NSString *key;
	NSString *parentKey;
	NSString *value;
}
@property (nonatomic, assign) id target;
@property (nonatomic, assign) SEL selector;
@property (nonatomic, assign) SEL endSelector;

@property (nonatomic, retain) NSString *contentType;

@property (nonatomic, retain) NSString *key;
@property (nonatomic, retain) NSString *parentKey;
@property (nonatomic, retain) NSString *value;

//+(BaseXmlHandler*) create;

-(void)parseXmlFileWithDelegate:(NSString*)path delegate: (id)aDelegate target:(id)aTarget selector:(SEL)aSelector aContentType:(int)aContentType;
-(AlopexManager*) appDelegate;
//-(void)parseXmlDocFileWithDelegate:(NSString*)path delegate: (id)aDelegate target:(id)aTarget selector:(SEL)aSelector;
//
//-(void)parseXmlWithDelegate:(NSString*)urlStr delegate: (id)aDelegate target:(id)aTarget selector:(SEL)aSelector;
//-(void)parseXmlAsyncWithDelegate:(NSString*)urlStr delegate: (id)aDelegate target:(id)aTarget selector:(SEL)aSelector;
//-(void)parseXmlAsyncWithDelegate:(NSString*)urlStr delegate: (id)aDelegate target:(id)aTarget selector:(SEL)aSelector endSelector: (SEL)aEndSelector;
//-(void)parseXmlWithDelegate:(NSString*)urlStr delegate: (id)aDelegate target:(id)aTarget selector:(SEL)aSelector contentType: (NSString *) aContentType;
//-(void)parseXmlAsyncWithDelegate:(NSString*)urlStr delegate: (id)aDelegate target:(id)aTarget selector:(SEL)aSelector  contentType: (NSString *) aContentType;
@end

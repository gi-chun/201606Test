/*
 * Copyright (c) 2012 SK C&C Co., Ltd. All rights reserved.
 *
 * This software is the confidential and proprietary information of SK C&C.
 * You shall not disclose such confidential information and shall use it
 * only in accordance with the terms of the license agreement you entered into
 * with SK C&C.
 */

#import <Foundation/Foundation.h>


@interface InvokedUrlCommand : NSObject {
	NSString* command;
	NSString* className;
	NSString* methodName;
	NSMutableArray* arguments;
	NSMutableDictionary* options;
}

@property(retain) NSMutableArray* arguments;
@property(retain) NSMutableDictionary* options;
@property(copy) NSString* command;
@property(copy) NSString* className;
@property(copy) NSString* methodName;

+(InvokedUrlCommand*)newFromUrl:(NSURL*)url;

-(void)dealloc;

@end
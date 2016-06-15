/*
 * Copyright (c) 2012 SK C&C Co., Ltd. All rights reserved.
 *
 * This software is the confidential and proprietary information of SK C&C.
 * You shall not disclose such confidential information and shall use it
 * only in accordance with the terms of the license agreement you entered into
 * with SK C&C.
 */

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface Database : NSObject

+(Database*)getIncetance;
-(void)commit:(NSString*)dbName target:(id)target successCallback:(NSString*)successCallback errorCallback:(NSString*)errorCallback;
-(void)deleteRow:(NSDictionary*)query;
-(void)execQuery:(NSDictionary*)query;
-(void)insert:(NSDictionary*)query;
-(void)select:(NSString*)dbName query:(NSDictionary*)query target:(id)target successCallback:(NSString*)successCallback errorCallback:(NSString*)errorCallback;
-(void)update:(NSDictionary*)query;

@end

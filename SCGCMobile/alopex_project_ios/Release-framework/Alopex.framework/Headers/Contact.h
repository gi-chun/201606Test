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

@interface Contact : NSObject

+(Contact*)getIncetance;
-(void)add:(NSDictionary*)option target:(id)target successCallback:(NSString*)successCallback errorCallback:(NSString*)errorCallback;
-(void)get:(int)contactId target:(id)target successCallback:(NSString*)successCallback errorCallback:(NSString*)errorCallback;
-(void)remove:(int)contactId target:(id)target successCallback:(NSString*)successCallback errorCallback:(NSString*)errorCallback;
-(void)search:(NSDictionary*)option target:(id)target successCallback:(NSString*)successCallback errorCallback:(NSString*)errorCallback;
-(void)update:(NSDictionary*)contactInfo target:(id)target successCallback:(NSString*)successCallback errorCallback:(NSString*)errorCallback;

@end

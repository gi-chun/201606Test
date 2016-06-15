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
#import <MessageUI/MFMessageComposeViewController.h>
#import <MessageUI/MFMailComposeViewController.h>

@interface Phone : NSObject<MFMessageComposeViewControllerDelegate, MFMailComposeViewControllerDelegate>

+(Phone*)getIncetance;
-(void)call:(NSString*)number;
-(void)sendSMS:(NSDictionary*)sms;
-(void)sendEmail:(NSDictionary*)email;

@end

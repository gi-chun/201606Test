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

@interface PushNotification : NSObject

+(PushNotification*)getIncetance;
-(void)didReceiveRemoteNotification:(NSDictionary*)userInfo;
-(void)deleteAllUnreadNotifications;
-(void)deleteUnreadNotification:(int)notificationId;
-(NSString*)getRegistrationId;
-(NSArray*)getUnreadNotifications;
-(void)useImmediateForegroundNotification:(BOOL)use;

@end

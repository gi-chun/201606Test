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

@interface LocalNotification : NSObject

+(LocalNotification*)getIncetance;
-(void)addNotification:(NSUInteger)notificationId time:(NSMutableDictionary*)time action:(NSMutableDictionary*)action;
-(void)didReceiveLocalNotification:(NSDictionary*)userInfo;
-(void)deleteAllUnreadNotifications;
-(void)deleteUnreadNotification:(int)notificationId;
-(NSArray*)getUnreadNotifications;
-(void)removeNotification:(NSUInteger)notificationId;
-(void)useImmediateForegroundNotification:(BOOL)use;

@end

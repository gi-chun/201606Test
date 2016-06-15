/*
 * Copyright (c) 2012 SK C&C Co., Ltd. All rights reserved.
 *
 * This software is the confidential and proprietary information of SK C&C.
 * You shall not disclose such confidential information and shall use it
 * only in accordance with the terms of the license agreement you entered into
 * with SK C&C.
 */

#import "AbstractJSNI.h"

@interface LocalNotificationJSNI : AbstractJSNI

-(void)addNotification:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)deleteAllUnreadNotifications:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options;
-(void)deleteUnreadNotification:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options;
-(void)getUnreadNotifications:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options;
-(void)removeNotification:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)useImmediateForegroundNotification:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

@end

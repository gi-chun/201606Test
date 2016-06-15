/*
 * Copyright (c) 2012 SK C&C Co., Ltd. All rights reserved.
 *
 * This software is the confidential and proprietary information of SK C&C.
 * You shall not disclose such confidential information and shall use it
 * only in accordance with the terms of the license agreement you entered into
 * with SK C&C.
 */

#import "AbstractJSNI.h"

@interface DeviceSensorJSNI : AbstractJSNI

- (void)startAccelerometerSensor:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
- (void)stopAccelerometerSensor:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
- (void)startCompassSensor:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
- (void)stopCompassSensor:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
- (void)turnOnLight:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
- (void)turnOffLight:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
- (void)vibrate:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

@end

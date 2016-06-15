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

@interface Device : NSObject{
    BOOL _isTablet;
    BOOL _isTV;
    NSString *_platform;
    NSString *_platformName;
    NSString *_deviceId;
    NSString *_osName;
    NSString *_osVersion;
    NSString *_deviceModel;
    NSString *_deviceManufacturer;
    NSString *_mobileEquipmentId;
    NSString *_carrier;
}

@property(nonatomic, assign, readonly) BOOL isTablet;
@property(nonatomic, assign, readonly) BOOL isTV;
@property(nonatomic, retain, readonly) NSString *platform;
@property(nonatomic, retain, readonly) NSString *platformName;
@property(nonatomic, retain, readonly) NSString *deviceId;
@property(nonatomic, retain, readonly) NSString *osName;
@property(nonatomic, retain, readonly) NSString *osVersion;
@property(nonatomic, retain, readonly) NSString *deviceModel;
@property(nonatomic, retain, readonly) NSString *deviceManufacturer;
@property(nonatomic, retain, readonly) NSString *mobileEquipmentId;
@property(nonatomic, retain, readonly) NSString *carrier;

+(Device*)getIncetance;
-(NSString*)getNetworkType;
-(NSString*)getLanguage;

@end

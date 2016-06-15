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
#import "AlopexManager.h"

@interface AlopexUtil : NSObject {
    
}

+ (NSMutableDictionary*) deviceProperties;
+ (BOOL) isTablet;
+ (NSDictionary*)getBundlePlist:(NSString *)plistName;
+ (NSString*)alopexVersion;
+ (NSString*)getMacAddress;
+ (NSString*)getDeviceID;
+ (NSString*)getUUID;
+ (NSString*)getNetworkType;
+ (NSString*)getAppVersion;
+ (NSString*)getURLScheme;
+ (NSString*)getBundleIdentifier;
+ (NSString*)getAppIdentifierPrefix;
+ (NSString*)getPathForResource:(NSString*)resourcepath;
+ (NSString*)getPathForRemoteContent:(NSString*)resourcepath;
+ (NSString*)getRemoteDawnLoadPath;
+ (NSString *)getModel;
+ (NSString*)getCarrier;
+ (BOOL)addSkipBackupAttributeToItemAtURL:(NSURL *)URL;

+(BOOL) isSingletonType;

//기타 유틸들
+ (NSString*)getContentsFromURL:(NSString*)url;
+ (NSArray*)getFileListFromPath:(NSString*)path;
+ (UIColor*)getRGBColorForHex:(NSString*)hexColor;
+ (void)showAlertMessage:(NSString*)message;
+ (NSDictionary*)getAlopex;
+  (BOOL)usePushNotification;

+ (AlopexManager*)appDelegate;

@end

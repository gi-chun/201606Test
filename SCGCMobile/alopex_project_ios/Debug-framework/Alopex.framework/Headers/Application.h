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

@interface Application : NSObject{
    NSString *_appId;
    NSString *_appVersion;
    NSString *_contentVersion;
}

@property(nonatomic, retain, readonly) NSString *appId;
@property(nonatomic, retain, readonly) NSString *appVersion;
@property(nonatomic, retain, readonly) NSString *contentVersion;

+(Application*)getIncetance;
-(void)startApplication:(NSString*)identifier parameters:(NSDictionary*)parameters;
-(void)startAlopexApplication:(NSString*)identifier pageId:(NSString*)pageId parameters:(NSDictionary*)parameters;
-(BOOL)hasApp:(NSString*)appId;
-(void)startWebBrowser:(NSString*)urlStr;
-(BOOL)removeContents;
@end

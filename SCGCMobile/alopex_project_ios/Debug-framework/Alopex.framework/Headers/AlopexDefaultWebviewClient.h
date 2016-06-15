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
#import "InvokedUrlCommand.h"
#import "AlopexUtil.h"

@protocol AlopexWebviewDelegate
-(void)setWebViewClient;
@end

@interface AlopexDefaultWebviewClient:NSObject<UIWebViewDelegate>


-(void)setPreferenceInfo:(UIWebView*)webView;
-(void)setNavigationInfo:(UIWebView*)webView;
-(void)setDeviceInfo:(UIWebView*)webView;
-(BOOL) execute:(UIWebView*)webView command:(InvokedUrlCommand*)command;
-(id)getCommandInstance:(UIWebView*)webView className:(NSString*)className argument:(NSArray*)argument;
-(void)isContentType:(NSURL*)url;
-(void)reloadPreferences:(UIWebView*)webView;

- (NSObject*)getJavascriptDelegatorObject:(UIWebView*)webView className:(NSString*)className;
@end

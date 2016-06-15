/*
 * Copyright (c) 2012 SK C&C Co., Ltd. All rights reserved.
 *
 * This software is the confidential and proprietary information of SK C&C.
 * You shall not disclose such confidential information and shall use it
 * only in accordance with the terms of the license agreement you entered into
 * with SK C&C.
 */

#import <UIKit/UIKit.h>
#import "AbstractScreen.h"

@interface AlopexWebBrowserScreen : AbstractScreen<UIWebViewDelegate, UIAccelerometerDelegate> {
    UIWebView* mWebView; 
 }

@property(nonatomic,retain)UIWebView* mWebView;

-(void)initWebView;
-(void)loadPage:(NSString*)urlString;
-(void)createTabMenuView;
-(void)webViewBack;
-(void)webViewForward;
-(void)webViewReload;
-(void)webViewExit;

@end

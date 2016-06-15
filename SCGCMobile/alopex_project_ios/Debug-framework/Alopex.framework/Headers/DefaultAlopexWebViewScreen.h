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
#import "AlopexWebview.h"
#import "InvokedUrlCommand.h"
#import "JSON.h"
#import "AlopexWebviewClient.h"

@interface DefaultAlopexWebViewScreen : AbstractScreen<UIAccelerometerDelegate , AlopexWebviewDelegate> {
    AlopexWebview *_mWebView;
    UIView *_loadingView;
    NSString *loadImagePath; //webview가 로딩될때까지 보여질 백그라운드 이미지 경로 
    BOOL bPageBackFlag; // 페이지가 back 되서 다시 로드될때 callBack 호출을 위한 flag
    BOOL isRemote;
    BOOL mUseLoadingView; //loadingView class명
	BOOL isUseLoadImage;
	BOOL bLoadImageAutoDismiss; //loadImage를 자동으로 없앨지 여부 true: webview로드 되면 자동으로 없앰 , false: 명시적으로 showWebview  호출해서 없앰
    id loadingViewObj; //loadingViewManager object
    AlopexWebviewClient *_alopexScreenWebviewClient;
}

@property(nonatomic, retain) AlopexWebview *mWebView;
@property(nonatomic, retain) UIView *loadingView;
@property(nonatomic, retain) NSString* loadImagePath;
@property(nonatomic, assign) BOOL isRemote;
@property(nonatomic, assign) BOOL bLoadImageAutoDismiss;
@property(nonatomic, assign) BOOL mUseLoadingView;
@property(nonatomic, retain) id loadingViewObj;
@property(nonatomic, retain) AlopexWebviewClient *alopexScreenWebViewClient;

//AlopexWebView 설정
- (void)initWebView;
- (void)loadPage:(NSString*)urlString;
- (void)callOnScreenBack;

//Loading View 설정
- (void)initLoadingViewManager;
- (void)dismissLoadingView;
//- (void)initbackgroundView;
- (void)initBackResult;
//- (void)loadingTrialVersionBackgroundImage;
- (void)loadBackgreounImage;
- (void)showWebview;
- (void)extensionShowView;

@end


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

@interface AbstractAlopexWebViewContainerScreen : AbstractScreen <AlopexWebviewDelegate>{
    IBOutlet AlopexWebview* mWebView;
    BOOL isRemote;
    NSString* mContainer;
    NSString* mType;
    NSMutableArray *mWebViewStack;
	NSString *loadImagePath; //webview가 로딩될때까지 보여질 백그라운드 이미지 경로 
	//loadImage를 자동으로 없앨지 여부 true: webview로드 되면 자동으로 없앰 , false: 명시적으로 showWebview  호출해서 없앰
	BOOL bLoadImageAutoDismiss;
    BOOL isUseLoadImage;
    BOOL bPageBackFlag; // 페이지가 back 되서 다시 로드될때 callBack 호출을 위한 flag
    BOOL bContentsBackFlag; //contents load 한 후 restore 할 때
    UIView *loadingView;
    AlopexWebviewClient *alopexScreenWebViewClient;
}

@property(nonatomic, retain) IBOutlet AlopexWebview* mWebView;
@property(nonatomic, assign) BOOL isRemote;
@property(nonatomic, retain) NSString* mContainer;
@property(nonatomic, retain) NSString* mType;
@property(nonatomic, retain) NSMutableArray *mWebViewStack;
@property(nonatomic, retain) NSString* loadImagePath;
@property(nonatomic, assign) BOOL bLoadImageAutoDismiss;
@property(nonatomic, assign) BOOL bContentsBackFlag;
@property(nonatomic, retain) UIView* loadingView;
@property(nonatomic, retain) AlopexWebviewClient *alopexScreenWebViewClient;

//AlopexWebView 설정
-(void)initWebView:(AlopexWebview*)previousWebView;
-(void)loadPage:(NSString*)urlString;
-(void)loadContents;
-(void)restoreContents:(NSDictionary*)pageInfo;
-(void)restoreRootContents;
-(void)initBackResult;
-(void)callOnScreenBack;

//Loading View 설정
-(void)loadBackgreounImage;
//- (void)loadingTrialVersionBackgroundImage;
-(void)showWebview;

@end


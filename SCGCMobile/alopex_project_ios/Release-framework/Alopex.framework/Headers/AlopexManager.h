/*
 * Copyright (c) 2012 SK C&C Co., Ltd. All rights reserved.
 *
 * This software is the confidential and proprietary information of SK C&C.
 * You shall not disclose such confidential information and shall use it
 * only in accordance with the terms of the license agreement you entered into
 * with SK C&C.
 */

#import <UIKit/UIKit.h>
#import "AlopexConfigManager.h"
#import "JSONConfigManager.h"
#import "NavigationManager.h"
#import "NSString+SBJSON.h"
#import "NSObject+SBJSON.h"
#import "AlopexDef.h"
#import "Reachability.h"

@class NavigationManager;

@interface AlopexManager: NSObject<UIApplicationDelegate>{
    UIWindow* window;
    AlopexConfigManager *mAlopexConfingInfo;
    NavigationManager *mNavigationManager;
    JSONConfigManager *mJSONConfigManager;
    NSMutableDictionary *mParameters;
    NSMutableDictionary *mPageBackResultParams;
    NSMutableDictionary *mDelegateObjects; //딜리게이트 객체저장
	NSMutableDictionary *mTempPreference; //어플리케이션 실행중일때에만 사용하는 Preference
	NSMutableDictionary *mRemoteContentProperties; //리모트 컨텐트 관련 remote_content.properties 파싱 정보 저장
    
    NSDictionary *notification; //notification data 저장
    NSString *registrationId; //push_properties 파싱 정보 저장
    
    //app생성주기에 호출될 콜백들
    NSString* mAppPauseCallback;
    NSString* mAppResumeCallback;
    NSString* mAppFinishCallback;
    
    //screen touch event callback
    NSString* mScreenTouchCallback;
    NSString* sslHostName;
    
    NSURL* hasHandleOpenURL; //url scheme 으로 앱이 호출된 경우 url 정보를 여기에 저장(리모트 콘텐츠 다운로드가 끝나고 url scheme을 실행하기 위해)
    
    BOOL keyboardShown;    //키보드가 올라와 있는 상태인지
	BOOL useRemoteContent; //현재 리모트 컨텐츠를 사용 하는지
    BOOL useOnTheFly;      //on the fly 기능 사용 하는지
    BOOL isApplicationWillEnterForeground; //Application을 Resume했는지 상태 저장

    Reachability *reachability;
    
    //deprecated
    UIWebView* mCurrentWebview;
}

@property(nonatomic, retain) UIWindow *window;
@property(nonatomic, retain) AlopexConfigManager *mAlopexConfingInfo;
@property(nonatomic, retain) NavigationManager *mNavigationManager;
@property(nonatomic, retain) JSONConfigManager *mJSONConfigManager;
@property(nonatomic, assign) UIWebView* mCurrentWebview;//deprecated
@property(nonatomic, retain) NSMutableDictionary* mParameters;
@property(nonatomic, retain) NSMutableDictionary* mPageBackResultParams;
@property(nonatomic, retain) NSMutableDictionary* mDelegateObjects;
@property(nonatomic, retain) NSMutableDictionary* mTempPreference;
@property(nonatomic, retain) NSMutableDictionary* mRemoteContentProperties;
@property(nonatomic, retain) NSDictionary *notification;
@property(nonatomic, retain) NSString* registrationId;
@property(nonatomic, retain) NSString* mAppPauseCallback;
@property(nonatomic, retain) NSString* mAppResumeCallback;
@property(nonatomic, retain) NSString* mAppFinishCallback;
@property(nonatomic, retain) NSString* mScreenTouchCallback;
@property(nonatomic, retain) NSString* sslHostName;
@property(nonatomic, retain) NSURL* hasHandleOpenURL;
@property(nonatomic, assign) BOOL keyboardShown;
@property(nonatomic, assign) BOOL useRemoteContent;
@property(nonatomic, assign) BOOL useOnTheFly;
@property(nonatomic, assign) BOOL isApplicationWillEnterForeground;

-(void)alopexInit;
-(void)loadConfigManager;
-(void)loadPluginManager;
-(void)loadFirstPage;
-(void)windowInit;
-(void)setAppVersion;
-(void)applicationWillEnterForegroundCallback;

- (NSObject*)getDelegatorObject:(NSString*)className;
- (NSObject*)getDelegatorObject:(NSString*)className webview:(UIWebView*)webView;

- (NSString*)getAREK;

@end

	
/*
 * Copyright (c) 2012 SK C&C Co., Ltd. All rights reserved.
 *
 * This software is the confidential and proprietary information of SK C&C.
 * You shall not disclose such confidential information and shall use it
 * only in accordance with the terms of the license agreement you entered into
 * with SK C&C.
 */

#import <UIKit/UIKit.h>
#import "AlopexUtil.h"
#import "EventListenerJSNI.h"

@interface AbstractScreen : UIViewController{
	NSString* mUri;
	NSString* mPageID; //현재 로딩되어 있는 웹페이지의 아이디 
	NSString* mChangeOrientation;
	NSString* mOrientation; //View Rotate
	BOOL isSkip;
    NSMutableDictionary* mParams; //이전페이지에서 전달받은 데이타 저장
    NSMutableDictionary* mResultParams;// 
    
    //View Rotate
    BOOL isOrientation;
    BOOL isPortrait;
    BOOL isReversePortrait;
    BOOL isLandscape;
    BOOL isReverseLandscape;
    BOOL isSupportedAllOrientation;
    UIInterfaceOrientation deviceOrientation;
    id eventListener;
}

@property(nonatomic, retain)NSString* mUri;
@property(nonatomic, retain)NSString* mPageID;
@property(nonatomic, retain)NSString* mChangeOrientation;
@property(nonatomic, retain)NSString* mOrientation; //View Rotate
@property(nonatomic, assign)BOOL isSkip;
@property(nonatomic, retain)NSMutableDictionary* mParams;
@property(nonatomic, retain)NSMutableDictionary* mResultParams;
@property(nonatomic, assign)BOOL isOrientation; //View Rotate
@property(nonatomic, retain) id eventListener;


- (void)initPageOrientation; //View Rotate
- (void)keyboardDidShow;
- (void)keyboardDidHide;
@end

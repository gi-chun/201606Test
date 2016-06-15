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

@interface NavigationManager : NSObject {
    UINavigationController* mNavController;
    BOOL isPopState;
}

@property(nonatomic, retain)UINavigationController* mNavController;
@property(nonatomic, assign)BOOL isPopState;

+ (id)getInstance;
+ (void)deGenerate;

//navigation
-(void)navigate:(NSDictionary *)pageInfo;
-(void)goHome;
-(void)back:(NSDictionary*)rtnValue;
-(void)backTo:(NSDictionary *)pageInfo;
-(void)backToOrNavigate:(NSDictionary *)pageInfo;
-(void)startPage;
-(void)dismissLoadImage;
-(void)dismissLoadingView;
-(UIViewController*)createScreen:(NSString*)pageID pageInfo:(NSDictionary*)pageInfo;
-(UIViewController*)getScreen:(NSString*)screenID;

//기타 유틸성
-(void)printNavigationHistory:(NSString*)method;
-(void)cancelAllhttpRequest;


@end

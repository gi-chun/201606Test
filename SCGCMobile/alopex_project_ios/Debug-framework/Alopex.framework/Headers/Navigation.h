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

@interface Navigation : NSObject{}

+(Navigation*)getIncetance;
-(void)back:(NSDictionary*)result;
-(void)backTo:(NSDictionary*)pageInfo;
-(void)backToOrNavigate:(NSDictionary*)pageInfo;
-(void)dismissLoadImage;
-(void)dismissLoadingView;
-(void)exit;
-(void)goHome;
-(void)navigate:(NSDictionary*)pageInfo;

@end

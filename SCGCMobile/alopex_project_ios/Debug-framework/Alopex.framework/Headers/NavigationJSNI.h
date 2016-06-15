/*
 * Copyright (c) 2012 SK C&C Co., Ltd. All rights reserved.
 *
 * This software is the confidential and proprietary information of SK C&C.
 * You shall not disclose such confidential information and shall use it
 * only in accordance with the terms of the license agreement you entered into
 * with SK C&C.
 */

#import "AbstractJSNI.h"

@interface NavigationJSNI : AbstractJSNI

#pragma mark - Navigation functions
-(void)back:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)backTo:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)backToOrNavigate:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)dismissLoadImage:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)dismissLoadingView:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)exit:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)goHome:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)navigate:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

@end

/*
 * Copyright (c) 2012 SK C&C Co., Ltd. All rights reserved.
 *
 * This software is the confidential and proprietary information of SK C&C.
 * You shall not disclose such confidential information and shall use it
 * only in accordance with the terms of the license agreement you entered into
 * with SK C&C.
 */

#import "AbstractJSNI.h"

@interface ApplicationJSNI : AbstractJSNI

-(void)startApplication:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)startAlopexApplication:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)hasApp:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)startWebBrowser:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)removeContents:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
@end

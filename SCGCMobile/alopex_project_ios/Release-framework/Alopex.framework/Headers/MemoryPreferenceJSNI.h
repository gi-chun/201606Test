/*
 * Copyright (c) 2012 SK C&C Co., Ltd. All rights reserved.
 *
 * This software is the confidential and proprietary information of SK C&C.
 * You shall not disclose such confidential information and shall use it
 * only in accordance with the terms of the license agreement you entered into
 * with SK C&C.
 */

#import "AbstractJSNI.h"

@interface MemoryPreferenceJSNI : AbstractJSNI

-(void)initPreferences:(NSMutableArray*)argumentsm withDict:(NSMutableDictionary*)options;
-(void)put:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)remove:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)removeAll:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

@end

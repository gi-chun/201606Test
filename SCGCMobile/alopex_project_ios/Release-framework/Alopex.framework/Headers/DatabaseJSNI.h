/*
 * Copyright (c) 2012 SK C&C Co., Ltd. All rights reserved.
 *
 * This software is the confidential and proprietary information of SK C&C.
 * You shall not disclose such confidential information and shall use it
 * only in accordance with the terms of the license agreement you entered into
 * with SK C&C.
 */

#import "AbstractJSNI.h"

@interface DatabaseJSNI : AbstractJSNI

-(void)commit:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)commitSuccessCallback:(NSArray*)result;
-(void)commitErrorCallback:(NSString*)errorMsg;
-(void)deleteRow:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)execQuery:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)insert:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)select:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)selectSuccessCallback:(NSArray*)result;
-(void)selectErrorCallback:(NSString*)errorMsg;
-(void)update:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

@end

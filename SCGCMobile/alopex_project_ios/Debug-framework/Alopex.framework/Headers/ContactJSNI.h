/*
 * Copyright (c) 2012 SK C&C Co., Ltd. All rights reserved.
 *
 * This software is the confidential and proprietary information of SK C&C.
 * You shall not disclose such confidential information and shall use it
 * only in accordance with the terms of the license agreement you entered into
 * with SK C&C.
 */

#import "AbstractJSNI.h"

@interface ContactJSNI : AbstractJSNI

-(void)add:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)addSuccessCallback;
-(void)addErrorCallback;
-(void)get:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)getSuccessCallback:(NSDictionary*)resultItem;
-(void)getErrorCallback:(NSString*)errorMsg;
-(void)remove:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)removeSuccessCallback;
-(void)removeErrorCallback:(NSString*)errorMsg;
-(void)search:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)searchSuccessCallback:(NSArray*)resultItems;
-(void)searchErrorCallback:(NSString*)errorMsg;
-(void)update:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)updateSuccessCallback;
-(void)updateErrorCallback:(NSString*)errorMsg;

@end

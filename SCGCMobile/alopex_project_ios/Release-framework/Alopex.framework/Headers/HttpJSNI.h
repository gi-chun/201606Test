/*
 * Copyright (c) 2012 SK C&C Co., Ltd. All rights reserved.
 *
 * This software is the confidential and proprietary information of SK C&C.
 * You shall not disclose such confidential information and shall use it
 * only in accordance with the terms of the license agreement you entered into
 * with SK C&C.
 */

#import "AbstractJSNI.h"

@interface HttpJSNI : AbstractJSNI

//initialize & deGenerate
+(id)initialize:(UIWebView*)webView arguments:(NSArray*)arguments;
+(void)deGenerate;

-(void)setTimeout:(NSMutableArray*) arguments withDict:(NSMutableDictionary*)options;
-(void)setRequestHeader:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

//request
-(void)request:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)upload:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)download:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

//request cancel
-(void)cancelRequest:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)cancelUpload:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)cancelDownload:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

+(void)cancelAllRequest;
@end

/*
 * Copyright (c) 2012 SK C&C Co., Ltd. All rights reserved.
 *
 * This software is the confidential and proprietary information of SK C&C.
 * You shall not disclose such confidential information and shall use it
 * only in accordance with the terms of the license agreement you entered into
 * with SK C&C.
 */

#import "AbstractJSNI.h"

@interface FileManagerJSNI : AbstractJSNI

-(void)copy:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)createNewFile:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)deleteFile:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)exists:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)getStoragePath:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)isDirectory:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)mkdirs:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)move:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)rename:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

@end


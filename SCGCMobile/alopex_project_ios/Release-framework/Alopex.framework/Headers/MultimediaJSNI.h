/*
 * Copyright (c) 2012 SK C&C Co., Ltd. All rights reserved.
 *
 * This software is the confidential and proprietary information of SK C&C.
 * You shall not disclose such confidential information and shall use it
 * only in accordance with the terms of the license agreement you entered into
 * with SK C&C.
 */

#import "AbstractJSNI.h"

@interface MultimediaJSNI : AbstractJSNI

-(void)deleteImage:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)getImageOrientation:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)getPicture:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)resizePicture:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)rotateImage:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)saveImage:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)takePicture:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

@end

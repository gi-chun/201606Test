/*
 * Copyright (c) 2012 SK C&C Co., Ltd. All rights reserved.
 *
 * This software is the confidential and proprietary information of SK C&C.
 * You shall not disclose such confidential information and shall use it
 * only in accordance with the terms of the license agreement you entered into
 * with SK C&C.
 */

#import <Foundation/Foundation.h>

#define DEBUG_ZIP 0

@interface ZipHandler : NSObject {

}

+(ZipHandler*) create;

-(void) unzip: (NSString*)aFilePath path: (NSString*)aPath;

-(void) unzipInCurrentPath: (NSString*)aFilePath;

-(void) unzipInCurrentPathWithDir: (NSString*)aFilePath;

@end

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

@interface FileManager : NSObject

+(FileManager*)getIncetance;
-(BOOL)copy:(NSString*)fromPath to:(NSString*)toPath;
-(BOOL)createNewFile:(NSString*)filePath;
-(BOOL)deleteFile:(NSString*)path;
-(BOOL)exists:(NSString*)dirPath;
-(NSString*)getStoragePath;
-(BOOL)isDirectory:(NSString*)dirPath;
-(BOOL)mkdirs:(NSString*)dirPath;
-(BOOL)move:(NSString*)fromPath to:(NSString*)toPath;
-(BOOL)rename:(NSString*)path name:(NSString*)name;

@end

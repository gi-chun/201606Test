/*
 * Copyright (c) 2012 SK C&C Co., Ltd. All rights reserved.
 *
 * This software is the confidential and proprietary information of SK C&C.
 * You shall not disclose such confidential information and shall use it
 * only in accordance with the terms of the license agreement you entered into
 * with SK C&C.
 */

#import <Foundation/Foundation.h>

@interface PluginManager : NSObject{
    NSMutableArray *propertiesFileList;     //properties file list
    NSMutableArray *propertiesInfoList;     //properties info array List
}

@property(nonatomic, retain) NSMutableArray *propertiesFileList;
@property(nonatomic, retain) NSMutableArray *propertiesInfoList;

//start plugin
- (void)start;
- (void)runPluginClass;
- (void)runRemoteContent;
- (void)runSimulatorApplicationManager:(NSMutableDictionary*)properties;

//property 설정
- (void)setPropertiesFileList;
- (void)setPropertiesList;
@end

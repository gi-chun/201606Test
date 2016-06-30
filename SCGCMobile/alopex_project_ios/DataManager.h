//
//  DataManager.h
//  pushTest
//
//  Created by komj on 2015. 3. 12..
//  Copyright (c) 2015년 H2OSystech. All rights reserved.
//

#ifndef pushTest_DataManager_h
#define pushTest_DataManager_h

#import <Foundation/Foundation.h>

@interface DataManager : NSObject
{
    NSString *deviceUUID;
}


+ (DataManager*) sharedPCDataManager;

@property (retain, nonatomic) NSString *deviceUUID;

@end
#endif

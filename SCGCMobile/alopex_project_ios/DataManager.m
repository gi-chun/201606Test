//
//  DataManager.m
//  pushTest
//
//  Created by komj on 2015. 3. 12..
//  Copyright (c) 2015년 H2OSystech. All rights reserved.
//

#import "DataManager.h"

@implementation DataManager

@synthesize deviceUUID;

static DataManager* sharedH2ODataManager = nil;

+ (DataManager*) sharedPCDataManager
{
    if (sharedH2ODataManager == nil)
    {
        @synchronized(self) {
            sharedH2ODataManager = [[DataManager alloc] init];
        }
    }
    
    return sharedH2ODataManager;
}

@end
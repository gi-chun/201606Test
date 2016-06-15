/*
 * Copyright (c) 2012 SK C&C Co., Ltd. All rights reserved.
 *
 * This software is the confidential and proprietary information of SK C&C.
 * You shall not disclose such confidential information and shall use it
 * only in accordance with the terms of the license agreement you entered into
 * with SK C&C.
 */

#import <Foundation/Foundation.h>
#import "AlopexCommand.h"

@interface Alopex : AlopexCommand {
    
}

-(void)dismissLoadImage:(NSMutableArray*)arguments
               withDict:(NSMutableDictionary*)options;

-(void)dismissLoadingView:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

-(void)setOnPause:(NSMutableArray*)arguments
         withDict:(NSMutableDictionary*)options;

-(void)setOnResume:(NSMutableArray*)arguments
          withDict:(NSMutableDictionary*)options;

-(void)setOnFinish:(NSMutableArray*)arguments
          withDict:(NSMutableDictionary*)options;

-(void)setOnScreenTouch:(NSMutableArray*)arguments
               withDict:(NSMutableDictionary*)options;

@end

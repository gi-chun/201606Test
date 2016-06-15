//
//  AlopexNativeScreen.h
//  alopex_runtime_iphone_lib
//
//  Created by alopex on 11. 10. 13..
//  Copyright 2011 __MyCompanyName__. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "AbstractScreen.h"
#import "AlopexUtil.h"

@interface AlopexNativeScreen :AbstractScreen


-(void)navigate:(NSDictionary *)pageInfo;
-(void)back:(NSDictionary*)rtnValue;
-(void)backTo:(NSDictionary*)pageInfo;
-(void)goHome;

-(NSString *)getMemoryPreference:(NSString *)key;
-(void)setMemoryPreference:(NSString*)key value:(NSString*)value;
-(BOOL)retainMemoryPreference:(NSString*)key;
-(void)removeMemoryPreference:(NSString*)key;
-(void)removeAllMemoryPreference;
-(NSObject*)getDelegatorInstance:(NSString*)delegateName;

-(AlopexManager *)appDelegate;

@end

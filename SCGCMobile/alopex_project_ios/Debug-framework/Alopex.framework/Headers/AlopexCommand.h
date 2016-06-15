//
//  AlopexCommand.h
//  AlopexCommand
//
//  Created by Michael Nachbaur on 13/04/09.
//  Copyright 2009 Decaf Ninja Software. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "AbstractJSNI.h"
#import "AlopexManager.h"

@interface AlopexCommand : AbstractJSNI {
}

-(AlopexManager*) appDelegate;
-(NSString *)getMemoryPreference:(NSString *)key;
-(void)setMemoryPreference:(NSString*)key value:(NSString*)value;
-(BOOL)retainMemoryPreference:(NSString*)key;
-(void)removeMemoryPreference:(NSString*)key;
-(void)removeAllMemoryPreference;
-(NSObject*)getDelegatorInstance:(NSString*)delegateName;
@end

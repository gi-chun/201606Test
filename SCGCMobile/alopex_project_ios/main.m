//
//  main.m
//  alopex_iphone
//
//  Created by alopex alopex on 11. 11. 7..
//  Copyright (c) 2011년 __MyCompanyName__. All rights reserved.
//

#import <UIKit/UIKit.h>

#import "AlopexAppDelegate.h"

int main(int argc, char *argv[])
{
    NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];
    int retVal = UIApplicationMain(argc, argv, nil, @"AlopexAppDelegate");
    [pool release];
    return retVal;
}

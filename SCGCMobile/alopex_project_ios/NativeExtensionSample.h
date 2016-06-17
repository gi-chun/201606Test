//
//  NativeExtensionSample.h
//  SCGCMobile_ios
//
//  Created by gclee on 2016. 6. 17..
//
//

#import <Foundation/Foundation.h>
#import <Alopex/AbstractJSNI.h>

@interface NativeExtensionSample : AbstractJSNI

 -(void) sampleFunction:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

@end

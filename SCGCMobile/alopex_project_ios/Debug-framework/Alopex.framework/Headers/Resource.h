//
//  Resource.h
//  alopex_runtime_iphone_lib
//
//  Created by 상준 윤 on 12. 7. 3..
//  Copyright (c) 2012년 ysj188cm@gmail.com. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "AbstractJSNI.h"
@interface Resource : AbstractJSNI{
    NSString *_successCallback;
    NSString *_errorCallback;
    BOOL workingState;
    NSThread *_mThread;
}
@property (nonatomic, retain) NSString *successCallback;
@property (nonatomic, retain) NSString *errorCallback;
@property (nonatomic, assign) BOOL workingState;
@property (nonatomic, assign) NSThread *mThread;

-(void)getContent:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)getContentInBackground:(NSString*)pageUri;
-(void)contentDidFinishLoading:(NSString*)encodingContent;
-(void)cancelGetContent:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void)getPageUri:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

@end

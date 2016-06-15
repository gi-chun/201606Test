//
//  SocialSharing.h
//  alopex_project_ios
//
//  Created by ys jung on 2015. 5. 14..
//
//

#import <Foundation/Foundation.h>
#import <Alopex/AbstractJSNI.h>

@interface SocialSharing : AbstractJSNI<UIWebViewDelegate>

- (void)share:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

@end

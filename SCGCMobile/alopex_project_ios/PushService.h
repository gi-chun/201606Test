//
//  AbstractJSNI_PushService.h
//  alopex_project_ios
//
//  Created by YOUNG SUN JUNG on 2015. 6. 16..
//
//


#import <Foundation/Foundation.h>
#import <Alopex/AbstractJSNI.h>

@interface PushService : AbstractJSNI{
}

@property (nonatomic, copy) NSString *callbackId;

- (void)isPush:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
- (void)getPushToken:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
- (void)usePushService:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

- (void)didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken;
- (void)didFailToRegisterForRemoteNotificationsWithError:(NSError *)error;

@end

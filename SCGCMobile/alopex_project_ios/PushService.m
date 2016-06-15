//
//  PushService.m
//  alopex_project_ios
//
//  Created by YOUNG SUN JUNG on 2015. 6. 16..
//
//

#import "PushService.h"
#import <Alopex/AbstractJSNI.h>

@implementation PushService

@synthesize callbackId;

// push 사용중인지 체크
-(void)isPush:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options{
    //NSString  *param1 = [arguments objectAtIndex:0];
   // NSString  *param2 = [arguments objectAtIndex:1];
   // NSString  *param3 = [arguments objectAtIndex:2];
    NSString  *successCallback = [arguments objectAtIndex:0];

//    BOOL enabled = NO;
//    UIUserNotificationSettings *notificationSettings = [SharedApplication currentUserNotificationSettings];
//    enabled = notificationSettings.types < 4;
    
#ifdef __IPHONE_8_0
    
    BOOL status = [[UIApplication sharedApplication] isRegisteredForRemoteNotifications];
    
    if (!status)
    {
        NSLog(@"User doesn't want to receive push-notifications: no");
        
        NSString *callBackString = @"('no');";
        NSString *message = [successCallback stringByAppendingString:callBackString];
        [self.webView stringByEvaluatingJavaScriptFromString:message];
        
        return;
    }
 #else
    UIRemoteNotificationType status = [[UIApplication sharedApplication] enabledRemoteNotificationTypes];
    if (status == UIRemoteNotificationTypeNone)
    {
        NSLog(@"User doesn't want to receive push-notifications: no");
        
        NSString *callBackString = @"('no');";
        NSString *message = [successCallback stringByAppendingString:callBackString];
        [self.webView stringByEvaluatingJavaScriptFromString:message];
        
        return;
    }
#endif
    
    
    
    
//    return NO;

    
    NSString *callBackString = @"('ok');";
    NSString *message = [successCallback stringByAppendingString:callBackString];
    [self.webView stringByEvaluatingJavaScriptFromString:message];
}

// push token 받아오기
-(void)getPushToken:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options{
    NSString  *successCallback = [arguments objectAtIndex:0];
    callbackId = successCallback;
    
//#ifdef __IPHONE_8_0
    //Right, that is the point
 //   UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:(UIRemoteNotificationTypeBadge
//                                                                                         |UIRemoteNotificationTypeSound
//                                                                                         |UIRemoteNotificationTypeAlert) categories:nil];
//    [[UIApplication sharedApplication] registerUserNotificationSettings:settings];
//#else
    //register to receive notifications
//    UIRemoteNotificationType myTypes = UIRemoteNotificationTypeBadge | UIRemoteNotificationTypeAlert | UIRemoteNotificationTypeSound;
//    [[UIApplication sharedApplication] registerForRemoteNotificationTypes:myTypes];
//#endif
    
    
#ifdef __IPHONE_8_0
    // For iOS 8:
    UIUserNotificationSettings *settings =
    [UIUserNotificationSettings settingsForTypes:UIUserNotificationTypeAlert |
     UIUserNotificationTypeBadge |
     UIUserNotificationTypeSound categories:nil];
    [[UIApplication sharedApplication] registerUserNotificationSettings:settings];
    [[UIApplication sharedApplication] registerForRemoteNotifications];
#else
    // Before iOS 8:
    [[UIApplication sharedApplication] registerForRemoteNotificationTypes:UIRemoteNotificationTypeAlert |
     UIRemoteNotificationTypeBadge |
     UIRemoteNotificationTypeSound];
 #endif
    
//////////////////////////

//////////////////////////
    
    
  //  NSString *callBackString = @"('ok');";
  //  NSString *message = [successCallback stringByAppendingString:callBackString];
  //  [self.webView stringByEvaluatingJavaScriptFromString:message];
}

// push 사용 설정
-(void)usePushService:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options{
    //NSString  *param1 = [arguments objectAtIndex:0];
   // NSString  *param2 = [arguments objectAtIndex:1];
   // NSString  *param3 = [arguments objectAtIndex:2];
    NSString  *successCallback = [arguments objectAtIndex:0];
   
    
//#if __IPHONE_OS_VERSION_MAX_ALLOWED >= 80000
//    UIUserNotificationType UserNotificationTypes = UIUserNotificationTypeNone;
//#endif
//    UIRemoteNotificationType notificationTypes = UIRemoteNotificationTypeNone;
//    
//    
//    notificationTypes |= UIRemoteNotificationTypeNewsstandContentAvailability;
//#if __IPHONE_OS_VERSION_MAX_ALLOWED >= 80000
//    UserNotificationTypes |= UIUserNotificationActivationModeBackground;
//#endif
//    
//    
//#if __IPHONE_OS_VERSION_MAX_ALLOWED >= 80000
//    if ([[UIApplication sharedApplication]respondsToSelector:@selector(registerUserNotificationSettings:)]) {
//        UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:UserNotificationTypes categories:nil];
//        [[UIApplication sharedApplication] registerUserNotificationSettings:settings];
//        [[UIApplication sharedApplication] registerForRemoteNotifications];
//    } else {
//        [[UIApplication sharedApplication] registerForRemoteNotificationTypes:notificationTypes];
//    }
//#else
//    [[UIApplication sharedApplication] registerForRemoteNotificationTypes:notificationTypes];
//#endif

#ifdef __IPHONE_8_0
    if ([[UIApplication sharedApplication] respondsToSelector:@selector(registerUserNotificationSettings:)]) {
        UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:UIUserNotificationTypeBadge|UIUserNotificationTypeSound|UIUserNotificationTypeAlert categories:nil];
        [[UIApplication sharedApplication] registerUserNotificationSettings:settings];
    }  else {
        UIRemoteNotificationType myTypes = UIRemoteNotificationTypeBadge | UIRemoteNotificationTypeAlert | UIRemoteNotificationTypeSound;
        [[UIApplication sharedApplication] registerForRemoteNotificationTypes:myTypes];
    }
#else
    
    UIRemoteNotificationType myTypes = UIRemoteNotificationTypeBadge | UIRemoteNotificationTypeAlert | UIRemoteNotificationTypeSound;
    [[UIApplication sharedApplication] registerForRemoteNotificationTypes:myTypes];
    
#endif
    
    // callback 함수 호출
    NSString *callBackString = @"('ok');";
    NSString *message = [successCallback stringByAppendingString:callBackString];
    [self.webView stringByEvaluatingJavaScriptFromString:message];
}

- (void)didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    
    NSMutableDictionary *results = [NSMutableDictionary dictionary];
    NSString *token = [[[[deviceToken description] stringByReplacingOccurrencesOfString:@"<"withString:@""]
                        stringByReplacingOccurrencesOfString:@">" withString:@""]
                       stringByReplacingOccurrencesOfString: @" " withString: @""];
    [results setValue:token forKey:@"deviceToken"];
    
#if !TARGET_IPHONE_SIMULATOR
    // Get Bundle Info for Remote Registration (handy if you have more than one app)
    [results setValue:[[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleDisplayName"] forKey:@"appName"];
    [results setValue:[[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleVersion"] forKey:@"appVersion"];
    
    // Check what Notifications the user has turned on.  We registered for all three, but they may have manually disabled some or all of them.
    NSUInteger rntypes = [[UIApplication sharedApplication] enabledRemoteNotificationTypes];
    
    // Set the defaults to disabled unless we find otherwise...
    NSString *pushBadge = @"disabled";
    NSString *pushAlert = @"disabled";
    NSString *pushSound = @"disabled";
    
    // Check what Registered Types are turned on. This is a bit tricky since if two are enabled, and one is off, it will return a number 2... not telling you which
    // one is actually disabled. So we are literally checking to see if rnTypes matches what is turned on, instead of by number. The "tricky" part is that the
    // single notification types will only match if they are the ONLY one enabled.  Likewise, when we are checking for a pair of notifications, it will only be
    // true if those two notifications are on.  This is why the code is written this way
    if(rntypes & UIRemoteNotificationTypeBadge){
        pushBadge = @"enabled";
    }
    if(rntypes & UIRemoteNotificationTypeAlert) {
        pushAlert = @"enabled";
    }
    if(rntypes & UIRemoteNotificationTypeSound) {
        pushSound = @"enabled";
    }
    
    [results setValue:pushBadge forKey:@"pushBadge"];
    [results setValue:pushAlert forKey:@"pushAlert"];
    [results setValue:pushSound forKey:@"pushSound"];
    
    // Get the users Device Model, Display Name, Token & Version Number
    UIDevice *dev = [UIDevice currentDevice];
    [results setValue:dev.name forKey:@"deviceName"];
    [results setValue:dev.model forKey:@"deviceModel"];
    [results setValue:dev.systemVersion forKey:@"deviceSystemVersion"];
    
    //[self successWithMessage:[NSString stringWithFormat:@"%@", token]];
    
  //  NSString *callBackString = @"('ok');";
  //  NSString *callBackString = [stringWithFormat:@"%@", token];
    NSString *message = [callbackId stringByAppendingString:token];
    //  [self.webView stringByEvaluatingJavaScriptFromString:message];
    
    
    [self.webView stringByEvaluatingJavaScriptFromString:token];
#endif
}

- (void)didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
   // [self failWithMessage:@"" withError:error];
    NSString *callBackString = @"('error');";
    NSString *message = [callbackId stringByAppendingString:callBackString];
    [self.webView stringByEvaluatingJavaScriptFromString:message];

}

@end

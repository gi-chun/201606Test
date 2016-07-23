#import "AlopexAppDelegate.h"
#import "DataManager.h"
#import <Alopex/Navigation.h>
#include "erbapi.h"

@implementation AlopexAppDelegate

NSString *pushServerIp_App = @"168.154.182.41";

- (id) init {
    return [super init];
}


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    [super application:application didFinishLaunchingWithOptions:launchOptions];
    
    if ([[[UIDevice currentDevice]systemVersion]floatValue]>=8.0)
    {
        [[UIApplication sharedApplication] registerUserNotificationSettings:[UIUserNotificationSettings settingsForTypes:(UIUserNotificationTypeSound | UIUserNotificationTypeAlert | UIUserNotificationTypeBadge) categories:nil]];
        [[UIApplication sharedApplication] registerForRemoteNotifications];
    }
    else
    {
        [[UIApplication sharedApplication] registerForRemoteNotificationTypes:(UIRemoteNotificationTypeAlert | UIRemoteNotificationTypeBadge | UIRemoteNotificationTypeSound)];
    }
    
    NSHTTPCookieStorage *cookieStorage = [NSHTTPCookieStorage sharedHTTPCookieStorage];
    [cookieStorage setCookieAcceptPolicy:NSHTTPCookieAcceptPolicyAlways];
    
    //Create the background
    [[UIApplication sharedApplication] setStatusBarStyle:UIStatusBarStyleBlackOpaque];
    UIView* statusBg = [[UIView alloc] initWithFrame:[[UIApplication sharedApplication] statusBarFrame]];
    statusBg.backgroundColor = [UIColor blackColor];
    
    //Add the view behind the status bar
    [self.window.rootViewController.view addSubview:statusBg];
    
    if (launchOptions){
        NSDictionary *userInfo = [launchOptions objectForKey:UIApplicationLaunchOptionsRemoteNotificationKey];
        if (userInfo != nil) {
            NSLog(@"%@", userInfo);
        }
        [self receiveRemoteNotification:launchOptions withAppState:NO];
    }
    
    return  YES;
    
}

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error{
    NSLog(@"Fail - Error : %@", error);
}

// 수정 이후(7.0버전 이후) 코드 부분 (didReceiveRemoteNotification함수)
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
    NSLog(@"APNS Recv");
    
    NSDictionary *aps = [userInfo objectForKey:@"aps"];
    
    NSString *alert = [aps objectForKey:@"alert"];
    NSString *pushHeader = [aps objectForKey:@"header"];
    
    //////////////////////////////
    NSLog(@"Remote Notification: %@", [userInfo description]);
    NSDictionary *apsInfo = [userInfo objectForKey:@"aps"];
    
    if(application.applicationState == UIApplicationStateActive)
    {
//        UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:NSLocalizedString(@"Did receive a Remote Notification", nil) message:[apsInfo objectForKey:@"alert"] delegate:self cancelButtonTitle:NSLocalizedString(@"OK", nil) otherButtonTitles:nil];
//        
//        [alertView show];
        [self receiveRemoteNotification:userInfo withAppState:YES];
    }
    else{
        NSString *alert = [apsInfo objectForKey:@"alert"];
        NSLog(@"Received Push Alert : %@", alert);
        
        NSString *badge = [apsInfo objectForKey:@"badge"];
        NSLog(@"Received Push badge : %@", badge);
        
        NSString *sound = [apsInfo objectForKey:@"sound"];
        NSLog(@"Received Push sound : %@", sound);
        
        NSLog(@"userinfo: %@", userInfo);
        
    }
    
    //application.applicationIconBadgeNumber = [[apsInfo objectForKey:@"badge"] integerValue];
    
}

// 수정 이전(7.0버전 이전) 코드 부분 (didReceiveRemoteNotification함수)
//- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
//{
//    NSLog(@"APNS Recv");
//    [self receiveRemoteNotification:userInfo withAppState:YES];
//    
//}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
    //NSLog(@"didRegisterForRemoteNotificationsWithDeviceToken");
    NSMutableString *deviceId = [NSMutableString string];
    const unsigned char* ptr = (const unsigned char*)[deviceToken bytes];
    
    for(int i=0; i < 32; i++)
    {
        [deviceId appendFormat:@"%02x",ptr[i]];
    }
    
    self.pushTokenID = [NSString stringWithString:deviceId];
    [[NSNotificationCenter defaultCenter] postNotificationName:@"notifyPushTokenCreated" object:nil];
    
    _dataManager.deviceUUID = deviceId;
    
    [[NSUserDefaults standardUserDefaults] setObject:deviceId forKey:@"pushToken"];
    [[NSUserDefaults standardUserDefaults] synchronize];
    
    //    [[NSUserDefaults standardUserDefaults] setObject:deviceId  forKey:@"devicetoken"];
    NSLog(@"APNS Device Token: %@",deviceId);
}

- (void)receiveRemoteNotification:(NSDictionary *)userInfo withAppState:(BOOL)onForeground
{
    NSString* totalDic;
    totalDic = [NSString stringWithFormat:@"^^ %@", userInfo];
  
    int rtn;
    if([[NSUserDefaults standardUserDefaults] stringForKey:@"currentPhoneNo"]){
        
        NSLog(@"receiveRemoteNotification currentPhoneNo : \n%@", [[NSUserDefaults standardUserDefaults] stringForKey:@"currentPhoneNo"]);
        
        NSDictionary *dicData = [userInfo objectForKey:@"aps"];
        
        NSString* msgID = [dicData objectForKey:@"MSGIDX"];
        
        NSLog(@"msgID @@@@@@@msgID : \n%@", msgID);
        
        NSString* phoneNumber = [[NSUserDefaults standardUserDefaults] stringForKey:@"currentPhoneNo"];
        NSLog(@"pushRegist phoneNumber values ==>%@", phoneNumber);
        
        //rtn = pushRegist("168.154.182.41", 3101, (char *)[phoneNumber UTF8String], (char *)token, "com.alopex.android.template", (char *)[multi UTF8String], 10);

        
        rtn = pushReceipt("168.154.182.41", 3101, (char *)[phoneNumber UTF8String],  (char *)[msgID UTF8String], 10);
        
        if(rtn <= 0){
            NSLog(@"receiveRemoteNotification pushReceipt fail : \n");
        }else{
            NSLog(@"receiveRemoteNotification pushReceipt success : \n");
        }
        
    }
        
    if(onForeground){
        
        NSLog(@"didReceiveRemoteNotification : \n%@", userInfo);
        
    
        NSDictionary *dic = [userInfo objectForKey:@"aps"];
        NSString *messageDic = [NSString stringWithFormat:@"my dictionary is %@", userInfo];
        
        //kSOAlert, kSOMessageId
        if( [dic objectForKey:@"subject"] != nil ){
            title = [dic objectForKey:@"subject"];
        }
        if( [dic objectForKey:@"alert"] != nil ){
            message = [dic objectForKey:@"alert"];
        }
        if( [dic objectForKey:@"parameter"] != nil ){
            
            if( [self.r_parameters objectForKey:@"pageId"] != nil ){
                pageId = [self.r_parameters objectForKey:@"pageId"];
            }
            
            if( [self.r_parameters objectForKey:@"parameters"] != nil ){
                self.r2_parameters = [self.r_parameters objectForKey:@"parameter"];
                self.s_parameters = [self.r_parameters JSONFragment];
                
                NSLog(@"first @@@@@@@s_parameters : \n%@", self.s_parameters);
                
            }
            
        }
        
        NSString *messageTotal = [NSString stringWithFormat:@"title:%@, message:%@", title, message];
        
        NSString* temp;
        NSString* tclose;
        NSString* tcancel;
        
        
        tclose = @"확인";
        
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:title message:messageTotal
                                                       delegate:self cancelButtonTitle:tclose otherButtonTitles:@"취소", nil];
        [alert show];
        
    }else{
        
        NSDictionary *dic = [[userInfo objectForKey:@"UIApplicationLaunchOptionsRemoteNotificationKey"] objectForKey:@"aps"];
        NSString *messageDic = [NSString stringWithFormat:@"my dictionary is %@", dic];
        
        if(!dic){
            return;
        }
        
        NSLog(@"didReceiveRemoteNotification : \n%@", dic);
        
        //kSOAlert, kSOMessageId
        if( [dic objectForKey:@"subject"] != nil ){
            title = [dic objectForKey:@"subject"];
        }
        if( [dic objectForKey:@"alert"] != nil ){
            message = [dic objectForKey:@"alert"];
        }
        if( [dic objectForKey:@"parameter"] != nil ){
            
            if( [self.r_parameters objectForKey:@"pageId"] != nil ){
                pageId = [self.r_parameters objectForKey:@"pageId"];
            }
            
            if( [self.r_parameters objectForKey:@"parameters"] != nil ){
                self.r2_parameters = [self.r_parameters objectForKey:@"parameter"];
                self.s_parameters = [self.r_parameters JSONFragment];
                
                NSLog(@"first @@@@@@@s_parameters : \n%@", self.s_parameters);
                
            }
            
        }
        
        NSString *messageTotal = [NSString stringWithFormat:@"title:%@, message:%@", title, message];
        
        NSString* temp;
        NSString* tclose;
        NSString* tcancel;
        
        
        tclose = @"확인";
        
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:title message:messageTotal
                                                       delegate:self cancelButtonTitle:tclose otherButtonTitles:@"취소", nil];
        [alert show];
        
    }
}

- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex
{
    
    if (buttonIndex == 0){
        
        NSMutableDictionary* pageInfo = [[NSMutableDictionary alloc] init];
        [pageInfo setObject:pageId forKey:@"pageId"];
        [pageInfo setObject:self.r_parameters forKey:@"parameters"];
        
        NSLog(@"\n@@@@@@@ pageInfo : \n%@", pageInfo);
        
        //Navigation *navigation = [Navigation getInstance];
        [[Navigation getIncetance] backToOrNavigate:pageInfo];
        //[self appDelegate].mNavigationManager.mNavController = nil;
        
        //[navigation backToOrNavigate:pageInfo];

    }
    
}



@end

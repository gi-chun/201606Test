#import "AlopexAppDelegate.h"
#import "DataManager.h"


@implementation AlopexAppDelegate

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
    
    //Create the background
    [[UIApplication sharedApplication] setStatusBarStyle:UIStatusBarStyleBlackOpaque];
    UIView* statusBg = [[UIView alloc] initWithFrame:[[UIApplication sharedApplication] statusBarFrame]];
    statusBg.backgroundColor = [UIColor blackColor];
    
    //Add the view behind the status bar
    [self.window.rootViewController.view addSubview:statusBg];
    
//    if (launchOptions){
//        NSDictionary *userInfo = [launchOptions objectForKey:UIApplicationLaunchOptionsRemoteNotificationKey];
//        if (userInfo != nil) {
//            NSLog(@"%@", userInfo);
//        }
//        [self receiveRemoteNotification:launchOptions withAppState:NO];
//    }
    
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
        UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:NSLocalizedString(@"Did receive a Remote Notification", nil) message:[apsInfo objectForKey:@"alert"] delegate:self cancelButtonTitle:NSLocalizedString(@"OK", nil) otherButtonTitles:nil];
        
        [alertView show];
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
    
    //[self receiveRemoteNotification:userInfo withAppState:YES];
    
}

// 수정 이전(7.0버전 이전) 코드 부분 (didReceiveRemoteNotification함수)
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
{
    NSLog(@"APNS Recv");
    //[self receiveRemoteNotification:userInfo withAppState:YES];
    
}

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
    //    [[NSUserDefaults standardUserDefaults] setObject:deviceId  forKey:@"devicetoken"];
    NSLog(@"APNS Device Token: %@",deviceId);
}

- (void)receiveRemoteNotification:(NSDictionary *)userInfo withAppState:(BOOL)onForeground
{
    NSString* totalDic;
    totalDic = [NSString stringWithFormat:@"faceBook %@", userInfo];
  
    if(onForeground){
        
        NSLog(@"didReceiveRemoteNotification : \n%@", userInfo);
        
        NSDictionary *dic = [userInfo objectForKey:@"aps"];
        
        //kSOAlert, kSOMessageId
        NSString *title = [dic objectForKey:@"title"];
        NSString *message = [dic objectForKey:@"alert"];
        NSString *messageWebUrl = [dic objectForKey:@"web_url"];
        NSString *messageTotal = [NSString stringWithFormat:@"title:%@, message:%@, webUrl:%@", title, message, messageWebUrl ];
        //NSString *messageDic = [NSString stringWithFormat:@"my dictionary is %@", dic];
        NSString *messageDic = [NSString stringWithFormat:@"my dictionary is %@", userInfo];
        
        NSString* temp;
        NSString* tclose;
        NSString* tcancel;
        
        tclose = @"close";
        
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:title message:message
                                                       delegate:self cancelButtonTitle:tclose otherButtonTitles:@"cancel", nil];
        [alert show];
        
    }else{
        
        NSDictionary *dic = [[userInfo objectForKey:@"UIApplicationLaunchOptionsRemoteNotificationKey"] objectForKey:@"aps"];
        NSString *messageDic = [NSString stringWithFormat:@"my dictionary is %@", dic];
        
        if(!dic){
            return;
        }
        
        NSLog(@"didReceiveRemoteNotification : \n%@", dic);
        
        //kSOAlert, kSOMessageId
        NSString *title = [dic objectForKey:@"title"];
        NSString *message = [dic objectForKey:@"alert"];
        NSString *messageWebUrl = [dic objectForKey:@"web_url"];
        NSString *messageTotal = [NSString stringWithFormat:@"title:%@, message:%@, webUrl:%@", title, message, messageWebUrl ];
        
        NSString* temp;
        NSString* tclose;
        
    }
}



@end

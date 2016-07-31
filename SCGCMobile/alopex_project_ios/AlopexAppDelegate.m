#import "AlopexAppDelegate.h"
#import "DataManager.h"
#import <Alopex/Navigation.h>
#include "erbapi.h"

@implementation AlopexAppDelegate

NSString *pushServerIp_App = @"168.154.182.41";
#define	mustAppUpDateAlertMessage		@"최신버전 앱이 업데이트 되었습니다. \n앱 업데이트를 진행하지 않으면 사용이 불가합니다. 앱을 업데이트 합니다."
#define mustAppUpDateAlertTag			10000
#define linkPageAlertTag			    10001

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
    
    //check app version
    if([self needsUpdate]){
        //App 필수업데이트
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:nil
                                                        message:mustAppUpDateAlertMessage
                                                       delegate:self
                                              cancelButtonTitle:@"확인"
                                              otherButtonTitles:nil];
        [alert setTag:mustAppUpDateAlertTag];
        
        [alert show];
        [alert release];
    }
    
    if (launchOptions){
        NSDictionary *userInfo = [launchOptions objectForKey:UIApplicationLaunchOptionsRemoteNotificationKey];
        if (userInfo != nil) {
            NSLog(@"%@", userInfo);
        }
        [self receiveRemoteNotification:launchOptions withAppState:NO];
        isAleady = true;
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
    
    if(!isAleady){
        [self receiveRemoteNotification:userInfo withAppState:YES];
    }else{
        isAleady = false;
    }
    
    if(application.applicationState == UIApplicationStateActive)
    {
//        UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:NSLocalizedString(@"Did receive a Remote Notification", nil) message:[apsInfo objectForKey:@"alert"] delegate:self cancelButtonTitle:NSLocalizedString(@"OK", nil) otherButtonTitles:nil];
//        
//        [alertView show];
    }
    else{
        //[self receiveRemoteNotification:userInfo withAppState:NO];
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
    
    //test test
    int rtn;
    //     const char *token = [dataManager.deviceUUID UTF8String];
    const char *token = [deviceId UTF8String];
    NSLog(@"setPushToken token values ==>%s", token);
    
    if(token == NULL)
    {
        token = "testtoken";
    }
    
    NSString *multi = @"Y";
    
    
    rtn = pushRegist("168.154.182.41", 3101, "01066103573", (char *)token, "com.alopex.android.template", (char *)[multi UTF8String], 10);
    
    if(rtn <= 0)
    {
        NSLog(@"pushRegist 실패 rtn(%d)", rtn);
    }
    else if(rtn == 3)
    {
        NSLog(@"등록된 기기가 존재합니다.");
    }
    else if(rtn == 7)
    {
        NSLog(@"중복접속이 허용되지 않았습니다.");
    }
    else
    {
        NSLog(@"pushRegist 성공");
    }
    //test test
}

- (void)receiveRemoteNotification:(NSDictionary *)userInfo withAppState:(BOOL)onForeground
{
    NSString* totalDic;
    totalDic = [NSString stringWithFormat:@"^^ %@", userInfo];
  
    int rtn;
    
    NSLog(@"receiveRemoteNotification currentPhoneNo : \n%@", [[NSUserDefaults standardUserDefaults] stringForKey:@"currentPhoneNo"]);
    
    NSDictionary *dicData = [userInfo objectForKey:@"aps"];
    
    NSString* msgID = [dicData objectForKey:@"MSGIDX"];
    
    NSLog(@"msgID @@@@@@@msgID : \n%@", msgID);
    
    NSString* phoneNumber = [[NSUserDefaults standardUserDefaults] stringForKey:@"currentPhoneNo"];
    NSLog(@"pushRegist phoneNumber values ==>%@", phoneNumber);
    
    rtn = pushReceipt("168.154.182.41", 3101, (char *)[phoneNumber UTF8String],  (char *)[msgID UTF8String], 10);
    
    if(rtn <= 0){
        NSLog(@"receiveRemoteNotification pushReceipt fail : \n");
    }else{
        NSLog(@"receiveRemoteNotification pushReceipt success : \n");
    }
    
    //
    rtn = pushReadCheck("168.154.182.41", 3101, (char *)[phoneNumber UTF8String],  (char *)[msgID UTF8String], 10);
    
    if(rtn <= 0){
        NSLog(@"receiveRemoteNotification pushReadCheck fail : \n");
    }else{
        NSLog(@"receiveRemoteNotification pushReadCheck success : \n");
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
            
            self.r_parameters = [dic objectForKey:@"parameter"];
            
            if( [self.r_parameters objectForKey:@"pageId"] != nil ){
                pageId = [self.r_parameters objectForKey:@"pageId"];
            }
            
            if( [self.r_parameters objectForKey:@"parameters"] != nil ){
                self.r2_parameters = [self.r_parameters objectForKey:@"parameters"];
                self.s_parameters = [self.r2_parameters JSONFragment];
                
                NSLog(@"first @@@@@@@s_parameters : \n%@", self.s_parameters);
                
            }
            
        }
        
        NSString *messageTotal = [NSString stringWithFormat:@"%@", message];
        
        NSString* temp;
        NSString* tclose;
        NSString* tcancel;
        
        
        tclose = @"확인";
        
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:title message:messageTotal
                                                       delegate:self cancelButtonTitle:tclose otherButtonTitles:@"취소", nil];
        [alert setTag:linkPageAlertTag];
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
            
            self.r_parameters = [dic objectForKey:@"parameter"];
            
            if( [self.r_parameters objectForKey:@"pageId"] != nil ){
                pageId = [self.r_parameters objectForKey:@"pageId"];
            }
            
            if( [self.r_parameters objectForKey:@"parameters"] != nil ){
                self.r2_parameters = [self.r_parameters objectForKey:@"parameters"];
                self.s_parameters = [self.r2_parameters JSONFragment];
                
                NSLog(@"first @@@@@@@s_parameters : \n%@", self.s_parameters);
                
            }
            
        }
        
        NSString *messageTotal = [NSString stringWithFormat:@"%@", message];
        
        NSString* temp;
        NSString* tclose;
        NSString* tcancel;
        
        
        tclose = @"확인";
        
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:title message:messageTotal
                                                       delegate:self cancelButtonTitle:tclose otherButtonTitles:@"취소", nil];
        [alert setTag:linkPageAlertTag];
        [alert show];
        
    }
}

-(void)appUpDate
{
    NSLog(@"appUpDate");
    // 앱 업데이트진행
    //마켓앱 있는지 확인
    NSString* marketID = @"https://itunes.apple.com/us/app/dosigaseu/id1017623141?mt=8";
    
    if([[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:marketID]]) // 마켓앱 있으면 마켓앱 호출
    {
        NSURL *url = [NSURL URLWithString:marketID];
        [[UIApplication sharedApplication] openURL: url];
        //exit(0);
    }
    else //마켓앱 없으면 브라우져 실행
    {
        NSURL *url = [NSURL URLWithString:marketID];
        [[UIApplication sharedApplication] openURL:url];
        
        //exit(0);
    }
    
}

-(BOOL)needsUpdate
{
    NSDictionary* infoDictionary = [[NSBundle mainBundle] infoDictionary];
    NSString* appID = infoDictionary[@"CFBundleIdentifier"];
    NSURL* url = [NSURL URLWithString:[NSString stringWithFormat:@"http://itunes.apple.com/lookup?bundleId=%@", appID]];
    NSData* data = [NSData dataWithContentsOfURL:url];
    NSDictionary* lookup = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
    
    if ([lookup[@"resultCount"] integerValue] == 1){
        NSString* appStoreVersion = lookup[@"results"][0][@"version"];
        NSString* currentVersion = infoDictionary[@"CFBundleShortVersionString"];
        if (![appStoreVersion isEqualToString:currentVersion]){
            NSLog(@"Need to update [%@ != %@]", appStoreVersion, currentVersion);
            return YES;
        }
    }
    return NO;
}

- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex
{
    NSInteger alertViewTag = alertView.tag;
    
    switch (alertViewTag) {
        case mustAppUpDateAlertTag:
        { // 필수 앱 업데이트
            [self appUpDate];
        }
            break;
        case linkPageAlertTag:
        {
            if (buttonIndex == 0){
                
                NSMutableDictionary* pageInfo = [[NSMutableDictionary alloc] init];
                [pageInfo setObject:pageId forKey:@"pageId"];
                [pageInfo setObject:self.r2_parameters forKey:@"parameters"];
                
                NSLog(@"\n@@@@@@@ pageInfo : \n%@", pageInfo);
                
                //Navigation *navigation = [Navigation getInstance];
                [[Navigation getIncetance] backToOrNavigate:pageInfo];
                //[self appDelegate].mNavigationManager.mNavController = nil;
                
                //[navigation backToOrNavigate:pageInfo];
                
            }
        }
            break;
    }
    
    
    
}



@end

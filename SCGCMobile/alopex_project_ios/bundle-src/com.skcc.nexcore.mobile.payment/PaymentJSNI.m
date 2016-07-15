/*
 * Copyright (c) 2012 SK C&C Co., Ltd. All rights reserved.
 *
 * This software is the confidential and proprietary information of SK C&C.
 * You shall not disclose such confidential information and shall use it
 * only in accordance with the terms of the license agreement you entered into
 * with SK C&C.
 */

#import "PaymentJSNI.h"
#import <Alopex/NavigationManager.h>
#import <Alopex/AlopexUtil.h>
#include "erbapi.h"
#include "DataManager.h"

NSString *pushServerIp = @"168.154.182.107";

static DataManager *dataManager = nil;

@interface PaymentJSNI(){
    paymentCtl *_paymentCtl;
    NSString *_successCallback;
    NSMutableDictionary *userParam;
}

@property (nonatomic, retain) UIViewController *paymentCtl;
@property (nonatomic, retain) NSString *successCallback;

@end

@implementation PaymentJSNI

- (void)setPushToken:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options{
    
    userParam = [[arguments objectAtIndex:0] JSONFragmentValue];
    NSLog(@"from setPushToken userParam values ==>%@", userParam);
    
    //        var option = {
    //            "phoneno" : vPhoneNo,
    //        };
    
    [[NSUserDefaults standardUserDefaults] setObject:[userParam objectForKey:@"phoneno"] forKey:@"currentPhoneNo"];
    [[NSUserDefaults standardUserDefaults] synchronize];

   
    int rtn;
     const char *token = [dataManager.deviceUUID UTF8String];
    NSLog(@"setPushToken token values ==>%@", token);
     
     if(token == NULL)
     {
         token = "testtoken";
     }
    
    NSString *multi = @"Y";
    /*
     "N" : 중복접속 사용안함
     - 동일한 ID로 기존에 등록된 기기가 있으면 추가 등록 불가 return 3 발생
     "Y" : 중복접속 사용
     - 동일한 ID로 등록된 기기가 있어도 추가 등록
     "D" : 중복접속 사용안함
     - 동일한 ID로 기존에 등록된 기기가 있으면 모두 삭제 후 요청한 신규 기기만 등록
     */
    
    //덩일하게

    
    //rtn = pushRegist("114.205.98.48", 6101, "komj", (char *)token, "com.h2osystech.iMeritzService", (char *)[multi UTF8String], 10);
    rtn = pushRegist(pushServerIp, 3101, [userParam objectForKey:@"phoneno"], (char *)token, "com.alopex.android.template", (char *)[multi UTF8String], 10);
    //    rtn = pushRegist("192.168.3.172", 3101, "komj", (char *)token, "com.h2osystech.iMeritzService", (char *)[multi UTF8String], 10);
    
    NSLog(@"pushRegist (%d), (%@)", rtn, dataManager.deviceUUID);
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
    
}

- (void)showPaymentCtl:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options{
    UIViewController *topViewController = [AlopexUtil appDelegate].mNavigationManager.mNavController.topViewController;
    
//    NSMutableDictionary *userParam = nil;
    
    //Use popover view
    if (arguments.count==2) {
        userParam = [[arguments objectAtIndex:0] JSONFragmentValue];
        
        NSLog(@"from script userParam values ==>%@", userParam);
        
        self.successCallback = [arguments objectAtIndex:1];
        
        NSLog(@"from script successCallback values ==>%@", [arguments objectAtIndex:1]);
    }
    
    self.paymentCtl = [[[paymentCtl alloc] init] autorelease];
    ((paymentCtl*)self.paymentCtl).delegate = self;
    [((paymentCtl*)self.paymentCtl) setParam:userParam];
    [topViewController presentViewController:self.paymentCtl animated:YES completion:nil];
    
}

- (void)paymentCtlSuccessCallback:(NSString *)result{
    [self touchCloseButton];
    [self performSelector:@selector(injection:) withObject:result afterDelay:0.1];
}

- (void)injection:(NSString *)result{
    NSString *jsString = [NSString stringWithFormat:@"%@(\"%@\");", self.successCallback, result];
    [self.webView stringByEvaluatingJavaScriptFromString:jsString];
}

- (void)touchCloseButton{
    UIViewController *topViewController = [AlopexUtil appDelegate].mNavigationManager.mNavController.topViewController;
    
    [topViewController dismissViewControllerAnimated:YES completion:nil];
    
//    [self performSelector:@selector(injection:) withObject:@"test" afterDelay:0.1];
    
}

- (void)dealloc{
    self.paymentCtl = nil;
    self.successCallback = nil;
    [super dealloc];
}

@end

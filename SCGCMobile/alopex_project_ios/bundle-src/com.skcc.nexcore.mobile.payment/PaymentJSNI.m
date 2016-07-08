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

@interface PaymentJSNI(){
    paymentCtl *_paymentCtl;
    NSString *_successCallback;
    NSMutableDictionary *userParam;
}

@property (nonatomic, retain) UIViewController *paymentCtl;
@property (nonatomic, retain) NSString *successCallback;

@end

@implementation PaymentJSNI

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

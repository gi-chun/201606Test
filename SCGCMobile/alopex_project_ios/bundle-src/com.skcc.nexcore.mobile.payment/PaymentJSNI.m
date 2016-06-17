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
}

@property (nonatomic, retain) UIViewController *paymentCtl;
@property (nonatomic, retain) NSString *successCallback;

@end

@implementation PaymentJSNI

- (void)showPaymentCtl:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options{
    UIViewController *topViewController = [AlopexUtil appDelegate].mNavigationManager.mNavController.topViewController;
    
    NSMutableDictionary *userFrame = nil;
    
    self.successCallback = [arguments objectAtIndex:0];
    
    self.paymentCtl = [[[paymentCtl alloc] init] autorelease];
    ((paymentCtl*)self.paymentCtl).delegate = self;
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
}

- (void)dealloc{
    self.paymentCtl = nil;
    self.successCallback = nil;
    [super dealloc];
}

@end

/*
 * Copyright (c) 2012 SK C&C Co., Ltd. All rights reserved.
 *
 * This software is the confidential and proprietary information of SK C&C.
 * You shall not disclose such confidential information and shall use it
 * only in accordance with the terms of the license agreement you entered into
 * with SK C&C.
 */

#import "BarcodeReaderJSNI.h"
#import <Alopex/NavigationManager.h>
#import <Alopex/AlopexUtil.h>

#define POPOVER_WIDTH  500
#define POPOVER_HEIGHT  450

@interface BarcodeReaderJSNI(){
    BarcodeReaderViewController *_barcodeReaderViewController;
    UIPopoverController *_popoverController;
    NSString *_successCallback;
    NSString *_decodedLabel;
    BOOL _usePopOverView;
}

@property (nonatomic, retain) UIViewController *barcodeReaderViewController;
@property (nonatomic, retain) UIPopoverController *popoverController;
@property (nonatomic, retain) NSString *successCallback;
@property (nonatomic, retain) NSString *decodedLabel;
@property(nonatomic, assign) BOOL usePopOverView;

@end

@implementation BarcodeReaderJSNI

- (void)showBarcodeReader:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options{
    UIViewController *topViewController = [AlopexUtil appDelegate].mNavigationManager.mNavController.topViewController;
    
    NSMutableDictionary *userFrame = nil;
    
    //Use popover view
    if (arguments.count==2) {
        userFrame = [[arguments objectAtIndex:0] JSONFragmentValue];
        self.successCallback = [arguments objectAtIndex:1];
        self.usePopOverView = YES;
    }else{
        self.successCallback = [arguments objectAtIndex:0];
        self.usePopOverView = NO;
    }
    
    //Tablet
	if (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad && userFrame != nil) {
        self.barcodeReaderViewController = [[[BarcodeReaderViewController alloc] init] autorelease];
        self.barcodeReaderViewController.view.frame = CGRectMake(0, 0, [[userFrame objectForKey:@"width"] floatValue], [[userFrame objectForKey:@"height"] floatValue]);
        self.barcodeReaderViewController.contentSizeForViewInPopover = CGSizeMake([[userFrame objectForKey:@"width"] floatValue], [[userFrame objectForKey:@"height"] floatValue]);
        ((BarcodeReaderViewController*)self.barcodeReaderViewController).delegate = self;

        self.popoverController = [[[UIPopoverController alloc] initWithContentViewController:self.barcodeReaderViewController] autorelease];
        [self.popoverController presentPopoverFromRect:CGRectMake([[userFrame objectForKey:@"x"] floatValue], [[userFrame objectForKey:@"y"] floatValue], 1, 1) inView:topViewController.view permittedArrowDirections:UIPopoverArrowDirectionAny animated:YES];
    
    //Phone
    }else{
        self.barcodeReaderViewController = [[[BarcodeReaderViewController alloc] init] autorelease];
        ((BarcodeReaderViewController*)self.barcodeReaderViewController).delegate = self;
        [topViewController presentViewController:self.barcodeReaderViewController animated:YES completion:nil];
    }
}

- (void)barcodeReadSuccessCallback:(NSString *)result{
    [self touchCloseButton];
    [self performSelector:@selector(injection:) withObject:result afterDelay:0.1];
}

- (void)injection:(NSString *)result{
    NSString *jsString = [NSString stringWithFormat:@"%@(\"%@\");", self.successCallback, result];
    [self.webView stringByEvaluatingJavaScriptFromString:jsString];
}

- (void)touchCloseButton{
    UIViewController *topViewController = [AlopexUtil appDelegate].mNavigationManager.mNavController.topViewController;
    
    //Tablet
	if (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad && self.usePopOverView) {
        [self.popoverController dismissPopoverAnimated:YES];
    }else{
        [topViewController dismissViewControllerAnimated:YES completion:nil];
    }
}

- (void)dealloc{
    self.barcodeReaderViewController = nil;
    self.popoverController = nil;
    self.successCallback = nil;
    self.decodedLabel = nil;
    [super dealloc];
}

@end

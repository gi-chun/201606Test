//
//  paymentCtl.h
//  SCGCMobile_ios
//
//  Created by gclee on 2016. 6. 17..
//
//

#import <UIKit/UIKit.h>
#import "ViewController.h"


@protocol paymentCtlDelegate <NSObject>

@required
- (void)paymentCtlSuccessCallback:(NSString *)result;
- (void)touchCloseButton;
@end

@interface paymentCtl : UIViewController{
    id<paymentCtlDelegate> _delegate;
}

@property(nonatomic, assign) id<paymentCtlDelegate> delegate;
@property (nonatomic, strong) UIWebView *webView;

@end
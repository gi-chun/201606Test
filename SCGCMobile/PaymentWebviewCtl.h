//
//  PaymentWebviewCtl.h
//  SCGCMobile_ios
//
//  Created by gclee on 2016. 6. 17..
//
//

#import <Alopex/Alopex.h>
#import <UIKit/UIKit.h>
#import <Alopex/AbstractAlopexWebViewContainerScreen.h>

@interface PaymentWebviewCtl : AbstractAlopexWebViewContainerScreen

@property (nonatomic, strong) AlopexWebview *mWebview;

-(void)setWebViewClient;


@end

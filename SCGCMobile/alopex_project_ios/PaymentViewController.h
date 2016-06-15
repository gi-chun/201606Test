//
//  PaymentViewController.h
//  SCGCMobile_ios
//
//  Created by gclee on 2016. 6. 15..
//
//

#import <UIKit/UIKit.h>
#import <Alopex/AbstractAlopexWebViewContainerScreen.h>

@interface PaymentViewController : AbstractAlopexWebViewContainerScreen{
    
    AlopexWebview *mWebview;
    
}

-(void)setWebViewClient;

@end

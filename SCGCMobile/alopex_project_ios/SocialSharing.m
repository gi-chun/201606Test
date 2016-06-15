//
//  SocialSharing.m
//  alopex_project_ios
//
//  Created by ys jung on 2015. 5. 14..
//
//
#import "SocialSharing.h"
#import <Foundation/Foundation.h>
#import <Alopex/AbstractJSNI.h>
#import <Alopex/AlopexManager.h>
#import <Alopex/AlopexUtil.h>

@interface SocialSharing(){
    
}

@end
@implementation SocialSharing

- (void)share:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options{
    NSString  *param1 = [arguments objectAtIndex:0];
    NSString  *param2 = [arguments objectAtIndex:1];
    NSString  *param3 = [arguments objectAtIndex:2];
    NSString  *successCallback = [arguments objectAtIndex:3];
    
    
    NSString *text = @"도시가스 APP\n";
    NSURL *url = [NSURL URLWithString:@"http://goo.gl/dq31Ky"];
    //UIImage *image = [UIImage imageNamed:@"roadfire-icon-square-200"];
    
    UIActivityViewController *controller =
    [[UIActivityViewController alloc]
     initWithActivityItems:@[text, url]
     applicationActivities:nil];
    
    UIViewController *topViewController = [AlopexUtil appDelegate].mNavigationManager.mNavController.topViewController;
    
    [topViewController presentViewController:controller animated:YES completion:nil];
    
    
    
    
    // callback 함수 호출
    NSString *callBackString = @"('ok');";
    NSString *message = [successCallback stringByAppendingString:callBackString];
    
   // NSString *errorString = @"premature end of file.";
   // NSString *errorMessage = [errorTag stringByAppendingString:errorString];
    
    [self.webView stringByEvaluatingJavaScriptFromString:message];
}
@end
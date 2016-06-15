//
//  PaymentViewClient.m
//  SCGCMobile_ios
//
//  Created by gclee on 2016. 6. 15..
//
//

#import "PaymentViewClient.h"

@implementation PaymentViewClient
{
}

- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType{
    
    NSHTTPCookieStorage *cookieStorage = [NSHTTPCookieStorage sharedHTTPCookieStorage];
    [cookieStorage setCookieAcceptPolicy:NSHTTPCookieAcceptPolicyAlways];
    
    UIDevice* device = [UIDevice currentDevice];
    BOOL backgroundSupported = NO;
    if ([device respondsToSelector:@selector(isMultitaskingSupported)])
        backgroundSupported = device.multitaskingSupported;
    NSLog(@"backgroundSupported ==>%@",(backgroundSupported?@"YES":@"NO"));
    
    if (!backgroundSupported){
        UIAlertView *alert=[[UIAlertView alloc] initWithTitle:@"안 내"
                                                      message:@"멀티테스킹을 지원하는 기기 또는 어플만  공인인증서비스가 가능합니다."
                                                     delegate:nil
                                            cancelButtonTitle:@"OK"
                                            otherButtonTitles:nil];
        [alert show];
        return YES;
    }
    
    //모바일ISP url
    NSString *isp_appname = @"ispmobile";
    //모바이ISP 설치호출
    NSString *isp_appinstall = @"itms-apps://itunes.apple.com/kr/app/id369125087?mt=8";
    //계좌이체 url
    NSString *kftc_appname = @"kftc-bankpay://eftpay";
    
    NSString *reqUrl=[[request URL] absoluteString];
    NSLog(@"webview에 요청된 url==>%@",reqUrl);
    
    if([reqUrl rangeOfString:@"ansimclick.hyundaicard.com"].location != NSNotFound)
    {
        return YES;
    }else{
        if([reqUrl rangeOfString:@"http://itunes.apple.com"].location != NSNotFound)
        {
            NSLog(@"1.앱설치 url입니다.==>%@",reqUrl);
            [[UIApplication sharedApplication] openURL:[request URL]];
            return NO;
        }
    }
    if([reqUrl rangeOfString:@"ansimclick"].location != NSNotFound)
    {
        NSLog(@"앱 url입니다.==>%@",reqUrl);
        [[UIApplication sharedApplication] openURL:[request URL]];
        return NO;
    }
    if([reqUrl rangeOfString:@"appfree"].location != NSNotFound)
    {
        NSLog(@"앱 url입니다.==>%@",reqUrl);
        [[UIApplication sharedApplication] openURL:[request URL]];
        return NO;
    }
    
    /* ISP */
    if ( [reqUrl hasPrefix:isp_appname] ){
        NSLog(@"step1.ISP 호출 url 입니다.==>%@",reqUrl);
        
        BOOL installedApp = [[UIApplication sharedApplication] openURL:[request URL]];
        if(installedApp != 1)
        {
            //모바일ISP가 설치되어 있지 않은경우. store로 이동.
            NSLog(@"step2. 모바일ISP 설치가 안되어있음. 설치하러 appstore go!!");
            NSURL *downloadUrl = [NSURL URLWithString:@"http://itunes.apple.com/kr/app/id369125087?mt=8"];
            [[UIApplication sharedApplication] openURL:downloadUrl];
        }
        return NO;
    }
    if([reqUrl hasPrefix:isp_appinstall]){
        NSLog(@"모바일ISP 설치 호출 설치하러 appstore go!!");
        NSURL *downloadUrl = [NSURL URLWithString:@"http://itunes.apple.com/kr/app/id369125087?mt=8"];
        [[UIApplication sharedApplication] openURL:downloadUrl];
    }
    // 계좌이체
    if ( [reqUrl hasPrefix:kftc_appname] ){
        NSLog(@"step1.kftc관련 url 입니다.==>%@",reqUrl);
        NSURL *appUrl = [NSURL URLWithString:reqUrl];
        BOOL installedApp = [[UIApplication sharedApplication] openURL:appUrl];
        if(installedApp != 1)
        {
            //설치되어 있지 않은경우. store로 이동.
            NSLog(@"step2. ktfc설치가 안되어있음. 설치하러 appstore go!!");
            NSURL *downloadUrl = [NSURL URLWithString:@"https://itunes.apple.com/kr/app/eunhaeng-gongdong-gyeywaiche/id398456030?mt=8"];
            [[UIApplication sharedApplication] openURL:downloadUrl];
        }
        
        return NO;
    }
    if ( [reqUrl hasPrefix:@"smartpay-transfer://"] ){
        [[UIApplication sharedApplication] openURL:[request URL]];
    }
    
    return YES;
    
}

- (void)webViewDidStartLoad:(UIWebView *)webView{
    [super webViewDidStartLoad:webView];
    
}

- (void)webViewDidFinishLoad:(UIWebView *)webView{
    
    [super webViewDidFinishLoad:webView];

}

- (void)webView:(UIWebView *)webView didFailLoadWithError:(NSError *)error{
    [super webView:webView didFailLoadWithError:error];
}

@end

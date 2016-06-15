//
//  PaymentViewClient.h
//  SCGCMobile_ios
//
//  Created by gclee on 2016. 6. 15..
//
//

#import <Alopex/AlopexWebviewClient.h>

@interface PaymentViewClient : AlopexWebviewClient

- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType;
- (void)webViewDidStartLoad:(UIWebView *)webView;
- (void)webViewDidFinishLoad:(UIWebView *)webView;
- (void)webView:(UIWebView *)webView didFailLoadWithError:(NSError *)error;

@end

//
//  PaymentWebviewCtl.m
//  SCGCMobile_ios
//
//  Created by gclee on 2016. 6. 17..
//
//

#import "PaymentWebviewCtl.h"
#import "PaymentViewClient.h"

@interface PaymentWebviewCtl ()

@end

@implementation PaymentWebviewCtl

- (void)viewDidLoad {
    
    [super viewDidLoad];
    //[super viewDidLoad];
    
    // Do any additional setup after loading the view.
    [self.mWebView setFrame:CGRectMake(0, 0, self.view.frame.size.width, self.view.frame.size.height)];
    [self.view addSubview:self.mWebView];
    
    [self setWebViewClient];
    
    //    [self.mWebView openWebView:@"http://www.naver.com"];
    //    NSString *address = @"http://m.forrent.com/search.php?";
    NSString *address = @"http://www.naver.com";
    //    NSString *params1 = @"address=92115&beds=&baths=&price_to=0";
    //    // URL encode the problematic part of the url.
    //    NSString *params2 = @"#{%22lat%22:%220%22,%22lon%22:%220%22,%22distance%22:%2225%22,%22seed%22:%221622727896%22,%22is_sort_default%22:%221%22,%22sort_by%22:%22%22,%22page%22:%221%22,%22startIndex%22:%220%22,%22address%22:%2292115%22,%22beds%22:%22%22,%22baths%22:%22%22,%22price_to%22:%220%22}";
    //    params2 = [self escape:params2];
    
    // Build the url and loadRequest
    //    NSString *urlString = [NSString stringWithFormat:@"%@%@%@",address,params1,params2];
    NSString *urlString = [NSString stringWithFormat:@"%@",address];
    [self.mWebView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:urlString]]];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#pragma mark - AlopexWebviewDelegate
-(void)setWebViewClient
{
    id delegate = [[PaymentViewClient alloc]init];
    
    [self.mWebView setDelegate:delegate];
}

/*
 #pragma mark - Navigation
 
 // In a storyboard-based application, you will often want to do a little preparation before navigation
 - (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
 // Get the new view controller using [segue destinationViewController].
 // Pass the selected object to the new view controller.
 }
 */

@end

//
//  PaymentViewController.m
//  SCGCMobile_ios
//
//  Created by gclee on 2016. 6. 15..
//
//

#import "PaymentViewController.h"
#import "PaymentViewClient.h"

@interface PaymentViewController (){
    
}

@end

@implementation PaymentViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    [self.mWebView setFrame:CGRectMake(0, 0, self.view.frame.size.width, self.view.frame.size.height)];
    [self.view addSubview:self.mWebView];
    
    [self setWebViewClient];
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

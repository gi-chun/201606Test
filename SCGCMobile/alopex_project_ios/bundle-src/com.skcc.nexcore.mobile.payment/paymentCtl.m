//
//  paymentCtl.m
//  SCGCMobile_ios
//
//  Created by gclee on 2016. 6. 17..
//
//

#import "paymentCtl.h"


@interface paymentCtl (){
}

@end

@implementation paymentCtl

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
    if(self.webView == nil){
        
        self.webView = [[UIWebView alloc] initWithFrame:CGRectMake(0, 0, self.view.frame.size.width, self.view.frame.size.width)];
        
        [self.webView setFrame:CGRectMake(0, 0, self.view.frame.size.width, self.view.frame.size.height)];
        [self.webView setDelegate:self];
        [self.view addSubview:self.webView];
        
        NSString *address = @"http://www.naver.com";
        NSString *urlString = [NSString stringWithFormat:@"%@",address];
        [self.webView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:urlString]]];
    }

    
}

- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
}

- (void)viewWillDisappear:(BOOL)animated {
    [super viewWillDisappear:animated];
}

- (void)viewDidAppear:(BOOL)animated{
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)dealloc {
    [super dealloc];
}

- (void)viewDidUnload {
    [super viewDidUnload];
}




@end


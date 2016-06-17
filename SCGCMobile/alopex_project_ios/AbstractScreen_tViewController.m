//
//  ViewController.m
//  SCGCMobile_ios
//
//  Created by gclee on 2016. 6. 17..
//
//

#import "AbstractScreen_tViewController.h"

@interface AbstractScreen_tViewController ()

@end

@implementation AbstractScreen_tViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    //Left Skip Button
    UIButton* LeftSkipButton = [UIButton buttonWithType:UIButtonTypeCustom];
    LeftSkipButton.frame = CGRectMake(self.frame.size.width/4, self.frame.size.height - (20+80), self.frame.size.width/4, 80);
//    [LeftSkipButton setTitle:skipString forState:UIControlStateNormal];
//    [LeftSkipButton.titleLabel setFont:kSkipButtonFont];
//    [LeftSkipButton setTag:0];
//    [LeftSkipButton addTarget:self action:@selector(didPressMemberButton) forControlEvents:UIControlEventTouchUpInside];
    [self addSubview:self.LeftSkipButton];

    
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
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

//
//  paymentCtl.m
//  SCGCMobile_ios
//
//  Created by gclee on 2016. 6. 17..
//
//

#import "paymentCtl.h"


NSString *isp_url = @"http://168.154.182.107:19681/cip/ISP/intro.html";
NSString *mpi_url = @"http://168.154.182.107:19681/cip/MPI/m_mpiTest.jsp";

@interface paymentCtl (){
    
    NSMutableDictionary *userParam;
    NSMutableDictionary *userParam2;
}

@end

@implementation paymentCtl

- (void)setParam:(NSMutableDictionary *)pUserParam pUserParam2:(NSMutableDictionary *)pUserParam2
{
    userParam = pUserParam;
    userParam2 = pUserParam2;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
    if(self.webView == nil){
        
        self.webView = [[UIWebView alloc] initWithFrame:CGRectMake(0, 0, self.view.frame.size.width, self.view.frame.size.width)];
        
        [self.webView setFrame:CGRectMake(0, 0, self.view.frame.size.width, self.view.frame.size.height)];
        [self.webView.scrollView setBounces:NO];
        [self.webView setDelegate:self];
        [self.view addSubview:self.webView];
        
        NSLog(@"in userParam values ==>%@", userParam);
        NSLog(@"in userParam2 values ==>%@", userParam2);
      
        NSURL *url = [NSURL URLWithString: [userParam objectForKey:@"connectURL"]];
        NSString* sPayType = [userParam objectForKey:@"payType"];
        NSMutableString *body = [[NSMutableString alloc] init];
        
        if([sPayType isEqualToString:@"MPI"]){
        
            
            NSString *firstBody = [NSString stringWithFormat: @"ordername=%@&ordernumber=%@&amount=%@&goodname=%@&phoneno=%@&cardCode=%@&BPCode=%@&CANO=%@&DATA_TOTAL=%@&TERM_ID=%@&installment=%@",
                                   [userParam objectForKey:@"ordername"],
                                   [userParam objectForKey:@"ordernumber"],
                                   [userParam objectForKey:@"amount"],
                                   [userParam objectForKey:@"goodname"],
                                   [userParam objectForKey:@"phoneno"],
                                   [userParam objectForKey:@"cardCode"],
                                   [userParam objectForKey:@"BPCode"],
                                   [userParam objectForKey:@"CANO"],
                                   [userParam objectForKey:@"DATA_TOTAL"],
                                   [userParam objectForKey:@"TERM_ID"],
                                   [userParam objectForKey:@"installment"]
                                   ];
            
            [body appendString:firstBody];
            
            NSArray *dataArray = userParam2[@"paymentList"];
            
            if (dataArray) {
                for (NSInteger i=0; i<[dataArray count]; i++) {
                    if(i==0){
                        [body appendString:[NSString stringWithFormat:@"&RGUBUN=%@", dataArray[i][@"RGUBUN"]]];
                        [body appendString:[NSString stringWithFormat:@"&BP_ADDRESS=%@", dataArray[i][@"BP_ADDRESS"]]];
                        [body appendString:[NSString stringWithFormat:@"&NAME_LAST=%@", dataArray[i][@"NAME_LAST"]]];
                        [body appendString:[NSString stringWithFormat:@"&BUKRS=%@", dataArray[i][@"BUKRS"]]];
                        [body appendString:[NSString stringWithFormat:@"&BUTXT=%@", dataArray[i][@"BUTXT"]]];
                        [body appendString:[NSString stringWithFormat:@"&STCD2=%@", dataArray[i][@"STCD2"]]];
                        [body appendString:[NSString stringWithFormat:@"&COM_ADDRESS=%@", dataArray[i][@"COM_ADDRESS"]]];
                        [body appendString:[NSString stringWithFormat:@"&TEL_NUMBER=%@", dataArray[i][@"TEL_NUMBER"]]];
                        [body appendString:[NSString stringWithFormat:@"&TOTAL_CARD_AM=%@", dataArray[i][@"TOTAL_CARD_AM"]]];
                    }
                    
                    [body appendString:[NSString stringWithFormat:@"&LDO_CODE=%@", dataArray[i][@"LDO_CODE"]]];
                    [body appendString:[NSString stringWithFormat:@"&SEQ=%@", dataArray[i][@"SEQ"]]];
                    [body appendString:[NSString stringWithFormat:@"&GPART=%@", dataArray[i][@"GPART"]]];
                    [body appendString:[NSString stringWithFormat:@"&VKONT=%@", dataArray[i][@"VKONT"]]];
                    [body appendString:[NSString stringWithFormat:@"&OPBEL=%@", dataArray[i][@"OPBEL"]]];
                    [body appendString:[NSString stringWithFormat:@"&FAEDN=%@", dataArray[i][@"FAEDN"]]];
                    [body appendString:[NSString stringWithFormat:@"&STATUS=%@", dataArray[i][@"STATUS"]]];
                    [body appendString:[NSString stringWithFormat:@"&BETRW=%@", dataArray[i][@"BETRW"]]];
                }
            }
            
            NSLog(@"url parameter values ==>%@", body);
            
        }else{ //ISP
            
        }
        
        NSMutableURLRequest *request = [[NSMutableURLRequest alloc]initWithURL: url];
        [request setHTTPMethod: @"POST"];
        [request setHTTPBody: [body dataUsingEncoding: NSUTF8StringEncoding]];
        [self.webView loadRequest: request];
        
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
    
    if([reqUrl rangeOfString:@"scgcmobile://before"].location != NSNotFound)
    {
        NSLog(@"navigate before page.==>%@",reqUrl);
        
        NSString* param = @"1";
        
        NSLog(@"param url==>%@", param);
        [self.delegate paymentCtlSuccessCallback:param];
        
        return NO;
    }
    
    if([reqUrl rangeOfString:@"scgcmobile://payment_success"].location != NSNotFound)
    {
        NSLog(@"navigate before page.==>%@",reqUrl);
        
        NSString* param = @"2";
        
        NSLog(@"param url==>%@", param);
        [self.delegate paymentCtlSuccessCallback:param];
        
        return NO;
    }
    
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




@end


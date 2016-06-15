/*
 * Copyright (c) 2012 SK C&C Co., Ltd. All rights reserved.
 *
 * This software is the confidential and proprietary information of SK C&C.
 * You shall not disclose such confidential information and shall use it
 * only in accordance with the terms of the license agreement you entered into
 * with SK C&C.
 */

#import "AlopexAppDelegate.h"
#import "RemoteContentManager.h"
#import <Alopex/NSString+SBJSON.h>
#import <Alopex/NSObject+SBJSON.h>
#import <Alopex/AlopexUtil.h>
#import <Alopex/AESUtil.h>
#import <Alopex/ZipArchive.h>
#import <Alopex/NavigationManager.h>
#import <Alopex/ARCEFile.h>

#define SERVICE_ID			@"serviceid"
#define MIN_VERSION			@"minversion"
#define COMPARE_VERSION		@"compversion"
#define TOKEN				@"token"
#define RC_CURRENT_VERSION	@"appversion"

#define CYPHERSTRING					@"NEXCOREMOBILEAPP" //AES암호화 대상, 해당 스트링과 현재 날짜 조합 

//앱 버전 체크 전문  serviceID 
#define appVersionCheck_serviceID  @"appstore.appversion"
//rc 버전 체크 전문 serviceID	
#define rcVersionCheck_serviceID   @"appstore.rcversion"

#define AppVersionCheckURL		@"/service"
#define rcVersionCheckURL		@"/service"
#define contentDawnLoadURL		@"/download"

//property KEY
#define contentCurrentVersion   @"current_remote_content_version"
#define propertyFileNAME		@"remote_content_properties"
#define	server_url				@"server_url"
#define marketApp_ID			@"market_app"
#define marketDawnLoadURL		@"market_download_url"

#define filePathExtensions      @"file_path_extensions" 

//alertTag
#define mustAppUpDateAlertTag			10000
#define optionAppUpDateAlertTag			10001

#define mustContentUpDateAlertTag		10002
#define optionContentUpDateAlertTag		10003

#define networkErrorAlertTag			10004
#define unZipErrorAlertTag				10005

#define contetnCopyErrorAlertTag		10006
#define downloadCancelAlertTag			10007

//currentStep
#define  contentInit					0
#define  appVerCheck					1
#define  rcVerCheck						2
#define  contentsDawnLoad				3

//alertMessage
#define	mustAppUpDateAlertMessage		@"최신버전 앱이 업데이트 되었습니다. \n앱 업데이트를 진행하지 않으면 사용이 불가합니다. 앱을 업데이트 합니다."
#define optionAppUpDateAlertMessage		@"최신버전 앱이 업데이트 되었습니다. \n다운로드 하시겠습니까?"

#define mustContentUpDateAlertMessage	@"최신버전 컨덴트가 업데이트 되었습니다. \n컨텐트를 업데이트 하지않으면 사용이 불가합니다. 컨텐트를 업데이트 합니다."
#define optionContentUpDateAlertMessage	@"최신버전 컨텐트가 업데이트 되었습니다. \n다운로드 하시겠습니까?"

#define firstContentDawnLoadMessage		@"현재 실행 가능한 컨텐트가 없습니다. \n컨텐트를 다운로드 합니다."
#define downloadCancelMessage			@"다운로드를 종료 하셨습니다. \n다시 다운로드 하시겠습니까?"
#define networkErrorMessage				@"네트워크 상태를 확인하세요. \n 다시 시도 합니다. 원하지 않으시면 앱을 완전히 종료 하신후 다시 실행해 주십시요."
#define networkErrorMessage1				@"네트워크 상태를 확인하세요. \n 다시 시도 합니다. 원하지 않으시면 앱을 완전히 종료 하신후 다시 실행해 주십시요.2"
#define httpErrorMessage				@"통신오류 - 에러 코드"
#define	unZipErrorMessage				@"컨텐트 파일 오류"
#define contentCopyErrorMessage			@"컨텐트 초기화중 오류가 발생하였습니다. 다시 시도 합니다. 원하지 않으시면 앱을 완전히 종료 하신후 다시 실행해 주십시요."

#define reTrymessage					@"\n다시 시도 합니다. 원하지 않으시면 앱을 완전히 종료 하신후 다시 실행해 주십시요."

@implementation RemoteContentManager

@synthesize remoteContentProperties , contentDawnLoadInfo, downloadReceivedData ,downLoadConnection , serverUrl ,indicatorView;

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    if (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad){
        self = [super initWithNibName:@"RemoteContentManager_iPad" bundle:nibBundleOrNil];
    }else{
        self = [super initWithNibName:@"RemoteContentManager_iPhone" bundle:nibBundleOrNil];
    }
    return self;
}

- (void)didReceiveMemoryWarning
{
    // Releases the view if it doesn't have a superview.
    [super didReceiveMemoryWarning];
    
    // Release any cached data, images, etc that aren't in use.
}

#pragma mark - View lifecycle

- (void)viewDidLoad
{
    [super viewDidLoad];
    NSLog(@"remote okok !!!!!");
	self.indicatorView = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleGray];
	[indicatorView setCenter:self.view.center];
	[self.view addSubview:indicatorView];
	[indicatorView startAnimating];
}

-(void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];
	[self initContentFile];
}

- (void)viewDidUnload
{
    [super viewDidUnload];
    // Release any retained subviews of the main view.
    // e.g. self.myOutlet = nil;
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    // Return YES for supported orientations
    return (interfaceOrientation == UIInterfaceOrientationPortrait);
}

#pragma mark - remoteContent property set
-(void)setPropertyData:(NSMutableDictionary*)properties
{
	self.remoteContentProperties = properties;
	NSLog(@"remoteContentProperties  %@" , remoteContentProperties);
}

#pragma mark content init
-(void)initContentFile
{
  	currentStep = contentInit;
    useEncrypt = false;
	if([self copyWWWFile])
	{
        //test
        useEncrypt = [self checkEncryptConfig];
//		[self requesHTTPRemoteContent];
        //test end
        [self requestContentVer];
	}
	else
	{
		UIAlertView *alert = [[UIAlertView alloc] initWithTitle:nil
                                                        message:contentCopyErrorMessage
                                                       delegate:self
                                              cancelButtonTitle:@"확인"
                                              otherButtonTitles:nil];
		[alert setTag:contetnCopyErrorAlertTag];
		[alert show];
		[alert release];
	}
}

#pragma mark copyWWWFile bundle->document  : 패키징 될때 bundle  resource에 www파일이 있었으면 해당 파일 document에 이동해놓고 사용
-(BOOL)copyWWWFile
{
	NSError *error = nil;
	NSBundle *mainBundle = [NSBundle mainBundle];
    
	NSString *documentWWW = [NSString stringWithFormat:@"%@/%@", [AlopexUtil getRemoteDawnLoadPath], ALOPEX_CONFIG_XML]; // document경로/alopexconfig.xml 경로
	
	if (![[NSFileManager defaultManager] fileExistsAtPath: documentWWW]) // document 경로에 document경로/alopexconfig.xml 파일이 없으면
	{
		documentWWW = [NSString stringWithFormat:@"%@/www", [AlopexUtil getRemoteDawnLoadPath]];
		[[NSFileManager defaultManager]createDirectoryAtPath:[NSString stringWithFormat:@"%@" , documentWWW] withIntermediateDirectories:YES attributes:nil error:&error ];
		
		NSString *bundleWWW = [mainBundle pathForResource:WWWFOLDER_NAME ofType:nil]; // bundle resource영역 www파일 경로
		if([[NSFileManager defaultManager] fileExistsAtPath:bundleWWW]) //bundle resource영역 www파일이 있으면 해당내용 document 경로에 복사
		{
			documentWWW = [NSString stringWithFormat:@"%@/www", [AlopexUtil getRemoteDawnLoadPath]];
            
			NSLog(@"documentWWW = %@ , bundleWWW = %@" , documentWWW , bundleWWW);
			NSArray* resContents = [[NSFileManager defaultManager] subpathsOfDirectoryAtPath:bundleWWW  error:nil]; //bundle www의 파일 모두 array에 저장
            
			for (NSString* obj in resContents){
				BOOL isDirectory = NO;
				NSLog(@"fileName = %@" , obj);
				[[NSFileManager defaultManager]fileExistsAtPath:[NSString stringWithFormat:@"%@/%@" , bundleWWW ,obj ] isDirectory:&isDirectory]; //해당 파일이 디렉토리인지 확인
				if(isDirectory) // 디렉토리이면
				{
					//document 영역에 디렉토리 생성
					[[NSFileManager defaultManager]createDirectoryAtPath:[NSString stringWithFormat:@"%@/%@" , documentWWW , obj] withIntermediateDirectories:YES attributes:nil error:&error ];
					continue;
				}
                
				NSLog(@"bundlePath = %@" , [bundleWWW stringByAppendingPathComponent:obj] );
				NSLog(@"documentPath = %@" , [documentWWW stringByAppendingPathComponent:obj]);
				if (![[NSFileManager defaultManager] //파일이면 copy
                      copyItemAtPath:[bundleWWW stringByAppendingPathComponent:obj]
                      toPath:[documentWWW stringByAppendingPathComponent:obj]
                      error:&error])
				{
					return NO;
				}
			}
		}
	}
	return YES;
}

#pragma mark compare encrypt config
-(BOOL)checkEncryptConfig
{
    NSDictionary *encryptInfo = nil;
    // doc의 remoteContents property에 encrypt설정 읽기
    encryptInfo = [AlopexUtil getAlopex];
    if(![self containsKey:filePathExtensions])
    {// doc에 encrypt설정 없을경우
        if(encryptInfo == nil)
        {// bundle check  bundle도 없으면 return No - 암호화 안함
            return  NO;
        }
        else
        {// bundle check  bundle에 있으면 현재 컨텐츠 지우고, Doc remoteContents에 property 복사하고, contentsVersion = 0 만들고, return YES;
            [self removeContentFile];
            NSEnumerator * enumerator = [[encryptInfo objectForKey: EXTENSIONS] objectEnumerator];
            id arrayItem;
            NSMutableString *pathExtension = [NSMutableString string];
            while (arrayItem = [enumerator nextObject]) {
                [pathExtension appendFormat:@"%@,"  , arrayItem];
            }
            [remoteContentProperties setObject:pathExtension forKey:filePathExtensions];
            [remoteContentProperties setObject:@"0" forKey:contentCurrentVersion];
            
            [self updateRemoteContentProperty];
            return YES;
        }
    }
    else
    {//doc에 encrypt설정 있는경우
        if(encryptInfo == nil)
        {//bundle check bundle에 더이상 사용 안한다고 했을떄, 현재 컨텐츠 지우고, Doc remoteContents property갱신하고, contentsVersion 0 만듬  return NO;
            [self removeContentFile];
            [remoteContentProperties removeObjectForKey:filePathExtensions];
            [remoteContentProperties setObject:@"0" forKey:contentCurrentVersion];
            [self updateRemoteContentProperty];
            
            return NO;
        }
        else
        {//확장자 확인
            //변경되었을 경우, 컨텐츠 삭제, remoteContentsproperty갱신 하고, contetnsVersion 0 으로 만들기 ,return YES;
            NSEnumerator * enumerator = [[encryptInfo objectForKey: EXTENSIONS] objectEnumerator];
            id arrayItem;
            NSMutableString *pathExtension = [NSMutableString string];
            while (arrayItem = [enumerator nextObject]) {
                [pathExtension appendFormat:@"%@,"  , arrayItem];
            }
            //기존이랑 확장자 비교
            if(![pathExtension isEqualToString:[remoteContentProperties objectForKey:filePathExtensions]])
            {//같지 않을경우
                [self removeContentFile];
                [remoteContentProperties setObject:pathExtension forKey:filePathExtensions];
                [remoteContentProperties setObject:@"0" forKey:contentCurrentVersion];
                [self updateRemoteContentProperty];
            }
            return YES;
        }
    }
}

- (BOOL)containsKey: (NSString *)key {
    BOOL retVal = 0;
    NSArray *allKeys = [remoteContentProperties allKeys];
    retVal = [allKeys containsObject:key];
    return retVal;
}

#pragma mark update RemoteContents Propertyfile
-(void)updateRemoteContentProperty
{
    NSMutableString *strData = [[NSMutableString alloc] init];
    
    NSEnumerator *keyEnumerator = [remoteContentProperties keyEnumerator];
    
    NSString *aKey, *aValue;
    while (aKey = [keyEnumerator nextObject]) {
        aValue = [remoteContentProperties objectForKey: aKey];
        [strData appendFormat: @"%@=%@\n", aKey, aValue];
    }
    
    NSLog(@"remoteContentProperty %@" , remoteContentProperties);
    NSLog(@"strData : %@" , strData);
    
    NSString *documentFilePath = [[NSString alloc]initWithFormat:@"%@/%@", [AlopexUtil getRemoteDawnLoadPath] , propertyFileNAME];
	
    NSFileHandle *propertyFile = [NSFileHandle fileHandleForUpdatingAtPath:documentFilePath];
    if(propertyFile == nil){
        NSLog(@"Failed\n");
    }
    
    [propertyFile writeData:[strData dataUsingEncoding:NSUTF8StringEncoding]];
    [propertyFile truncateFileAtOffset:[strData length]];
    [propertyFile closeFile];
    
    [strData release];
    
    [documentFilePath release];
}


#pragma mark remove content
-(BOOL)removeContentFile
{
	// bundle -> document로 www 파일이동 하는동안 에러가 발생했을떄, 이미 copy된 파일 삭제
	NSError *error = nil;
	NSString* documentWWW = [NSString stringWithFormat:@"%@/www", [AlopexUtil getRemoteDawnLoadPath]];
    
	return [[NSFileManager defaultManager]
            removeItemAtPath:documentWWW
            error:&error];
}

#pragma mark request Appver - App Ver 체크
-(void)requesHTTPRemoteContent
{
	currentStep = appVerCheck;
	
	NSString* postStringBody = nil;
    NSData *postData = nil;
	NSError *error = nil;
    NSURLResponse *response;
    NSHTTPURLResponse *httpResponse;
    NSData *dataReply = nil;
    id stringReply = nil;
	
	self.serverUrl = [remoteContentProperties objectForKey:server_url];
	
	//AppVersion check전문 request
	NSMutableDictionary * contentInfo = [[NSMutableDictionary alloc] init];
	[contentInfo setObject:@"" forKey:@"userid"];
	[contentInfo setObject:@"com.alopex.android.template" forKey: @"appid"];
	[contentInfo setObject:appVersionCheck_serviceID forKey:@"serviceid"];
    
	postStringBody = [contentInfo JSONFragment];
	[contentInfo release];
	postData = [postStringBody dataUsingEncoding:NSUTF8StringEncoding];
	NSString* appVerCheckURL = [NSString stringWithFormat:@"%@%@" , self.serverUrl, AppVersionCheckURL];
	NSURL * url = [NSURL URLWithString: appVerCheckURL];
	NSLog(@"postData = %@ , %@" , postStringBody , url);
 	NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url
                                                           cachePolicy:NSURLRequestUseProtocolCachePolicy timeoutInterval:30];
    [request setHTTPMethod:@"POST"];
    [request setHTTPBody:postData];
    [request setValue:@"text/xml" forHTTPHeaderField:@"Accept"];
	
	[indicatorView startAnimating];
	//sync request
    dataReply = [NSURLConnection sendSynchronousRequest:request returningResponse:&response error:&error];
	
	NSLog(@"dataReply  : %@" , dataReply);
	if(dataReply == nil)
	{
		// 응답 없을 경우
		//[indicatorView stopAnimating];
		UIAlertView *alert = [[UIAlertView alloc] initWithTitle:nil
                                                        message:networkErrorMessage
                                                       delegate:self
                                              cancelButtonTitle:@"확인"
                                              otherButtonTitles:nil];
		[alert setTag:networkErrorAlertTag];
		[alert show];
		[alert release];
		
		return;
        
	}
	//[indicatorView stopAnimating];
	stringReply = (NSString *)[[NSString alloc] initWithData:dataReply encoding:NSUTF8StringEncoding];
	
	httpResponse = (NSHTTPURLResponse *)response;
    NSInteger statusCode = [httpResponse statusCode];
    NSLog(@"HTTP Response Headers %@", [httpResponse allHeaderFields]);
    NSLog(@"HTTP Status code: %ld", (long)statusCode);
	
	if(statusCode == 200)
	{
		NSMutableDictionary *appVersionCheckResponseData = [stringReply JSONFragmentValue];
		NSLog(@"rcVersionCheck : %@" ,appVersionCheckResponseData );
		//NSString *serviceID = [appVersionCheckResponseData objectForKey:SERVICE_ID];
		
		//NSLog(@"serviceID : %@" , serviceID);
		
		NSString* currentVersion = [[AlopexUtil getAppVersion] stringByReplacingOccurrencesOfString:@"." withString:@""];
		NSString* minVersion = [[appVersionCheckResponseData objectForKey:MIN_VERSION] stringByReplacingOccurrencesOfString:@"." withString:@""];
		NSString* compVersion =[[appVersionCheckResponseData objectForKey:COMPARE_VERSION] stringByReplacingOccurrencesOfString:@"." withString:@""];
		
		int nCurrentVer = [currentVersion intValue];
		int nMinVer	= [minVersion intValue];
		int nCompVer = [compVersion intValue];
		
		if(nCurrentVer < nMinVer)
		{
			//App 필수업데이트
			UIAlertView *alert = [[UIAlertView alloc] initWithTitle:nil
                                                            message:mustAppUpDateAlertMessage
                                                           delegate:self
                                                  cancelButtonTitle:@"확인"
                                                  otherButtonTitles:nil];
			[alert setTag:mustAppUpDateAlertTag];
            
			[alert show];
			[alert release];
            
		}
		else
		{
			if(nCurrentVer < nCompVer)
			{
				//App 선택적 업데이트
				UIAlertView *alert = [[UIAlertView alloc] initWithTitle:nil
                                                                message:optionAppUpDateAlertMessage
                                                               delegate:self
                                                      cancelButtonTitle:@"취소"
                                                      otherButtonTitles:@"확인" ,nil];
				[alert setTag:optionAppUpDateAlertTag];
                
				[alert show];
				[alert release];
				
			}
			else
			{	//현재 내앱이 최신 버전인 경우  다음 지행
				//RemoteContent version request
				[self requestContentVer];
			}
		}
	}
	else
	{
		// 통신 오류
		//[indicatorView stopAnimating];
		NSString *errorMessage = [NSString stringWithFormat:@"%@(%ld)%@" , httpErrorMessage , (long)statusCode , reTrymessage];
		UIAlertView *alert = [[UIAlertView alloc] initWithTitle:nil
                                                        message:errorMessage
                                                       delegate:self
                                              cancelButtonTitle:@"확인"
                                              otherButtonTitles:nil];
		[alert setTag:networkErrorAlertTag];
		[alert show];
		[alert release];
	}
	
	[stringReply release];
}

#pragma mark request -content Ver 체크 to CIP
-(BOOL)isUpdateContentToCIP{
    
    NSLog(@"isUpdateContentToCIP");
    
    NSString* postStringBody = nil;
    NSData *postData = nil;
    NSError *error;
    NSURLResponse *response;
    NSHTTPURLResponse *httpResponse;
    NSData *dataReply;
    id stringReply;
    
    NSMutableDictionary * contentInfo = [[NSMutableDictionary alloc] init];
    //set body
    [contentInfo setObject:@"test" forKey:@"lsc"];
    postStringBody = [contentInfo JSONFragment];
    NSLog(postStringBody);
    [contentInfo release];
    postData = [postStringBody dataUsingEncoding:NSUTF8StringEncoding];
    
    NSString* rcVerCheckURL =@"http://168.154.182.107:19681/cip/services/nmp";
    //NSString* rcVerCheckURL =@"https://scgc.skens.com:9090/services/nmp";
    NSURL * url = [NSURL URLWithString: rcVerCheckURL];
    NSLog(@"postData = %@ , %@" , postStringBody , url);
    
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url
                                                           cachePolicy:NSURLRequestUseProtocolCachePolicy timeoutInterval:30];
    [request setHTTPMethod: @"POST"];
    [request setHTTPBody:postData];
    [request setValue:@"application/json" forHTTPHeaderField:@"Accept"];
    [request setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
    
    //set header
    [request setValue:@"getCurrentVersion" forHTTPHeaderField:@"service"]; //getAccInfo
    [request setValue:@"SCGC" forHTTPHeaderField:@"app_id"];
    
    
    [indicatorView startAnimating];
    
    //sync request
    dataReply = [NSURLConnection sendSynchronousRequest:request returningResponse:&response error:&error];
    NSLog(@"dataReply  : %@" , dataReply);
    
    if(dataReply == nil)
    {
        //[indicatorView stopAnimating];
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:nil
                                                        message:networkErrorMessage1
                                                       delegate:self
                                              cancelButtonTitle:@"확인"
                                              otherButtonTitles:nil];
        
        [alert setTag:networkErrorAlertTag];
        [alert show];
        [alert release];
        
        return NO;
    }
    
    //[indicatorView stopAnimating];
    stringReply = (NSString *)[[NSString alloc] initWithData:dataReply encoding:NSUTF8StringEncoding];
    
    NSLog(@"stringReply : %@" , stringReply);
    
    httpResponse = (NSHTTPURLResponse *)response;
    NSInteger statusCode = [httpResponse statusCode];
    
    NSLog(@"statusCode : %d @@@@@@@@\n\n" , statusCode);
    
    NSLog(@"httpResponse : %@" , httpResponse);
    
    NSMutableDictionary *RCVersionCheckResponseData = [stringReply JSONFragmentValue];
    //NSMutableDictionary *RCVersionCheckResponseData = stringReply;

    
    NSLog(@"RCVersionCheckResponseData : %@" , RCVersionCheckResponseData);
    
    
    if(statusCode == 200)
    {
        //NSArray *dataArray
        //NSMutableDictionary* dCurrentTemp;
        NSArray *dCurrentTemp;
        dCurrentTemp = [[RCVersionCheckResponseData objectForKey:@"list"] objectForKey:@"Results"];
        NSLog(@"dCurrentTemp = %@", dCurrentTemp);
        
        NSString* currentTemp = [dCurrentTemp[0] objectForKey:@"version"];
        
        NSLog(@"currentTemp = %@", currentTemp);
        
        NSString* currentVersion = [currentTemp stringByReplacingOccurrencesOfString:@"." withString:@""];
        NSString* propertyCurrentVersion =[[remoteContentProperties objectForKey:contentCurrentVersion] stringByReplacingOccurrencesOfString:@"." withString:@""];
        
        int nCurrentVersion	= [currentVersion intValue];
        int nPropertyCurrentVersion = [propertyCurrentVersion intValue];
        
        NSLog(@"nCurrentVersion = %d", nCurrentVersion);
        NSLog(@"nPropertyCurrentVersion = %d", nPropertyCurrentVersion);
        
        if(nPropertyCurrentVersion == 0)
        { // 현재 property file version이 0 일때. 무조건 다운로드
           //gclee release
            //return NO;
            return YES;
        }
        else if(nPropertyCurrentVersion < nCurrentVersion)
        {// 현재 버전이 최소 버전보다 낮을때 다운로드
            return YES;
        }
        else
        {
            return NO;
        }
    }
    else
    {
        //통신 오류
        //[indicatorView stopAnimating];
        NSString *errorMessage = [NSString stringWithFormat:@"%@(%ld)%@", httpErrorMessage , (long)statusCode ,reTrymessage];
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:nil
                                                        message:errorMessage
                                                       delegate:self
                                              cancelButtonTitle:@"확인"
                                              otherButtonTitles:nil];
        [alert setTag:networkErrorAlertTag];
        [alert show];
        [alert release];
        
        return NO;
    }
    [stringReply release];
    
    return YES;
    
}

#pragma mark request -content Ver 체크
-(void)requestContentVer
{
    NSLog(@"requestContentVer");
	currentStep = rcVerCheck;
	
	NSString* postStringBody = nil;
    NSData *postData = nil;
	NSError *error;
    NSURLResponse *response;
    NSHTTPURLResponse *httpResponse;
    NSData *dataReply;
    id stringReply;
    
    //gclee
    //CIP쪽 현재 가지고 있는 컨텐트가 최신 버전일 경우 리모트 컨텐트 매니져 종료
    BOOL isUpdate;
    isUpdate = [self isUpdateContentToCIP];
    NSLog(@"isUpdate value = %d", isUpdate);
    if(!isUpdate){
        [self finishRemoteContentManage];
    }
    //gclee end
    
    self.serverUrl = [remoteContentProperties objectForKey:server_url];
	
	NSMutableDictionary * contentInfo = [[NSMutableDictionary alloc] init];
	[contentInfo setObject:@"" forKey:@"userid"];
//    [contentInfo setObject:[AlopexUtil getURLScheme] forKey: @"appid"];
	[contentInfo setObject:@"com.alopex.android.template" forKey: @"appid"];
	[contentInfo setObject:rcVersionCheck_serviceID forKey:@"serviceid"];
    
	postStringBody = [contentInfo JSONFragment];
//    NSLog(postStringBody);
	[contentInfo release];
	postData = [postStringBody dataUsingEncoding:NSUTF8StringEncoding];
	NSString* rcVerCheckURL = [NSString stringWithFormat:@"%@%@" , self.serverUrl, rcVersionCheckURL];
	NSURL * url = [NSURL URLWithString: rcVerCheckURL];
    NSLog(@"postData = %@ , %@" , postStringBody , url);
	NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url
														   cachePolicy:NSURLRequestUseProtocolCachePolicy timeoutInterval:30];
	[request setHTTPMethod: @"POST"];
	[request setHTTPBody:postData];
	[request setValue:@"text/xml" forHTTPHeaderField:@"Accept"];
	
	[indicatorView startAnimating];
	
	//sync request
	dataReply = [NSURLConnection sendSynchronousRequest:request returningResponse:&response error:&error];
    NSLog(@"dataReply  : %@" , dataReply);
	
	if(dataReply == nil)
	{
		//[indicatorView stopAnimating];
		UIAlertView *alert = [[UIAlertView alloc] initWithTitle:nil
                                                        message:networkErrorMessage1
                                                       delegate:self
                                              cancelButtonTitle:@"확인"
                                              otherButtonTitles:nil];
        
		[alert setTag:networkErrorAlertTag];
		[alert show];
		[alert release];
		
		return;
	}
	//[indicatorView stopAnimating];
	stringReply = (NSString *)[[NSString alloc] initWithData:dataReply encoding:NSUTF8StringEncoding];
	
	NSLog(@"stringReply : %@" , stringReply);
	
	httpResponse = (NSHTTPURLResponse *)response;
    NSInteger statusCode = [httpResponse statusCode];
	
	NSLog(@"httpResponse : %@" , httpResponse);
	
	NSMutableDictionary *RCVersionCheckResponseData = [stringReply JSONFragmentValue];
	
	if(statusCode == 200)
	{
        NSString* minVersion = [[RCVersionCheckResponseData objectForKey:MIN_VERSION] stringByReplacingOccurrencesOfString:@"." withString:@""];
		NSString* currentVersion = [[RCVersionCheckResponseData objectForKey:RC_CURRENT_VERSION] stringByReplacingOccurrencesOfString:@"." withString:@""];
		NSString* propertyCurrentVersion =[[remoteContentProperties objectForKey:contentCurrentVersion] stringByReplacingOccurrencesOfString:@"." withString:@""];
		
		int nMinVersion = [minVersion intValue];
		int nCurrentVersion	= [currentVersion intValue];
		int nPropertyCurrentVersion = [propertyCurrentVersion intValue];
        
        NSLog(@"nMinVersion = %d", nMinVersion);
        NSLog(@"nCurrentVersion = %d", nCurrentVersion);
        NSLog(@"nPropertyCurrentVersion = %d", nPropertyCurrentVersion);
		
		self.contentDawnLoadInfo = stringReply;
        NSLog(@"contentDownloadInfo = %@", stringReply);
		
        //test
        //[self finishRemoteContentManage];
        //test end
        
		if(nPropertyCurrentVersion == 0)
		{ // 현재 property file version이 0 일때. 무조건 다운로드
			//필수 업데이트
			UIAlertView *alert = [[UIAlertView alloc] initWithTitle:nil
                                                            message:firstContentDawnLoadMessage
                                                           delegate:self
                                                  cancelButtonTitle:@"확인"
                                                  otherButtonTitles:nil];
			[alert setTag:mustContentUpDateAlertTag];
            
			[alert show];
			[alert release];
		}
		else if(nPropertyCurrentVersion < nMinVersion)
		{// 현재 버전이 최소 버전보다 낮을때 다운로드
			//필수 업데이트
			UIAlertView *alert = [[UIAlertView alloc] initWithTitle:nil
                                                            message:mustContentUpDateAlertMessage
                                                           delegate:self
                                                  cancelButtonTitle:@"확인"
                                                  otherButtonTitles:nil];
			[alert setTag:mustContentUpDateAlertTag];
            
			[alert show];
			[alert release];
		}
		else
		{
			if(nPropertyCurrentVersion < nCurrentVersion)
			{
				// 선택적 업그레이드
				UIAlertView *alert = [[UIAlertView alloc] initWithTitle:nil
                                                                message:optionContentUpDateAlertMessage
                                                               delegate:self
                                                      cancelButtonTitle:@"취소"
                                                      otherButtonTitles:@"확인" ,nil];
				[alert setTag:optionContentUpDateAlertTag];
				[alert show];
				[alert release];
                
			}
			else
			{
				//현재 가지고 있는 컨텐트가 최신 버전일 경우 리모트 컨텐트 매니져 종료
				[self finishRemoteContentManage];
			}
		}
	}
	else
	{
		//통신 오류
		//[indicatorView stopAnimating];
		NSString *errorMessage = [NSString stringWithFormat:@"%@(%ld)%@", httpErrorMessage , (long)statusCode ,reTrymessage];
		UIAlertView *alert = [[UIAlertView alloc] initWithTitle:nil
                                                        message:errorMessage
                                                       delegate:self
                                              cancelButtonTitle:@"확인"
                                              otherButtonTitles:nil];
		[alert setTag:networkErrorAlertTag];
		[alert show];
		[alert release];
	}
	[stringReply release];
}

#pragma mark contentDawnLoad
-(void)contentDawnLoad
{
    NSLog(@"contentDawnLoad");
	currentStep =  contentsDawnLoad;
	
	NSMutableDictionary *responseDicData = [self.contentDawnLoadInfo JSONFragmentValue];
    NSLog(@"down responseDicData = %@", responseDicData);
	// 유효한 요청인지 확인하기 위해 키 생성
	NSString* token = [responseDicData objectForKey:TOKEN];
    NSLog(@"down token = %@", token);
    
	NSString* cypherString = [[NSString alloc] initWithFormat:@"%@%@" , [self getCurrentDate] , CYPHERSTRING]; // 현재 날짜 + NEXCOREMOBILEAPP
	
	AESUtil* aes = [[AESUtil alloc]init];
	NSString *cypherData = [aes aesEncryptString:cypherString key:token]; // 생성한스트링 전달받은 토큰으로 AES 암호화
	
	NSString* propertyCurrentVersion = [remoteContentProperties objectForKey:contentCurrentVersion];
	
	NSString* downloadURL = [[NSString alloc]initWithFormat:@"%@%@?key=%@&version=%@&appid=%@" ,self.serverUrl,contentDawnLoadURL ,cypherData, propertyCurrentVersion , @"com.alopex.android.template" ];

	
	NSURL * url = [NSURL URLWithString:downloadURL];
    NSLog(@"download url = %@", url);
    
 	NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url
                                                           cachePolicy:NSURLRequestUseProtocolCachePolicy timeoutInterval:5];
    
//    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url
//                                                           cachePolicy:NSURLRequestUseProtocolCachePolicy timeoutInterval:30];

    
    [request setHTTPMethod: @"POST"];
    [request setHTTPBody:nil];
    [request setValue:@"text/xml" forHTTPHeaderField:@"Accept"];
    
	//다운로드 요청
	self.downLoadConnection = [NSURLConnection connectionWithRequest:request delegate:self ];
	
	[aes release];
	[downloadURL release];
	[cypherString release];
}

#pragma mark alertView delegate
- (void)alertView:(UIAlertView *)alertView didDismissWithButtonIndex:(NSInteger)buttonIndex; // before animation and hiding view
{
	NSInteger alertViewTag = alertView.tag;
	
	switch (alertViewTag) {
		case mustAppUpDateAlertTag:
		{ // 필수 앱 업데이트
			[self appUpDate];
		}
            break;
		case optionAppUpDateAlertTag:
		{ //선택 앱 업데이트
			if(buttonIndex == 1) // 확인
			{
				[self appUpDate];
			}
			else
			{
				//컨텐트 버전 정보 얻어오기 진행
				[self requestContentVer];
			}
		}
            break;
		case mustContentUpDateAlertTag:
		{ //필수 컨덴트 다운로드
			[self contentDawnLoad];
		}
            break;
		case optionContentUpDateAlertTag:
		{ //선택 앱 업데이트
			if(buttonIndex == 1) // 확인
			{
				// 컨텐트 업데이트진행
				[self contentDawnLoad];
			}
			else
			{
				//remoteContentManager 종료
				[self finishRemoteContentManage];
			}
		}
            break;
		case networkErrorAlertTag:
		{ //네트워크 에러
            //exit(0);
            switch (currentStep)
            {
                case appVerCheck:
                    [self requesHTTPRemoteContent];
                    break;
                case rcVerCheck:
                    [self requestContentVer];
                    break;
                case contentsDawnLoad:
                    [self contentDawnLoad];
                    break;
            }
		}
            break;
		case unZipErrorAlertTag:
		{ //unzipError
            //exit(0);
		}
            break;
		case contetnCopyErrorAlertTag:
		{//컨텐트 복사중 오류
			[self removeContentFile];
			// 컨텐트 업데이트진행
			[self initContentFile];
            //			if(buttonIndex == 1) // 확인
            //			{
            //				// 컨텐트 업데이트진행
            //				[self initContentFile];
            //			}
            //			else
            //			{
            //				exit(0);
            //			}
		}
            break;
		case downloadCancelAlertTag:
		{
			[self contentDawnLoad];
		}
            break;
		default:
            break;
	}
}

#pragma mark AppUpdate
-(void)appUpDate
{
    NSLog(@"appUpDate");
	// 앱 업데이트진행
	//마켓앱 있는지 확인
	NSString* marketID =  [NSString stringWithFormat: @"%@://", [remoteContentProperties objectForKey:marketApp_ID]];
	if([[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:marketID]]) // 마켓앱 있으면 마켓앱 호출
	{
		NSURL *url = [NSURL URLWithString:marketID];
		[[UIApplication sharedApplication] openURL: url];
		//exit(0);
	}
	else //마켓앱 없으면 브라우져 실행
	{
		NSString *stringURL = [remoteContentProperties objectForKey:marketDawnLoadURL];
		NSURL *url = [NSURL URLWithString:stringURL];
		[[UIApplication sharedApplication] openURL:url];
		
		//exit(0);
	}
    
}
#pragma mark downLoad connectionDelegate
- (void)connection:(NSURLConnection *)connection didReceiveData:(NSData *)data {
	// 컨텐트 파일 다운로드 : 총받아야 하는 컨텐트 크기를 기준으로 progress bar생성
	[downloadReceivedData appendData:data];
    
    float newProgress = 0.0f;
	if(totalContentLength > 0 )
	{
		newProgress = [self.downloadReceivedData length];
		
		float percentage = newProgress/totalContentLength;
		progress.progress = percentage;
		if((int)(percentage*100) == 99)
		{
			label.text =  @"100%";
			return;
		}
		label.text = [NSString stringWithFormat:@"%i%@",(int)(percentage*100) , @"%"];
	}
}

- (void)connection:(NSURLConnection *)connection didReceiveResponse:(NSURLResponse *)aResponse
{
	NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *)aResponse;
	NSInteger statusCode = [httpResponse statusCode];
	NSLog(@"HTTP Response Headers %@", [httpResponse allHeaderFields] );
	NSLog(@"HTTP Response Headers contentLength %@", [[httpResponse allHeaderFields] objectForKey:@"Content-Length"]);
	NSLog(@"HTTP Status code: %ld", (long)statusCode);
	totalContentLength = [[[httpResponse allHeaderFields] objectForKey:@"Content-Length"] floatValue];
	contentEntryCnt =[[[httpResponse allHeaderFields] objectForKey:@"ZipEntryCount"] intValue];
	if (contentEntryCnt ==0) {
		contentEntryCnt =[[[httpResponse allHeaderFields] objectForKey:@"Zipentrycount"] intValue];
	}
	//NSLog(@"zipEntityCnt!!!!!!!!!!! %d" , contentEntryCnt);
	
	downloadReceivedData = [[NSMutableData alloc] init];
	[downloadReceivedData setLength:0];
	
	if(statusCode == 200)
	{
		if(contentEntryCnt  > 0)
		{
            //zip파일 안에 변경된 컨텐츠 있을 때
			CGRect screenBounds = [ [ UIScreen mainScreen ] bounds ];
			int wid=300;
			int hei=70;
			int x=(screenBounds.size.width-wid)/2;
			int y=(screenBounds.size.height-hei)/2;
			progressView = [[UIView alloc] initWithFrame:CGRectMake(x, y, wid, hei)];
			progressView.backgroundColor = [UIColor blackColor];
			
			progressView.alpha = 0.8;
			
			progress = [[UIProgressView alloc] initWithFrame:CGRectMake(x+20, y+20, wid-50, 10.0)];
			progress.progress = 0.0;
			
			label = [[UILabel alloc] initWithFrame:CGRectMake(x+20, y+35, 120.0, 20.0)];
			
			label.backgroundColor = [UIColor clearColor];
			
			label.textColor = [UIColor whiteColor];
			label.text = @"connecting...";
			
            //			closeButton = [UIButton buttonWithType:UIButtonTypeRoundedRect];
            //			[closeButton setTitle:@"Cancel" forState:UIControlStateNormal];
            //			[closeButton addTarget:self action:@selector(downstop) forControlEvents:UIControlEventTouchUpInside];
            //			closeButton.titleLabel.text = @"Cancel";
            //			closeButton.titleLabel.textColor = [UIColor whiteColor];
            //
            //			closeButton.frame = CGRectMake(x+200+30, y+15, 60, 20);
			
			[self.view addSubview:progressView];
			[self.view addSubview:progress];
			[self.view addSubview:label];
            //			[self.view addSubview:closeButton];
		}else{
            [self appDelegate].isApplicationWillEnterForeground = NO;  //리모트컨텐츠 업데이트 했으므로 처음부터 다시실행해야 하므로
			[self finishRemoteContentManage];
		}
        
	}
	else
	{
		//[indicatorView stopAnimating];
		NSString *errorMessage = [NSString stringWithFormat:@"%@(%ld)%@" , httpErrorMessage , (long)statusCode, reTrymessage];
		UIAlertView *alert = [[UIAlertView alloc] initWithTitle:nil
                                                        message:errorMessage
                                                       delegate:self
                                              cancelButtonTitle:@"확인"
                                              otherButtonTitles:nil];
		[alert setTag:networkErrorAlertTag];
		[alert show];
		[alert release];
	}
}

- (void)connectionDidFinishLoading:(NSURLConnection *)connection_ {
	[self removeDownloadProgressView];
	[indicatorView startAnimating];
	[self performSelector:@selector(unzipcontentFile) withObject:nil afterDelay:1.0];
}

- (void)unzipcontentFile
{
	NSMutableDictionary *responseDicData = [self.contentDawnLoadInfo JSONFragmentValue];
	NSString *filePath = [[AlopexUtil getRemoteDawnLoadPath] stringByAppendingPathComponent:@"www.zip"];
	NSLog(@"filePath %@" ,filePath);
	NSURL *fileURL  = [NSURL fileURLWithPath:filePath];
	NSError  *writeError = nil;
	NSError	 *error = nil;
	
    //Save to disk
	[downloadReceivedData writeToURL:fileURL options:0 error:&writeError];
	[downloadReceivedData setLength:0];
	
	if(writeError)
	{
		//에러 처리
        NSLog(@"unzipcontentFile error");
	}
	else
	{
		BOOL rtnValue = NO;
		ZipArchive* zipHandler = [[ZipArchive alloc] init];
		NSString* unZipfilePath = [[NSString alloc] initWithFormat:@"%@/%@" ,[AlopexUtil getRemoteDawnLoadPath], WWWFOLDER_NAME ];
        NSString* tempfilePath = [[NSString alloc] initWithFormat:@"%@/%@" ,[AlopexUtil getRemoteDawnLoadPath], @"tempwww" ];
		
		if(![[NSFileManager defaultManager] fileExistsAtPath: filePath] || contentEntryCnt == 0 )// www.zip이 없을때
		{
			[zipHandler release];
			[unZipfilePath release];
            [tempfilePath release];
			return;
		}
        
		if([zipHandler UnzipOpenFile:filePath])
		{
            if(useEncrypt)
            {
                rtnValue = [zipHandler UnzipFileTo:tempfilePath overWrite:YES];
                if(rtnValue)
                {
                    NSFileManager *fileMgr = [NSFileManager defaultManager];
                    [fileMgr removeItemAtPath:filePath error:&error];
                    
                    NSLog(@"tempfilePath = %@ , unZipfilePath = %@" , tempfilePath , unZipfilePath);
                    
                    rtnValue = [ARCEFile initAlopexContents:tempfilePath outFile:unZipfilePath];
                    
                    [fileMgr removeItemAtPath:tempfilePath error:&error];
                }
            }
            else
            {
                rtnValue = [zipHandler UnzipFileTo:unZipfilePath overWrite:YES];
            }
		}
		//file 압축이 정상적으로 되었을때. property파일의 contentVersion 갱신
		if(rtnValue == YES)
		{
			//[indicatorView stopAnimating];
			//다운받은 zip file삭제
			NSFileManager *fileMgr = [NSFileManager defaultManager];
			[fileMgr removeItemAtPath:filePath error:&error];
            
			//propertyFile 갱신
			NSString* currentVersion = [responseDicData objectForKey:RC_CURRENT_VERSION];
			[remoteContentProperties setObject:currentVersion forKey:contentCurrentVersion];
			
			[self updateRemoteContentProperty];
            
			[self appDelegate].isApplicationWillEnterForeground = NO;  //리모트컨텐츠 업데이트 했으므로 처음부터 다시실행해야 하므로
			[self finishRemoteContentManage];
		}
		else
		{
			//[indicatorView stopAnimating];
			//unzipError
			UIAlertView *alert = [[UIAlertView alloc] initWithTitle:nil
															message:unZipErrorMessage
														   delegate:self
												  cancelButtonTitle:@"확인" 
												  otherButtonTitles:nil];
			[alert setTag:unZipErrorAlertTag];
			[alert show];
			[alert release];
		}
		
        [tempfilePath release];
		[unZipfilePath release];
		[zipHandler release];
	}
}

- (void)connection:(NSURLConnection *)connection didFailWithError:(NSError *)error {
	//error  처리 
	UIAlertView *alert = [[UIAlertView alloc] initWithTitle:nil
													message:networkErrorMessage
												   delegate:self
										  cancelButtonTitle:@"확인" 
										  otherButtonTitles:nil];
	[alert setTag:networkErrorAlertTag];
	[alert show];
	[alert release];		
}	

- (void)cancelDownload
{
    //    label.text = @"Canceled!";
	if(self.downLoadConnection != nil)
	{
		[self.downLoadConnection cancel];
	}
    
	[self removeDownloadProgressView];
    [self removeContentFile];
    
}

-(void)removeDownloadProgressView
{
	[progress removeFromSuperview];
	[label removeFromSuperview];
	[progressView removeFromSuperview];
	
	//[closeButton release];
	[progress release];
	[label release];
	[progressView release];
}

#pragma mark getCurrentDate 
-(NSString*)getCurrentDate
{
	NSDate *today = [NSDate date];
	NSDateFormatter *dateFormat = [[[NSDateFormatter alloc] init] autorelease];
	[dateFormat setDateFormat:@"yyyyMMddHHmmss"];
	NSString *dateString = nil;
	dateString =  [dateFormat stringFromDate:today];
	
	return dateString;
}

#pragma mark dissmiss selfView
-(void)finishRemoteContentManage
{
	[indicatorView stopAnimating];
    
    if ([self appDelegate].isApplicationWillEnterForeground) {
        //Application을 Resume한 상태이고 업데이트를 하지 않거나 업데이트 내용이 없는 경우 Resume에 대한 callback을 실행
        [[self appDelegate] applicationWillEnterForegroundCallback];
    } else {
        //앱이 처음 실행될 때 리모트 컨텐츠를 실행한 경우나, Resume한 상태에서 리모트 콘텐츠를 실행한 후 업데이트를 한 경우
        [self.view removeFromSuperview];
        [self appDelegate].mNavigationManager.mNavController = nil;
        [[self appDelegate] loadFirstPage];
    }
}

#pragma mark get appDelegate
- (AlopexManager *)appDelegate
{
	return [[UIApplication sharedApplication] delegate];
}

#pragma mark dealloc
- (void)dealloc {
	self.remoteContentProperties = nil;
	self.contentDawnLoadInfo = nil;
	self.serverUrl = nil;
	self.indicatorView = nil;
	if(self.downLoadConnection != nil)
	{
		self.downLoadConnection = nil;
	}
	[ super dealloc ];
}


@end
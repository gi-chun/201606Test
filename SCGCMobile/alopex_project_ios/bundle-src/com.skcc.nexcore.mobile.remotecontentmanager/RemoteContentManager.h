/* 
 * Copyright (c) 2012 SK C&C Co., Ltd. All rights reserved. 
 * 
 * This software is the confidential and proprietary information of SK C&C. 
 * You shall not disclose such confidential information and shall use it 
 * only in accordance with the terms of the license agreement you entered into 
 * with SK C&C.
 */

#import <UIKit/UIKit.h>

@interface RemoteContentManager : UIViewController<UIAlertViewDelegate>
{
	NSMutableDictionary* remoteContentProperties;
	NSString* contentDawnLoadInfo;
	NSString* serverUrl;
	
	//contentDawnload관련 
	NSURLConnection* downLoadConnection;
	NSMutableData* downloadReceivedData;

	float totalContentLength; // 다운받을 총 content 크기 
	int contentEntryCnt;	// 다운받을 파일 갯수 
	
	UIProgressView* progress; 
    UILabel* label;
    UIButton* closeButton;
    
    UIView *progressView;
	UIActivityIndicatorView* indicatorView;
	
	int currentStep;
    BOOL useEncrypt;
}

@property (nonatomic, retain) NSMutableDictionary* remoteContentProperties;
@property (nonatomic, retain) NSString* contentDawnLoadInfo;
@property (nonatomic, retain) NSMutableData* downloadReceivedData;
@property (nonatomic, retain) NSURLConnection* downLoadConnection;
@property (nonatomic, retain) NSString* serverUrl;
@property (nonatomic, retain) UIActivityIndicatorView* indicatorView;

-(void)setPropertyData:(NSMutableDictionary *)properties;

-(void)requesHTTPRemoteContent;
-(void)requestContentVer;
-(void)contentDawnLoad;
-(BOOL)isUpdateContentToCIP;

-(void)initContentFile;
-(BOOL)copyWWWFile;
-(BOOL)removeContentFile;
-(BOOL)needsUpdate;
-(NSString*)getCurrentDate;
-(void)finishRemoteContentManage;

- (void)unzipcontentFile;
- (void)cancelDownload;
-(void)removeDownloadProgressView;
-(void)appUpDate;

-(AlopexManager*) appDelegate;

@end

/*
 * Copyright (c) 2012 SK C&C Co., Ltd. All rights reserved.
 *
 * This software is the confidential and proprietary information of SK C&C.
 * You shall not disclose such confidential information and shall use it
 * only in accordance with the terms of the license agreement you entered into
 * with SK C&C.
 */

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface Http : NSObject{
    double _timeout;
}

@property (nonatomic, assign) double timeout;

//external Caller func
-(void)request:(NSMutableDictionary*)aEntity target:(id)target successCallback:(NSString*)aSuccessCallback errorCallback:(NSString*)aErrorCallback;
-(void)request:(NSMutableDictionary*)aEntity target:(id)target successCallback:(NSString*)aSuccessCallback errorCallback:(NSString*)aErrorCallback extensionObj:(id)extensionTarget; //deprecated
-(void)setRequestHeaders:(NSString *)value key:(NSString *)key;
-(void)upload:(NSMutableDictionary*)aEntity target:(id)target successCallback:(NSString*)aSuccessCallback errorCallback:(NSString*)aErrorCallback progressCallback:(NSString*)aProgressCallback cancelCallback:(NSString*)aCancelCallback;
-(void)download:(NSMutableDictionary*)aEntity target:(id)target successCallback:(NSString*)aSuccessCallback errorCallback:(NSString*)aErrorCallback progressCallback:(NSString*)aProgressCallback cancelCallback:(NSString*)aCancelCallback;
-(NSMutableDictionary*)getResponseHeader;

-(NSString *) requestGet:(NSString*)urlStr;
-(void)requestGetAsync:(NSString*)urlStr target:(id)aTarget successSelector:(SEL)successSelector errorSelector:(SEL)errorSelect;
- (NSString *) requestPost:(NSString*)urlStr params: (NSMutableDictionary*)params;
-(void)requestPostAsync:(NSString*)urlStr params: (NSMutableDictionary*)params target:(id)aTarget successSelector:(SEL)successSelector errorSelector:(SEL)errorSelect;
-(NSString *) requestPost:(NSString*)urlStr requestBody:(NSString*)requestBody contentType:(NSString*)contentType;
-(void)requestPostAsync:(NSString*)urlStr requestBody:(NSString*)requestBody contentType:(NSString*)contentType target:(id)aTarget successSelector:(SEL)successSelector errorSelector:(SEL)errorSelect;
-(NSString *) requestUploadFile:(NSString*)urlStr requestData:(NSData*)requestData filename:(NSString*)filename;
- (void) requestUploadFileAsync:(NSString*)urlStr requestData:(NSData*)requestData filename:(NSString*)filename target:(id)aTarget successSelector:(SEL)successSelector errorSelector:(SEL)errorSelect;
-(NSData *) requestGetData:(NSString*)urlStr;
-(void)requestGetAsyncData:(NSString*)urlStr target:(id)aTarget successSelector:(SEL)successSelector errorSelector:(SEL)errorSelect;
-(void)requestGetAsyncDataWithParameter:(NSString*)urlStr target:(id)aTarget successSelector:(SEL)successSelector errorSelector:(SEL)errorSelect parameter: (id)aParameter;

-(void)asyncXml: (NSData*) myData;
-(void)requestXml: (NSString*)urlStr delegate: (id)delegate;
-(void)requestXmlAsync: (NSString*)urlStr delegate: (id)delegate;

-(id)request:(NSString*)urlStr requestBody:(NSString*)requestBody 
		method:(NSString*)method contentType:(NSString*)contentType sync:(BOOL)sync
   requestData:(NSData*)requestData filename:(NSString*)filename 
		target:(id)aTarget successSelector:(SEL)sussessSelector errorSelector:(SEL)errorSelector isData: (BOOL)tmpIsData;
- (void)OnTimer;
- (void) cancel;

+ (NSString *) urlEncoding: (NSString *) actionString;
+ (NSString *) javascriptStringEncoding: (NSString *) aContent;


//deprecated
-(void)extensionDelegateHandle:(id)obj;

@end

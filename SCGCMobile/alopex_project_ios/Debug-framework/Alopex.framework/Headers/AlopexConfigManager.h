/*
 * Copyright (c) 2012 SK C&C Co., Ltd. All rights reserved.
 *
 * This software is the confidential and proprietary information of SK C&C.
 * You shall not disclose such confidential information and shall use it
 * only in accordance with the terms of the license agreement you entered into
 * with SK C&C.
 */

#import <Foundation/Foundation.h>

@interface AlopexConfigManager : NSObject {
    NSMutableDictionary *mPages;            // alopexConfig.xml 정보 
    NSString *mStartPage;                   // alopexConfig.xml 에 지정된 첫 페이지
    NSString *mGlobalPageOrientation;       // URL사용해서 네비게이트 할 경우 프로젝트 전체 설정으로 입력받은 화면 Orientation (등록안하면 portrait)
    NSString *mGlobalPageType;              // URL사용해서 네비게이트 할 경우 프로젝트 전체 설정으로 입력받은 화면 타입( 등록안하면 local로 판단)
    NSString *mGlobalPageContainer;         // URL사용해서 네비게이트 할 경우 프로젝트 전체 설정으로 입력받은 화면 컨테이너 (optional)
    BOOL mUseLoadingView;                  //loadingView를 사용할지 여부
    NSMutableDictionary *projectInfo;
    BOOL mExistPageID;
    NSString *mGlobalPageBaseURL;
}

@property(nonatomic, retain) NSMutableDictionary *mPages;
@property(nonatomic, retain) NSString *mStartPage;
@property(nonatomic, retain) NSString *mGlobalPageOrientation;
@property(nonatomic, retain) NSString *mGlobalPageType;
@property(nonatomic, retain) NSString *mGlobalPageContainer;
@property(nonatomic, assign) BOOL mExistPageID;
@property(nonatomic, assign) BOOL mUseLoadingView;
@property(nonatomic, retain) NSMutableDictionary *projectInfo;
@property(nonatomic, retain) NSString *mGlobalPageBaseURL;

+(id)getInstance;
+(void)deGenerate;
-(void)loadConfig;
-(void)configDidLoaded:(NSMutableDictionary *) aConfig;

-(BOOL)existPageID:(NSString*)pageId;

-(NSString*)getType:(NSString*)pageId;
-(NSString*)getUri:(NSString*)pageId;
-(NSString*)getOrientation:(NSString*)pageId;
-(NSString*)getIsChageOrientation:(NSString*)pageId;
-(NSString*)getSkipPage:(NSString*)pageId;
-(NSString*)getContainer:(NSString*)pageId;
-(NSMutableArray*)getExtentionInfoList:(NSString*)pageId;
-(NSString*)getGlobalPageOrientation;
-(NSString*)getGlobalPageType;
-(NSString*)getGlobalPageContainer;
-(NSString*)getGlobalPageBaseURL;

@end

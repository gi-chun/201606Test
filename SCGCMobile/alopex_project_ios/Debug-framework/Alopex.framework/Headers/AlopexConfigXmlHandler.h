/*
 * Copyright (c) 2012 SK C&C Co., Ltd. All rights reserved.
 *
 * This software is the confidential and proprietary information of SK C&C.
 * You shall not disclose such confidential information and shall use it
 * only in accordance with the terms of the license agreement you entered into
 * with SK C&C.
 */

#import <Foundation/Foundation.h>
#import "BaseXmlHandler.h"
#import "PageModel.h"


@interface AlopexConfigXmlHandler : BaseXmlHandler{
    NSMutableDictionary *mConfigList;
    NSString* mStartPage;
    NSMutableDictionary *mPageList;
    NSMutableDictionary *mProjectInfo;
	PageModel* pageInfo;
    BOOL   existPageID;
}

@property(nonatomic, retain) NSMutableDictionary* mConfigList;
@property(nonatomic, retain) NSString* mStartPage;
@property(nonatomic, retain) NSMutableDictionary *mPageList;
@property(nonatomic, retain) NSMutableDictionary *mProjectInfo;
@property(nonatomic, retain) PageModel* pageInfo;
@property(nonatomic, assign) BOOL existPageID;

@end

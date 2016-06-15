/*
 * Copyright (c) 2012 SK C&C Co., Ltd. All rights reserved.
 *
 * This software is the confidential and proprietary information of SK C&C.
 * You shall not disclose such confidential information and shall use it
 * only in accordance with the terms of the license agreement you entered into
 * with SK C&C.
 */

#import <Foundation/Foundation.h>


@interface PageModel : NSObject {
    NSString* mId;
    NSString* mType;
    NSString* mUri;
    NSString* mOrientation;
    
    NSString* mChangeOrientation;
    NSString* mSkipPage;
    NSString* mContainer;
	
	NSMutableArray* mExtentionInfoList;
}
  

@property(nonatomic, retain) NSString* mId;
@property(nonatomic, retain) NSString* mType;
@property(nonatomic, retain) NSString* mUri;
@property(nonatomic, retain) NSString* mOrientation;
@property(nonatomic, retain) NSString* mChangeOrientation;
@property(nonatomic, retain) NSString* mSkipPage;
@property(nonatomic, retain) NSString* mContainer;
@property(nonatomic, retain) NSMutableArray* mExtentionInfoList;
 
@end

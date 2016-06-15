/*
 * Copyright (c) 2012 SK C&C Co., Ltd. All rights reserved.
 *
 * This software is the confidential and proprietary information of SK C&C.
 * You shall not disclose such confidential information and shall use it
 * only in accordance with the terms of the license agreement you entered into
 * with SK C&C.
 */

#import <Foundation/Foundation.h>
#import "AlopexDefaultWebviewClient.h"

@interface AlopexWebviewClient:AlopexDefaultWebviewClient
{
    BOOL _isRemote;
    BOOL _isUseLoadImage;
	BOOL _bLoadImageAutoDismiss;
    id _target;
}


@property(nonatomic, assign) BOOL isRemote;
@property(nonatomic ,assign) BOOL isUseLoadImage;
@property(nonatomic, assign) BOOL bLoadImageAutoDismiss;
@property(nonatomic ,assign) id target;

@end

/*
 * Copyright (c) 2012 SK C&C Co., Ltd. All rights reserved.
 *
 * This software is the confidential and proprietary information of SK C&C.
 * You shall not disclose such confidential information and shall use it
 * only in accordance with the terms of the license agreement you entered into
 * with SK C&C.
 */

#import <Foundation/Foundation.h>
#import <Alopex/AbstractJSNI.h>
#import "PaymentCtl.h"

@interface PaymentJSNI : AbstractJSNI<paymentCtlDelegate>

- (void)showPaymentCtl:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
- (void)setPushToken:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
- (void)callISPApp:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
- (void)paymentCtlSuccessCallback:(NSString *)result;
- (void)touchCloseButton;
@end

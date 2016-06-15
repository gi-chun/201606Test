/*
 * Copyright (c) 2012 SK C&C Co., Ltd. All rights reserved.
 *
 * This software is the confidential and proprietary information of SK C&C.
 * You shall not disclose such confidential information and shall use it
 * only in accordance with the terms of the license agreement you entered into
 * with SK C&C.
 */

#import <UIKit/UIKit.h>
#import "ZXingObjC.h"

@protocol BarcodeReaderDelegate <NSObject>

@required
- (void)barcodeReadSuccessCallback:(NSString *)result;
- (void)touchCloseButton;
@end

@interface BarcodeReaderViewController : UIViewController<ZXCaptureDelegate>{
	id<BarcodeReaderDelegate> _delegate;
}

@property(nonatomic, assign) id<BarcodeReaderDelegate> delegate;
@property (retain, nonatomic) IBOutlet UILabel *barcode_description;
@property (retain, nonatomic) IBOutlet UILabel *scanBar;
@property (retain, nonatomic) IBOutlet UIButton *closeButton;
@property (retain, nonatomic) IBOutlet UIButton *flashButton;
@property (retain, nonatomic) IBOutlet UILabel *flashStatus;

- (IBAction)touchCloseButtonHandler:(id)sender;
- (IBAction)touchFlashButtonHandler:(id)sender;
@end
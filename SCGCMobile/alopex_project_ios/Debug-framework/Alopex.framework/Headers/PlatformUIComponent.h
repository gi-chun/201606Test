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

@interface ProgressView : UIView {}

- (void)drawRect:(CGRect)rect;
- (CGGradientRef)normalGradient;

@end

@interface PlatformUIComponent : NSObject<UIPickerViewDelegate, UIPickerViewDataSource, UIActionSheetDelegate, UITableViewDataSource, UITableViewDelegate, UIPopoverControllerDelegate>{
    UIPopoverController *_popoverController;
}

@property (nonatomic, retain) UIPopoverController *popoverController;

+(PlatformUIComponent*)getIncetance;
-(void)showProgressDialog:(NSDictionary*)options target:(id)target;
-(void)dismissProgressDialog;
-(void)setProgress:(float)progress;
-(void)showProgressBarDialog:(NSDictionary*)options target:(id)target;
-(void)dismissProgressBarDialog;

-(void)showDatePicker:(id)target callback:(NSString*)callBack option:(NSDictionary*)options;
-(void)showDatePickerWithData:(NSDictionary*)date target:(id)target callback:(NSString*)callBack option:(NSDictionary*)options;
-(void)cancelDatePicker;

-(void)showTimePicker:(id)target callback:(NSString*)callBack option:(NSDictionary*)options;
-(void)showTimePickerWithData:(NSDictionary*)time target:(id)target callback:(NSString*)callBack option:(NSDictionary*)options;
-(void)cancelTimePicker;

-(void)showContextMenu:(NSArray*)menuItems option:(NSDictionary*)option target:(id)target callback:(NSString*)callBack;
-(void)cancelContextMenu;

-(void)showSingleSelect:(NSDictionary*)selectItem target:(id)target;
-(void)cancelSingleSelect;

-(void) showMultiSelect:(NSDictionary*)selection target:(id)target;
-(void) cancelMultiSelect;

-(void)showDialog:(ProgressView *)alertView;

@end

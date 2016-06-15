/*
 * Copyright (c) 2012 SK C&C Co., Ltd. All rights reserved.
 *
 * This software is the confidential and proprietary information of SK C&C.
 * You shall not disclose such confidential information and shall use it
 * only in accordance with the terms of the license agreement you entered into
 * with SK C&C.
 */


#import "AbstractJSNI.h"


@interface PlatformUIComponentJSNI : AbstractJSNI

-(void) showProgressDialog:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void) dismissProgressDialog:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

-(void) showProgressBarDialog:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void) dismissProgressBarDialog:(NSMutableArray*)argumentsb withDict:(NSMutableDictionary*)options;
-(void) setProgress:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

-(void) showDatePicker:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void) showDatePickerWithData:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void) cancelDatePicker:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

-(void) showTimePicker:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void) showTimePickerWithData:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void) cancelTimePicker:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

-(void) showContextMenu:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void) cancelContextMenu:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

-(void) showSingleSelect:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void) cancelSingleSelect:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

-(void) showMultiSelect:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void) cancelMultiSelect:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

-(void) dismissSoftKeyboard:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void) keyboardShown:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

@end

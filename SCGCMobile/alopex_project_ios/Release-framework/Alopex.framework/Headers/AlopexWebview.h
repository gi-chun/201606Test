/*
 * Copyright (c) 2012 SK C&C Co., Ltd. All rights reserved.
 *
 * This software is the confidential and proprietary information of SK C&C.
 * You shall not disclose such confidential information and shall use it
 * only in accordance with the terms of the license agreement you entered into
 * with SK C&C.
 */

#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>
#import "AlopexDef.h"

@class AlopexManager;

@interface AlopexWebview : UIWebView {
    
}

@end

#if ALOPEX_DEBUG

@interface DebugWebDelegate : NSObject{
	
}

@end

@interface DebugWebView : UIWebView{
	id windowScriptObject;
	id privateWebView;   
}

//- (AlopexManager*)appDelegate;
@end

#endif

//#else

//javascript에서 호출한 alert 창에 URL 표시 안되도록 수정 
@interface UIWebView (JavaScriptAlert){
	
}

//- (UIView*) hitTest:(CGPoint)point withEvent:(UIEvent *)event;
- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex;
- (AlopexManager*)appDelegate;
@end

//#endif

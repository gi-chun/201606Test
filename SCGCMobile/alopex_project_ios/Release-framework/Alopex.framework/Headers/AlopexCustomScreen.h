//
//  AlopexCustomScreen.h
//  alopex_runtime_iphone_lib
//
//  Created by alopex on 11. 10. 13..
//  Copyright 2011 __MyCompanyName__. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "AbstractAlopexWebViewContainerScreen.h"

@interface AlopexCustomScreen : AbstractAlopexWebViewContainerScreen <UIWebViewDelegate>

//native api set
-(void)navigate:(NSDictionary *)pageInfo;
-(void)back:(NSDictionary*)rtnValue;
-(void)backTo:(NSDictionary*)pageInfo;
-(void)goHome;

@end


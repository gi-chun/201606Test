//
//  NSString+URLEncoding.h.h
//  NetZine
//
//  Created by Jong Kwang Kim on 10. 6. 1..
//  Copyright 2010 Intigram. All rights reserved.
//

#import <Foundation/Foundation.h>


@interface NSString (OAURLEncodingAdditions)

- (NSString *)URLEncodedString;
- (NSString *)URLDecodedString;

@end
/*
 * Copyright (c) 2012 SK C&C Co., Ltd. All rights reserved.
 *
 * This software is the confidential and proprietary information of SK C&C.
 * You shall not disclose such confidential information and shall use it
 * only in accordance with the terms of the license agreement you entered into
 * with SK C&C.
 */

#import <UIKit/UIKit.h>
#import <CommonCrypto/CommonCryptor.h>
#import <CommonCrypto/CommonDigest.h>
#import <Security/Security.h>

@interface AESUtil: NSObject
{
}

- (NSData*) decodeHexString : (NSString *)hexString;
- (NSString *)hexEncode:(NSData *)data;
- (NSData *)AES128EncryptWithKey:(NSString *)key theData:(NSData *)Data;
- (NSData *) AES128DecryptWithKey:(NSString *)key theData:(NSData *)Data;
- (NSString*) aesEncryptString:(NSString*)textString key:(NSString*)key;
- (NSString*) aesDecryptString:(NSString*)textString key:(NSString*)key;

@end


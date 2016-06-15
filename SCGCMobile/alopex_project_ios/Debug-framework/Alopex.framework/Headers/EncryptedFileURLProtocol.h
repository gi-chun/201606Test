/*
 * Copyright (c) 2012 SK C&C Co., Ltd. All rights reserved.
 *
 * This software is the confidential and proprietary information of SK C&C.
 * You shall not disclose such confidential information and shall use it
 * only in accordance with the terms of the license agreement you entered into
 * with SK C&C.
 */

#import <Foundation/Foundation.h>
#import <CommonCrypto/CommonCryptor.h>

extern NSString * const ENCRYPTED_FILE_SCHEME_NAME;

@interface EncryptedFileURLProtocol : NSURLProtocol <NSStreamDelegate> {
    NSInputStream *inStream;
    uint8_t *inBuffer;
    uint8_t *outBuffer;
    CCCryptorRef cryptoRef;
}

@end

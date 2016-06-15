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

@interface Multimedia : NSObject<UIImagePickerControllerDelegate, UINavigationControllerDelegate>

+(Multimedia*)getIncetance;
-(void)deleteImage:(NSString*)path target:(id)target successCallback:(NSString*)successCallback errorCallback:(NSString*)errorCallback;
-(NSDictionary*)getImageOrientation:(NSString*)imagePath;
-(void)getPicture:(id)target successCallback:(NSString*)successCallback errorCallback:(NSString*)errorCallback option:(NSMutableDictionary*)option;
-(NSString*)resizePicture:(NSDictionary*)pictureInfo;
-(NSString*)rotateImage:(NSDictionary*)imageInfo;
-(void)saveImage:(NSString*)path target:(id)target successCallback:(NSString*)successCallback errorCallback:(NSString*)errorCallback;
-(void)takePicture:(id)target successCallback:(NSString*)successCallback errorCallback:(NSString*)errorCallback;

@end

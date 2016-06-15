/*
 * Copyright (c) 2012 SK C&C Co., Ltd. All rights reserved.
 *
 * This software is the confidential and proprietary information of SK C&C.
 * You shall not disclose such confidential information and shall use it
 * only in accordance with the terms of the license agreement you entered into
 * with SK C&C.
 */

#import <AudioToolbox/AudioToolbox.h>
#import <AVFoundation/AVFoundation.h>
#import "BarcodeReaderViewController.h"

@implementation UINavigationController(Rotation)

- (BOOL)shouldAutorotate
{
    return [self.topViewController shouldAutorotate];
}

- (NSUInteger)supportedInterfaceOrientations
{
    return [self.topViewController supportedInterfaceOrientations];
}

@end

@interface BarcodeReaderViewController (){
    ZXCapture *_capture;
}

@property (nonatomic, retain) ZXCapture *capture;

@end

@implementation BarcodeReaderViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    if (self) {
        if (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad){
            self = [super initWithNibName:@"BarcodeReaderViewController_ipad" bundle:nibBundleOrNil];
        }else{
            self = [super initWithNibName:@"BarcodeReaderViewController_iphone" bundle:nibBundleOrNil];
        }
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
    
    self.capture = [[[ZXCapture alloc] init] autorelease];
    self.capture.rotation = 90.0f;
    self.capture.camera = self.capture.back;
    
    self.capture.layer.frame = self.view.bounds;
    [self.view.layer addSublayer:self.capture.layer];
}

- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
    self.capture.delegate = self;
}

- (void)viewWillDisappear:(BOOL)animated {
    [super viewWillDisappear:animated];
    self.capture.delegate = nil;
    [self.capture.layer removeFromSuperlayer];
    self.capture = nil;
}

- (void)viewDidAppear:(BOOL)animated{
    [self transformCamera];
    
    self.barcode_description.hidden = NO;
    self.flashButton.hidden = NO;
    self.flashStatus.hidden = NO;
    self.closeButton.hidden = NO;
    self.scanBar.hidden = NO;
    
    [self.view bringSubviewToFront:self.barcode_description];
    [self.view bringSubviewToFront:self.flashButton];
    [self.view bringSubviewToFront:self.flashStatus];
    [self.view bringSubviewToFront:self.closeButton];
    [self.view bringSubviewToFront:self.scanBar];
    
    if (!self.capture.hasTorch) {
        self.flashButton.enabled = NO;
    }
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#pragma mark - View Rotate
- (BOOL)shouldAutorotate
{
    //NSLog(@"shouldAutorotate");
    return YES;
}

- (NSUInteger)supportedInterfaceOrientations
{
    //NSLog(@"supportedInterfaceOrientations");
    UIInterfaceOrientation statusBarOrientation = [[UIApplication sharedApplication] statusBarOrientation];
    UIInterfaceOrientation currentDeviceOrientation = [[UIDevice currentDevice] orientation];
    //NSLog(@"statusBarOrientation = %d, currentDeviceOrientation = %d", statusBarOrientation, currentDeviceOrientation);
    
    BOOL isPortrait = YES;
    BOOL isReversePortrait = YES;
    BOOL isLandscape = YES;
    BOOL isReverseLandscape = YES;

    NSUInteger rtnValue = 0;
    
    //statusBarOrientation과 currentDeviceOrientation 일치하지 않는 경우 currentDeviceOrientation을 statusBarOrientation과 일치하도록 변경
    if (statusBarOrientation != currentDeviceOrientation) {
        [[UIDevice currentDevice] performSelector:@selector(setOrientation:) withObject:(id)statusBarOrientation];
    }
    
    if( isPortrait ) {
        if (rtnValue != 0) {
            rtnValue = rtnValue | UIInterfaceOrientationMaskPortrait;
        } else{
            rtnValue = UIInterfaceOrientationMaskPortrait;
        }
    }
    
    if( isReversePortrait ) {
        if (rtnValue != 0) {
            rtnValue = rtnValue | UIInterfaceOrientationMaskPortraitUpsideDown;
        }else{
            rtnValue = UIInterfaceOrientationMaskPortraitUpsideDown;
        }
    }
    
    if( isLandscape ) {
        if (rtnValue != 0) {
            rtnValue = rtnValue | UIInterfaceOrientationMaskLandscapeRight;
        }else{
            rtnValue = UIInterfaceOrientationMaskLandscapeRight;
        }
    }
    
    if( isReverseLandscape ) {
        if (rtnValue != 0) {
            rtnValue = rtnValue | UIInterfaceOrientationMaskLandscapeLeft;
        }else{
            rtnValue = UIInterfaceOrientationMaskLandscapeLeft;
        }
    }
    
    /*
     portrait                   2
     reversePortrait            4
     portrait|reversePortrait   6
     landscape                  8
     reverseLandscape           16
     landscape|reverseLandscape 24
     */
    //NSLog(@"rtnValue = %d", rtnValue);
    return rtnValue;
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation) interfaceOrientation
{
    BOOL isPortrait = YES;
    BOOL isReversePortrait = YES;
    BOOL isLandscape = YES;
    BOOL isReverseLandscape = YES;
    
    if( isPortrait && (interfaceOrientation == UIInterfaceOrientationPortrait) ) {
        //NSLog(@"UIInterfaceOrientationPortrait");
        return YES;
    }
    if( isReversePortrait && (interfaceOrientation == UIInterfaceOrientationPortraitUpsideDown) ) {
        //NSLog(@"UIInterfaceOrientationPortraitUpsideDown");
        return YES;
    }
    if( isLandscape && (interfaceOrientation == UIInterfaceOrientationLandscapeRight) ) {
        //NSLog(@"UIInterfaceOrientationLandscapeRight");
        return YES;
    }
    if( isReverseLandscape && (interfaceOrientation == UIInterfaceOrientationLandscapeLeft) ) {
        //NSLog(@"UIInterfaceOrientationLandscapeLeft");
        return YES;
    }
    
    return NO;
}

- (void)didRotateFromInterfaceOrientation:(UIInterfaceOrientation)fromInterfaceOrientation
{
    //NSLog(@"didRotateFromInterfaceOrientation = %d", fromInterfaceOrientation);
    [self transformCamera];
}

- (void)transformCamera{
    UIInterfaceOrientation statusBarOrientation = [[UIApplication sharedApplication] statusBarOrientation];
    UIInterfaceOrientation currentDeviceOrientation = [[UIDevice currentDevice] orientation];
    //NSLog(@"statusBarOrientation = %d, currentDeviceOrientation = %d", statusBarOrientation, currentDeviceOrientation);
    
    //statusBarOrientation과 currentDeviceOrientation 일치하지 않는 경우 currentDeviceOrientation을 statusBarOrientation과 일치하도록 변경
    if (statusBarOrientation != currentDeviceOrientation) {
        [[UIDevice currentDevice] performSelector:@selector(setOrientation:) withObject:(id)statusBarOrientation];
    }
    
    CGAffineTransform transform;
    switch (statusBarOrientation) {
            //UIInterfaceOrientationPortrait
        case 1:
            self.capture.rotation = 90.0f;
            transform = CGAffineTransformMakeRotation(0);
            break;
            //UIInterfaceOrientationPortraitUpsideDown
        case 2:
            self.capture.rotation = 270.0f;
            transform = CGAffineTransformMakeRotation(M_PI);
            break;
            //UIInterfaceOrientationLandscapeRight
        case 3:
            self.capture.rotation = 0.0f;
            transform = CGAffineTransformMakeRotation(-M_PI/2);
            break;
            //UIInterfaceOrientationLandscapeLeft
        case 4:
            self.capture.rotation = 180.0f;
            transform = CGAffineTransformMakeRotation(M_PI/2);
            break;
            
        default:
            break;
    }
    [self.capture setTransform:transform];
    self.capture.layer.frame = self.view.bounds;
    //NSLog(@"width = %f, height = %f", self.view.bounds.size.width, self.view.bounds.size.height);
}

#pragma mark - Private Methods

- (NSString*)displayForResult:(ZXResult*)result {
    NSString *formatString;
    switch (result.barcodeFormat) {
        case kBarcodeFormatAztec:
            formatString = @"Aztec";
            break;
            
        case kBarcodeFormatCodabar:
            formatString = @"CODABAR";
            break;
            
        case kBarcodeFormatCode39:
            formatString = @"Code 39";
            break;
            
        case kBarcodeFormatCode93:
            formatString = @"Code 93";
            break;
            
        case kBarcodeFormatCode128:
            formatString = @"Code 128";
            break;
            
        case kBarcodeFormatDataMatrix:
            formatString = @"Data Matrix";
            break;
            
        case kBarcodeFormatEan8:
            formatString = @"EAN-8";
            break;
            
        case kBarcodeFormatEan13:
            formatString = @"EAN-13";
            break;
            
        case kBarcodeFormatITF:
            formatString = @"ITF";
            break;
            
        case kBarcodeFormatPDF417:
            formatString = @"PDF417";
            break;
            
        case kBarcodeFormatQRCode:
            formatString = @"QR Code";
            break;
            
        case kBarcodeFormatRSS14:
            formatString = @"RSS 14";
            break;
            
        case kBarcodeFormatRSSExpanded:
            formatString = @"RSS Expanded";
            break;
            
        case kBarcodeFormatUPCA:
            formatString = @"UPCA";
            break;
            
        case kBarcodeFormatUPCE:
            formatString = @"UPCE";
            break;
            
        case kBarcodeFormatUPCEANExtension:
            formatString = @"UPC/EAN extension";
            break;
            
        default:
            formatString = @"Unknown";
            break;
    }
    
    return [NSString stringWithFormat:@"Scanned!\n\nFormat: %@\n\nContents:\n%@", formatString, result.text];
}

#pragma mark - ZXCaptureDelegate Methods

- (void)captureResult:(ZXCapture*)capture result:(NSString*)result {
    NSLog(@"captureResult = %@", result);
    if (result) {
        [self.delegate barcodeReadSuccessCallback:result];

        // Vibrate
        AudioServicesPlaySystemSound(kSystemSoundID_Vibrate);
    }
}

- (void)captureSize:(ZXCapture*)capture width:(NSNumber*)width height:(NSNumber*)height {
    
}

- (IBAction)touchCloseButtonHandler:(id)sender{
    [self.delegate touchCloseButton];
}

- (IBAction)touchFlashButtonHandler:(id)sender {
    if (self.flashButton.selected) {
        self.flashButton.selected = NO;
        self.flashStatus.text = @"off";
        self.capture.torch = NO;
    } else {
        self.flashButton.selected = YES;
        self.flashStatus.text = @"on";
        self.capture.torch = YES;
    }
}

- (void)dealloc {
    self.capture = nil;
    [_barcode_description release];
    [_scanBar release];
    [_closeButton release];
    [_flashButton release];
    [_flashStatus release];
    [super dealloc];
}

- (void)viewDidUnload {
    [self setBarcode_description:nil];
    [self setScanBar:nil];
    [self setCloseButton:nil];
    [self setFlashButton:nil];
    [self setFlashStatus:nil];
    [super viewDidUnload];
}
@end

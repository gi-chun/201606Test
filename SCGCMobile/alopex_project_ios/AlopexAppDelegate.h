#import <UIKit/UIKit.h>
#import <Alopex/AlopexManager.h>

@class DataManager;

@interface AlopexAppDelegate : AlopexManager <UIAccelerometerDelegate, UIApplicationDelegate>
{
    DataManager  *_dataManager;
    NSString *title;
    NSString *message;
    NSString *pageId;
    NSString *r_parameters;
    
}

@property (nonatomic, strong) NSString *pushTokenID;

@end

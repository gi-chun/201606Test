#import <UIKit/UIKit.h>
#import <Alopex/AlopexManager.h>

@class DataManager;

@interface AlopexAppDelegate : AlopexManager <UIAccelerometerDelegate, UIApplicationDelegate>
{
    DataManager  *_dataManager;
}

@property (nonatomic, strong) NSString *pushTokenID;

@end

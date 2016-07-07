#import <UIKit/UIKit.h>
#import <Alopex/AlopexManager.h>

@class DataManager;

@interface AlopexAppDelegate : AlopexManager <UIAccelerometerDelegate, UIApplicationDelegate>
{
    DataManager  *_dataManager;
    NSString *title;
    NSString *message;
    NSString *pageId;
}

@property (nonatomic, strong) NSString *pushTokenID;
@property (nonatomic, strong) NSString *s_parameters;
@property (nonatomic, strong) NSMutableDictionary *r_parameters;

@end

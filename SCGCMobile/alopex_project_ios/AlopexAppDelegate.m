#import "AlopexAppDelegate.h"

@implementation AlopexAppDelegate

- (id) init {
    return [super init];
}


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    [super application:application didFinishLaunchingWithOptions:launchOptions];
    
    //Create the background
    [[UIApplication sharedApplication] setStatusBarStyle:UIStatusBarStyleBlackOpaque];
    UIView* statusBg = [[UIView alloc] initWithFrame:[[UIApplication sharedApplication] statusBarFrame]];
    statusBg.backgroundColor = [UIColor blackColor];
    
    //Add the view behind the status bar
    [self.window.rootViewController.view addSubview:statusBg];
    
    return  YES;
    
}

@end

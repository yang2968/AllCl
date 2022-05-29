#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>

// UNUserNotificationCenterDelegate add
@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>

@property (nonatomic, strong) UIWindow *window;

@end


#import "DeviceSecurityPlugin.h"
#import <Alopex/NSString+SBJSON.h>
#import <sys/sysctl.h>

#define JAILBROKEN_MESSAGE @"이 디바이스는 JailBroken되어 있습니다. 이 디바이스에서는 서비스를 이용하실 수 없습니다. 정상적인 디바이스에서 다시 실행하세요."

@interface DeviceSecurityPlugin (){
    NSDictionary *_jailbreakList;
}

@property(nonatomic, retain) NSDictionary *jailbreakList;

- (void)start:(NSDictionary*)properties;
- (BOOL)level1;
- (BOOL)level2;
- (NSDictionary *)getJailbreakList;
- (void)showAlertMessage:(NSString*)message;

@end

@implementation DeviceSecurityPlugin

-(id)init
{
	self = [super init];
	if(self) {
   
	}
	return self;
}

- (void)start:(NSDictionary*)properties
{
    self.jailbreakList = [self getJailbreakList];
    
    if (![self level1]) {
        [self showAlertMessage:JAILBROKEN_MESSAGE];
        return;
    }
    
    if (![self level2]) {
        [self showAlertMessage:JAILBROKEN_MESSAGE];
        return;
    }
}

//API 호출 기반 탐지
-(BOOL) level1
{
    NSLog(@"level1");
    
    NSArray *applicationList = [self.jailbreakList objectForKey:@"application"];

    for (int i=0; i<applicationList.count; i++) {
        
        NSLog(@"target = %@", [applicationList objectAtIndex:i]);
        
        if ([[NSFileManager defaultManager] fileExistsAtPath:[applicationList objectAtIndex:i]] == YES) {
            
            return NO;
            
        }
        
    }
    
    NSArray *pathList = [self.jailbreakList objectForKey:@"path"];
    
    for (int i=0; i<pathList.count; i++) {
        
        NSLog(@"target = %@", [pathList objectAtIndex:i]);
        
        if ([[NSFileManager defaultManager] fileExistsAtPath:[pathList objectAtIndex:i]] == YES) {
            
            return NO;
            
        }
        
    }
    
    return YES;
}

//시스템 호출 기반 탐지
- (BOOL)level2
{
    NSLog(@"level2");
    
    NSArray *applicationList = [self.jailbreakList objectForKey:@"application"];

    for (int i=0; i<[applicationList count]; i++) {
        
        NSLog(@"target = %@", [applicationList objectAtIndex:i]);
        
        const char* str = [[applicationList objectAtIndex:i] UTF8String];
        
        if(open(str ,O_RDONLY) != -1)
        {
            return NO;
        }
        
    }
    
    NSArray *pathList = [self.jailbreakList objectForKey:@"path"];
    
    for (int i=0; i<[pathList count]; i++) {
        
        NSLog(@"target = %@", [pathList objectAtIndex:i]);
        
        const char* str = [[pathList objectAtIndex:i] UTF8String];
        
        if(open(str ,O_RDONLY) != -1)
        {
            return NO;
        }
        
    }
    
    return YES;
}

- (NSDictionary *)getJailbreakList
{
    NSString *path = [[NSBundle mainBundle] pathForResource:@"jailbreak_list.json" ofType:nil];

    NSDictionary *jailbreakList = [NSDictionary dictionary];

    if(![[NSFileManager defaultManager] fileExistsAtPath:path])
        jailbreakList = nil;
    
    NSString *strConfigInfo =[NSString stringWithContentsOfFile:path encoding:NSUTF8StringEncoding error:NULL];
    jailbreakList = [strConfigInfo JSONFragmentValue];

    return jailbreakList;
}

- (void)showAlertMessage:(NSString*)message
{
    UIAlertView* customAlert = [[UIAlertView alloc] initWithTitle:nil message:message delegate:nil cancelButtonTitle:nil otherButtonTitles:nil];
    customAlert.delegate = self;
    [customAlert show];
}

-(void)dealloc{
    [super dealloc];
    self.jailbreakList = nil;
}

@end

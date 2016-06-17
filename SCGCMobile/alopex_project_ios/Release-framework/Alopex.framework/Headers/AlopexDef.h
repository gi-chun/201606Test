/* 
 * Copyright (c) 2012 SK C&C Co., Ltd. All rights reserved. 
 * 
 * This software is the confidential and proprietary information of SK C&C. 
 * You shall not disclose such confidential information and shall use it 
 * only in accordance with the terms of the license agreement you entered into 
 * with SK C&C. 
 *
 * @version Alopex Runtime : 3.0.15
 *   Change Log:
* */

#define		Alopex_Runtime_Version				@"3.0.15"

#define     IS_TRIALVERSION                     0   //trial version 아님
//#define     IS_TRIALVERSION                   1   //trial version 임

#define     CONTENT_TYPE_LOCAL                  0   //content가 local에 있는 경우
#define     CONTENT_TYPE_REMOTECONTENT          1   //content가 document에 있는 경우(remote content)
#define     CONTENT_TYPE_ONTHEFLY               2   //content가 remote server에 있는 경우 

//AlopexConfig Data
#define     ALOPEX_CONFIG_XML                   @"www/alopexconfig.xml"
#define     ATTRIBUTE_FIRST                     @"alopexconfig"
#define     ATTRIBUTE_USELOADINGVIEW            @"useLoadingView"        //loadingView 사용여부

#define     ATTRIBUTE_ID                        @"id"                    // id value
#define     ATTRIBUTE_TYPE                      @"type"                  // local, remote, native, or web
#define     ATTRIBUTE_URI                       @"uri"                   // page uri or native class name
#define     ATTRIBUTE_CHANGE_ORIENTATION        @"changeOrientation"     // true or false
#define     ATTRIBUTE_ORIENTATION               @"orientation"           // portrait or landscape
#define     ATTRIBUTE_SKIPHISTORYPAGE           @"skipPage"              // skip page
#define     ATTRIBUTE_CONTAINER                 @"container"             // container

//global PageInfo attribute
#define     ATTRIBUTE_PAGEINFO_START            @"startPage"
#define     ATTRIBUTE_PAGEINFO_ORIENTATION      @"orientation"
#define     ATTRIBUTE_PAGEINFO_TYPE             @"type"
#define     ATTRIBUTE_PAGEINFO_CONTAINER        @"container"
#define     ATTRIBUTE_GLOBAL_PAGE_ORIENTATION   @"alopexGlobalPageOrientation"
#define     ATTRIBUTE_GLOBAL_PAGE_TYPE          @"alopexGlobalPageType"
#define     ATTRIBUTE_GLOBAL_PAGE_CONTAINER     @"alopexGlobalPageContainer"
#define     EXIST_PAGE_ID_CONFIG                @"existPageIDConfig"

#define     TAG_PROJECTINFO_OLD                 @"project-info"
#define     TAG_PROJECTINFO                     @"projectInfo"
#define     TAG_PAGEINFO                        @"pageInfo"
#define     TAG_PAGE_LIST                       @"pageList"
#define     TAG_PAGE                            @"page"
#define		TAG_INFO							@"info"
#define     ATTRIBUTE_START_TAG                 @"start"
#define     ATTRIBUTE_START                     @"alopexStartPage"
#define     EXTENSION_INFO_CLASSNAME			@"className"
#define     PAGETYPE_REMOTE                     @"remote"
#define     PAGETYPE_LOCAL                      @"local"
#define     PAGETYPE_WEB                        @"web"
#define     PAGETYPE_NATIVE                     @"native"

#define     WWWFOLDER_NAME                      @"www"

//plugin common
#define		PLUGIN_CLASS                        @"plugin_class"
#define		USE_PLUGIN                          @"use_plugin"
#define     PRIORITY                            @"priority"
#define     PROPERTIES_FILE_NAME                @"properties_file_name"

//RemoteContentManager
#define		FILE_REMOTE_CONTENT_PROPERTIES		@"remote_content_properties"
#define		CONTENTS_DAWNLOADFOLDER				@"Alopex"
#define		CONTENTS_VERSION					@"current_remote_content_version"

//OnTheFlyManager
#define		ONTHEFLY_SERVER_URL                 @"url"

//ServerPropertyManager
#if ALOPEX_DEBUG
    #define		FILE_SERVER_PROPERTIES			@"server_debug_properties"
#else
    #define		FILE_SERVER_PROPERTIES			@"server_release_properties"
#endif

//HTTP
#define		DEBUG_HTTP							0
#define		DEFAULT_TIMEOUT						10
#define		DEFAULT_TIMER_INTERVAL				1    //(s)
#define		TIMEOUT_MESSAGE                     @"SocketTimeoutException"

/*json Object (리턴값 or 파라미터 ) 키 값 정의 */
//페이지 이동시 사용하는 파라미터, 리턴 받는 파라미터 키 값 정의 
#define     PARAM_PAGE_ID                       @"pageId"
#define     PARAM_PARAMS                        @"parameters"
#define     PARAM_ONNEWCONTAINER                @"onNewContainer"
#define		PARAM_LOADIMAGEPATH					@"loadImage"
#define		PARAM_AUTODISMISS					@"autoDismiss"

//camera 리턴 
#define     CAMERA_RETURN_PATH                  @"path"
#define     CAMERA_RETURN_WIDTH                 @"width"
#define     CAMERA_RETURN_HEIGHT                @"height"

//date 리턴 
#define     YEAR                                @"year"
#define     MONTH                               @"month"
#define     DAY                                 @"day"

//time 리턴 
#define     HOUR                                @"hour"
#define     MINUTE                              @"minute"
#define     AMPM                                @"ampm"

//Accelerometer 리턴

#define     ACCELERATION_X                      @"x"
#define     ACCELERATION_Y                      @"y"
#define     ACCELERATION_Z                      @"z"

//compass 리턴
#define    TRUEHEADING                          @"trueHeading"
#define    MAGNETICHEADING                      @"magneticHeading"
#define    HEADINGACCURACY                      @"headingAccuracy"

//phone sendEmail 파라미터 
#define		Email_PARAM_TITLE					@"title"
#define		Email_PARAM_TO						@"to"
#define		Email_PARAM_CC						@"cc"
#define		Email_PARAM_BCC						@"bcc"
#define		Email_PARAM_BODY					@"body"

//phone sendSMS 파라미터 
#define		SMS_PARAM_NUMBERS					@"numbers"
#define		SMS_PARAM_MESSAGE					@"message"

//cantact addContact 파라미터 
#define		CONTACT_CONTACTID			@"contactId"
#define		CONTACT_FIRSTNAME			@"firstName"
#define		CONTACT_LASTNAME			@"lastName"
#define		CONTACT_MOBILEPHONE         @"mobilePhone"
#define		CONTACT_WORKPHONE			@"workPhone"
#define		CONTACT_EMAIL				@"email"
#define		CONTACT_ORGANIZATION		@"organization"
#define		CONTACT_DEPARTMENT			@"department"
#define		CONTACT_JOBTITLE			@"jobTitle"

//http request 파라미터 
#define		REQUEST_URL							@"url"
#define		REQUEST_METHOD						@"method"
#define     REQUEST_ON_BODY						@"onBody"
#define		REQUEST_CONTENT_BODY				@"content"
#define		REQUEST_PARAM						@"parameters"

#define		HTTP_NATIVE_CALL					@"nativeCall"
#define		HTTP_NATIVE_CALLBACK_CLASS			@"nativeClass"

//http upload 파라미터 
#define		UPLOAD_URL							@"url"
#define		UPLOAD_FILEPATH						@"filePath"

//http download 파라미터 
#define		DAWNLOAD_URL						@"url"
#define		DAWNLOAD_FILENAME					@"fileName"

#define		RESPONSE_ERROR_MESSAGE				@"NSLocalizedDescription"      

//Mutimedia  파라미터
#define     IMAGE_PATH                          @"path"
#define     IMAGE_WIDTH                         @"width"
#define     IMAGE_HEIGHT                        @"height"
#define     IMAGE_DEGREE                        @"degree"

//Localization 다국어처리
#define     OK_KEY                              @"Ok"
#define     OK_DESCRIPTION                      @"확인"
#define     YES_KEY                             @"Yes"
#define     YES_DESCRIPTION                     @"예"
#define     NO_KEY                              @"No"
#define     NO_DESCRIPTION                      @"아니오"
#define     CLOSE_KEY                           @"Close"
#define     CLOSE_DESCRIPTION                   @"닫기"
#define     SELECT_KEY                          @"Select"
#define     SELECT_DESCRIPTION                  @"선택"
#define     CANCEL_KEY                          @"Cancel"
#define     CANCEL_DESCRIPTION                  @"취소"
#define     AGREE_MESSAGE_KEY                   @"Please agree with addressbook access."
#define     AGREE_DESCRIPTION                   @"주소록 접근에 동의해 주세요."

//contents Protected
#define         EXTENSIONS                      @"filePathExtensions"

//Delegators
#define     ALOPEX                              @"Alopex"
#define     APPLICATION                         @"Application"
#define     CONTACT                             @"Contact"
#define     DATABASE                            @"Database"
#define     DEVICE                              @"Device"
#define     EVENT                               @"Event"
#define     FILEMANAGER                         @"FileManager"
#define     GLOBALPREFERENCE                    @"GlobalPreference"
#define     HTTP                                @"Http"
#define     LOCALNOTIFICATION                   @"LocalNotification"
#define     LOG                                 @"Log"
#define     MEMORYPREFERENCE                    @"MemoryPreference"
#define     MULTIMEDIA                          @"Multimedia"
#define     NAVIGATION                          @"Navigation"
#define     NATIVEUI                            @"NativeUI"
#define     PHONE                               @"Phone"
#define     PLATFORMUICOMPONENT                 @"PlatformUIComponent"
#define     PREFERENCE                          @"Preference"
#define     PUSHNOTIFICATION                    @"PushNotification"
#define     SPLASHSHEET                         @"SplashSheet"
#define     DEVICESENSOR                        @"DeviceSensor"


//Manager
#define     REMOTECONTENTMANAGER                @"RemoteContentManager"
#define     SERVERPROPERTYMANAGER               @"ServerPropertyManager"
#define     PLUGINMANAGER                       @"PluginManager"
#define     CUSTOMUIMANAGER                     @"CustomUIManager"
#define     SIMULATORAPPLICATIONMANAGER         @"SimulatorApplicationManager"

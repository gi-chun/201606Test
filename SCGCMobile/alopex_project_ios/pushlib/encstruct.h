//
//  encstruct.h
//  TITANLIB_V2
//
//  Created by komj on 13. 12. 17..
//  Copyright (c) 2013년 에이치투오시스템테크놀로지(주). All rights reserved.
//

#ifndef TITANLIB_V2_encstruct_h
#define TITANLIB_V2_encstruct_h

#include "rsa.h"

#ifndef BYTE
#define BYTE    unsigned char
#endif

typedef struct{
    RSA             *KEY_PRI;
    RSA             *KEY_CLI;
    
    int             KEY_pub_len;
    unsigned char   KEY_pub[4096];
    
    int             KEY_cli_len;
    unsigned char   KEY_cli[4096];
} H2O_ENCRYPT_CTX;

#endif

//
//  erbapi.h
//  TITANLIB_V2
//
//  Created by komj on 13. 9. 15..
//  Copyright (c) 2013년 에이치투오시스템테크놀로지(주). All rights reserved.
//

#ifndef TITANLIB_V2_erbapi_h
#define TITANLIB_V2_erbapi_h

/* ************************************************************************ */
/* Header includes															*/
/* ************************************************************************ */
#include "ptcstruct.h"
#include "ptcdefine.h"
#include "erbdefine.h"
#include "erb.h"
#ifdef _DREAM_SECURITY_
#include "DS_SSLC.h"
#endif

#ifdef _ENCRYPT_RSA_
#include "encstruct.h"
#include "rsa.h"
#include "aes.h"
#include "err.h"
#include "crypto.h"
#endif


/* ************************************************************************ */
/* Define declare															*/
/* ************************************************************************ */


/* ************************************************************************ */
/* Function prototype														*/
/* ************************************************************************ */
extern ERB_HANDLE *erbinit(char *ip, int port, char *userid, int timeout);
extern int erbaddregister(	ERB_HANDLE *hand,
                          char *EventName, char *EventKey,
                          int keyCnt, int keyLen			);
extern int erbdelregister(	ERB_HANDLE *hand,
                          char *EventName, char *EventKey,
                          int keyCnt, int keyLen			);
extern int erbrmregister(ERB_HANDLE *hand );
extern int erbterm(ERB_HANDLE *hand );
extern int erbgetmsg(EVENT_DATA *msg);
extern int erbsend(	ERB_HANDLE *hand, char *key, int klen, char *gubun, int glen, char *msg, int mlen, OPTFLAGS *flags);
extern int erbreceipt(ERB_HANDLE *hand, char *msg, int mlen, int flags);

extern int erbcall(	ERB_HANDLE *hand,
                   char *trcd, char *sbuf, int slen,
                   char **rbuf, int *rlen, OPTFLAGS *flags);
/*
 * //}}
 */
extern int erbencinit( ERB_HANDLE *hand, char *keyInit, int len, char *rbuf, int *rlen );

extern int erbreadcheck( ERB_HANDLE *hand, char *msg, int mlen, int flags);
extern int erbsessioncheck(ERB_HANDLE *hand);

/*//{{ 20131220_komj : KAIST RSA ENCRYPT */
#ifdef _ENCRYPT_RSA_
H2O_ENCRYPT_CTX *Encrypt_RSA_init();
int Encrypt_RSA_encrypt(H2O_ENCRYPT_CTX *ctx, char *in, int ilen, char *out, int olen);
int Encrypt_RSA_decrypt(H2O_ENCRYPT_CTX *ctx, char *in, int ilen, char *out, int olen);
int Encrypt_RSA_done(H2O_ENCRYPT_CTX *ctx);
int Encrypt_Handshake_client(H2O_ENCRYPT_CTX *ctx, int sockfd);
#endif

int erbsessioncheck(ERB_HANDLE *hand);

ERB_HANDLE *g_hand;

//int pushGetMsg( char *ip, int port, char *userId, char *app_type, int timeout, char **rtnMsg, int *rtnLen, char *rtnMsgIdx );
//int pushGetMsg( char *ip, int port, char *userId, char **rBuff, int *rLen, int timeout );
int pushReceipt( char *ip, int port, char *userId, char *msgIdx, int timeout );
int pushUnRegist( char *ip, int port, char *userId, char *deviceToken, char *app_type, int timeout );
//int pushRegist( char *ip, int port, char *userId, char *deviceToken, char *app_type, int timeout );
int pushRegist( char *ip, int port, char *userId, char *deviceToken, char *app_type, char *multiYN, int timeout );
int pushReadCheck( char *ip, int port, char *userId, char *msgIdx, int timeout );
int pushGetMsg_idx( char *ip, int port, char *userId, char *app_type, char *msgid, int timeout, char **rtnMsg, int *rtnLen, char *rtnMsgIdx );

typedef struct{
    char        msgid[18 + 1];
    int         msgLen;
    char        *msg;
}DATA;

int pushGetMsg( char *ip, int port, char *userId, char *app_type, int timeout, DATA **msg);
int pushGetMsgAll( char *ip, int port, char *userId, char *app_type, char *token, int checkCnt, int timeout, DATA **msg, int *recpCnt);
int pushReceiptMulti(char *ip, int port, char *id, char *token, char *seq_multi, int seq_len, int mCnt);
/*//}}*/
//extern int erb_dream_init(ERB_HANDLE *hand);
/* ************************************************************************ */
/* Variable declare															*/
/* ************************************************************************ */
/* 2013.5.27 
 int Sockfd;
 int ConnID;
 int ErbInitFlag;
 */

#endif

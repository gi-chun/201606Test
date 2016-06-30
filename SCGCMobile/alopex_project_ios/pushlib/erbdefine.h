
/* 
** common/define.h ¿ª define.h∑Œ ∫Ø∞Ê
*/
#ifndef _ERBDEFINE_H_
#define _ERBDEFINE_H_

#include "ptcstruct.h"

#define     CONFIG      0
#define     TCP         1
#define     ASYNC       3
#define     DIALUP      4


#define     TRB_SUCCESS                 1
#define     TRB_ERROR                   0
#define     TRB_FAILED                  -1
#define     TRB_TIMEOUT                 -2
#define     TRB_CANCEL                  -3

#define     ERB_SUCCESS                 1
#define     ERB_ERROR                   0
#define     ERB_FAILED                  -1
#define     ERB_TIMEOUT                 -2
#define     ERB_MEMORY_ALLOC_FAILED     -3
#define     ERB_MSG_MEMORY_ALLOC_FAILED "Memory Allocation Error"
#define     ERB_CONN_FAILED             -4
#define     ERB_MSG_CONN_FAILED         "Connect Error"
#define     ERB_PACKETWRITE_FAILED      -5
#define     ERB_MSG_PACKETWRITE_FAILED  "PacketWrite Error"
#define     ERB_RECV_FAILED             -6
#define     ERB_MSG_RECV_FAILED         "Recv Error"
#define     ERB_CMD_INPUT_FAILED        -7
#define     ERB_MSG_CMD_INPUT_FAILED    "CMD_INPUT Error"
#define     ERB_SUB_INPUT_FAILED        -8
#define     ERB_MSG_SUB_INPUT_FAILED    "SUB_INPUT Error"


#define     PB_SUCCESS                  1
#define     PB_FAIL                     0
#define     PB_ERROR                    -1
#define     PB_TIMEOUT                  -2
#define     PB_CLOSE                    -3

#define     NETWORK_FAILED              -10
#define     PRELOGIN_FAILED             -11
#define     CONTACT_FAILED              -12
#define     EVENT_OPEN_FAILED           -13
#define     BROKER_OPEN_FAILED          -14

#define     ALREADY_CONNECTC_INIT       -20
#define     CONNECTC_INIT_FAILED        -21
#define     CONNECTC_NOT_INITIALIZED    -22

#define     ALREADY_EVENTC_INIT         -30
#define     EVENTC_INIT_FAILED          -31
#define     EVENTC_NOT_INITIALIZED      -32

#define     NET_KEEP_ALIVE              0x00
#define     NET_TERMINATE               0x01

#define     MAX_PACKET_LEN              4096 /*2013.5.27*/
#define     TR_NAME_SZ                  32   /*2013.5.27*/

#define     MIN_TR_HANDLE               1    /*2013.5.27*/
#define     MAX_TR_HANDLE               128  /*2013.5.27*/
#define     ENCRYPT_DATA_HEADER_SZ      11   /*2013.12.17*/
#define     H2O_ENCRYPT_DATA_MAXLEN     245  /*2013.12.17*/
#define     H2O_DECRYPT_DATA_MAXLEN     256  /*2013.12.19*/

#define     KEY_BIT                     256  /*2014.01.20_komj : KAIST AES Decrypt */
#define     IV_SIZE                     16   /*2014.01.20_komj : KAIST AES Decrypt */

#define		SIZE_MSG_ID					18
#define		SIZE_TOT_SEQ				5
#define		SIZE_CUR_SEQ				5

/* 
**  SocketManger.h
*/

typedef struct {
    char    udp_port[8];
	char    thread_id[10];
}SERVER_UDP_INFO;

typedef struct {
	char    cli_ip[15];
	char    cli_port[8];
}CLIENT_UDP_INFO;
					
						
typedef struct {
	char    connect_id[5];
	char    connect_type[1];
/*	char    udp_port[8]; */
}CONN_INFO;

/* EvManager.h  */
typedef struct{
	char        gubun[1];
	char        count[1];
	char        keylen[1];
}REGIST_PCK;

/* EvManager.h  */
typedef struct{
	unsigned char        gubun_len[1];
	unsigned char        key_len[1];
	unsigned char        data_len[2];
}DIST_DATA;

/*  EvMngApi.h  */
typedef struct{
    char        flag[1];
	char        event_gubun[32];
	char        event_key[32];
	short       data_len;
    //	char        event_data[1536];
    char        event_data[40960];
}EVENT_DATA;

/*//{20140114_komj : KAIST 암호화 데이터 처리 */
#if 0
typedef struct{
    char        tr_code[TR_NAME_SZ];
    char        status[1];
    char        compress[1];
    RESPONSE    res_header;
    int         len;
    char        *data;
}ERB_TR_TBL;
#endif

typedef struct{
    int         len;
    char        *data;
}ENC_DATA;
typedef struct{
    char        tr_code[TR_NAME_SZ];
    char        status[1];
    char        compress[1];
    char        flag[1];                /* 2014.01.24_komj : KAIST Trcall 구분을 위해 FLAG추가 */
    RESPONSE    res_header;
    
    ENC_DATA    *enc_data;
    int         count;
}ERB_TR_TBL;
/*}}*/
typedef struct{
    char        ip[16];
    int         port;
    int         sockfd;
    char        userid[32];
    int         connid;
}ERB_HANDLE;

#endif

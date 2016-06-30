
#ifndef _PTCSTRUCT_H_
#define _PTCSTRUCT_H_

#ifndef BYTE
#define	BYTE	unsigned char
#endif
/********************************************************************/
/* protocal header													*/ 
/********************************************************************/
typedef struct protocol {
	BYTE	type[1];		/* packet message type					*/
	BYTE	cmd[1];			/* packet message command 				*/ 
	BYTE	sub[1];			/* packet message subcommand			*/
	BYTE	seq[1];			/* packet message sequnce[0-256]		*/
} PROTOCOL ;

/********************************************************************/
/* trb logical keep value header									*/
/********************************************************************/
typedef struct common {
	BYTE	vss[1];			/* virtural session id 					*/	
	BYTE	connid[2];		/* connection id [0]=/256,[1]=%256		*/
	BYTE	handle[2];		/* client handle value [0]=/256,[1]=%256*/
	BYTE	flag[1];		/* flag (compres or encrpt )			*/
} COMMON;

typedef struct packet {
	PROTOCOL	ptc;		/* protocal struct variable				*/
	COMMON		cmn;		/* common struct variable				*/
} PACKET;

typedef struct response {
	BYTE	rtval[1];		/* service return value					*/
	BYTE	rtcd[2];		/* service return code					*/
							/* ptcerror.h defined					*/
							/* rtcd[0] :  error class(0-255)		*/
							/* rtcd[1] ;  error code (0-255) 		*/
	BYTE	vhlen[1];		/* variable header length				*/
} RESPONSE ;

/* 2008.2.15 BSH, Append  */
typedef struct packet_kind {
	char    msgid[2];		/* 동일 message를 구분하기 위한 번호               */
	char    sce;			/* 3:start, 4:continue, 5:end, (ptcdefine.h 참조)   */
} PKT_KIND;

/********************************************************************/
/* transaction request header										*/  
/********************************************************************/
typedef struct reqres_request {
	BYTE	key[2];			/* service key value [0]=/256,[1]=%256	*/
	BYTE	ttl[1];			/* remote reference count				*/
	BYTE	plen[1];		/* product name length					*/
	BYTE	slen[1];		/* service name length					*/
	BYTE	vhlen[1];		/* variable header length				*/	
} REQRES_REQUEST;
/********************************************************************/
/* trb response header												*/  
/********************************************************************/
typedef struct RESPONSE	REQRES_RESPONSE;




/********************************************************************/
/* packet request header											*/  
/********************************************************************/
typedef struct packet_request {
	BYTE	pglen[1];		/* program name length					*/
} PACKET_REQUEST;

/********************************************************************/
/* packet response header											*/  
/********************************************************************/
typedef struct RESPONSE PACKET_RESPONSE ;
							/*  response 의 vhlen = 0 value 이다 	*/ 

typedef struct optflag	{
	long	timeout;		/* wait time value						*/
	long	flags;			/* input option flags					*/
	long	rtcd;			/* output return value					*/ 
	char	message[80];	/* output message buff(format)			*/ 
							/* message[0] -> messge length(0-255)	*/ 
							/* message[1] -> message text			*/
} OPTFLAGS;

typedef struct _D_LIST  D_LIST;

struct _D_LIST{
    char    flag[1];
	char    event_gubun[32];
	char    event_key[32];
    char    msgId[18+1];
    int     totSeq;
    int     curSeq;
    char    msg[1350];
    int     mlen;
    
    D_LIST  *next;
};

typedef struct {
    int     count;
    D_LIST  *head;
    D_LIST  *tail;
}H_LIST;

#endif



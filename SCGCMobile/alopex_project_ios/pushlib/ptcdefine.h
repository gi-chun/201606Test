

#ifndef _PTCDEFINE_H_
#define _PTCDEFINE_H_

#define PKSZ_VALUE		256

/********************************************************************/
/*  protocol system TYPE define										*/	
/********************************************************************/

enum type {
		TYPE_SYS				=	0,
		TYPE_TRX				=	1,
		TYPE_PKT				=	2,
		TYPE_EVENT				=	3,
		TYPE_MON				=	31,
		TYPE_CLIENT				=	21,
        TYPE_ENC                =   0x03
};

/********************************************************************/
/*  protocol system CMD define										*/	
/********************************************************************/

enum cmd {
		/************************************/
		/* system interface	define			*/
		/************************************/
		CMD_CERTIFY				=	1,	
		CMD_PRELOGIN			=	2,
		CMD_SESSION_OPEN		=	3,
		CMD_SESSION_CLOSE		=	4,
		CMD_TRANSFER			=	5,

		/************************************/
		/* request & reponse mode define 	*/
		/************************************/
		CMD_REQRES_REQUEST		=	10,
		CMD_REQRES_RESPONSE 	= 	11,

		/************************************/
		/* conversion  mode define			*/ 
		/************************************/
		CMD_CONVERSION_REQUEST	=	20,
		CMD_CONVERSION_RESPONSE	=	21,

		/************************************/
		/* packet transmission mode define	*/ 
		/************************************/
		CMD_PACKET_REQUEST			=	30,
		CMD_PACKET_RESPONSE			=	31,
		CMD_PACKET_OPEN_REQUEST		=	32,
		CMD_PACKET_OPEN_RESPONSE	=	33,

		/************************************/
		/* event transmission mode define 	*/ 
		/************************************/
		CMD_EVENT_OPEN				=	40,
		CMD_EVENT_CLOSE				=	41,
		CMD_EVENT_POLL				=	42,
		CMD_EVENT_REQUEST			=	43,
		CMD_EVENT_DIST				=	44,
		CMD_EVENT_INFORM			=	45,
		CMD_EVENT_RESPONSE			=   46,
		CMD_EVENT_CHK               =   47,
        CMD_EVENT_MESSAGE           =   48,
        CMD_EVENT_RECEIPT           =   49,
        CMD_EVENT_READCHECK         =   55,     /* 2013.9.23    komj읽음확인 추가 */
        CMD_EVENT_RECEIPT_BULK      =   57,
        CMD_EVENT_READCHECK_BULK    =   58,

		/************************************/
		/* Event Gate Transmission mode Define*/
		/************************************/
		CMD_EGATE_OPEN				=   50,
		CMD_EGATE_CONTROL			=   51,
		CMD_EGATE_DATA				=   52,

		/************************************/
		/* POLL CHECK 			 			*/
		/************************************/
		CMD_POLL					=  	60,	
		CMD_ECHO					=  	61,	

		/************************************/
		/* XECURE (æœ»£»≠ define) 			*/
		/************************************/
		CMD_XECURE_INIT				=  70,
		/************************************/
		/* DREAMSECURITY (æœ»£»≠ define)	*/
		/************************************/
		CMD_DREAM_SECURE_INIT		=  71,

		/************************************/
		/* PROTOCOL CONTROL 			 	*/
		/************************************/
		CMD_FLOWCONTROL				= 80,

		/************************************/
		/* clinet define 					*/ 
		/************************************/
		CMD_CLIENT_CC				=	110,
		CMD_CLIENT_EC				=	111,

		
};

/********************************************************************/
/*  protocol system SUB define										*/	
/********************************************************************/
enum sub {

		/****************************************/
		/* ∞¯≈ÎªÁøÎ SUB Value & request /replay	*/ 
		/****************************************/
		SUB_FAIL			=	0,
		SUB_SUCCESS			=	1,
		SUB_SINGLE			=	2,	
		SUB_START		    = 	3,
		SUB_CONTI			=	4,
		SUB_END				=	5,
		SUB_REQUEST			= 	6,	
		SUB_NORMAL			= 	7,	
		SUB_ABNORMAL		= 	8,	
		
		/************************************/
		/* system interface	define			*/
		/************************************/
		SUB_REQ_ENCRYPTKEY  =	10,
		SUB_RES_ENCRYPTKEY	=	11,
		SUB_TB_REQUEST		=   12,
		SUB_PB_REQUEST		=   13,
		SUB_EB_REQUEST		=   14,

		/************************************/
		/* conversion  mode define			*/ 
		/************************************/
		SUB_CONNECT			= 	20,					
		SUB_DISCONNECT		=	21,		
		/************************************/
		/* event transmission  mode define	*/ 
		/************************************/
		SUB_RECONNECT		=	22,				
		SUB_TCP_CONNECT		=	23,

		/************************************/
		/* packet transmission mode define	*/ 
		/************************************/
		SUB_OPEN			=	30,				
		SUB_CLOSE			=   31,

		/************************************/
		/* event transmission mode define	*/ 
		/************************************/
		SUB_REQ_CLIINFO		=	40,				
		SUB_RES_CLIINFO		=   41,
		SUB_RES_CONNINFO	=   42,

		/************************************/
		/* event gate transmission mode define  */
		/************************************/
		SUB_EGATE_INFO      =   50,
		SUB_EGATE_RES       =   51,
		SUB_EGATE_POLL      =   52,
		SUB_EGATE_DATA      =   53,


		/************************************/
		/* XECURE (æœ»£»≠ define) 			*/
		/************************************/
		SUB_XECURE_HELLO   	= 	70,
		SUB_XECURE_CLIENTID =   71,
		SUB_XECURE_PASSWORD =   72,

		/************************************/
		/* FLOW CONTROL ( define) 			*/
		/************************************/
		SUB_POLL_ON			=	80,
		SUB_POLL_OFF		=	81,

		/************************************/
		/* ECHO ( define) 					*/
		/************************************/
		SUB_ECHO			=	85,
		SUB_ECHO_REPLY		=	86
};

enum flag {
		FLAG_COMPRESS	=	0x01,
		FLAG_ENCRYPT	=	0x02,
		FLAG_TRBSEND	=	0x04,
		FLAG_NOWAIT		=	0x08,
        FLAG_ENCRYPT2   =   0x08
};

enum event_flag {
		FLAG_EVENT_COMPRESS	=	0x01,
		FLAG_EVENT_IDENTIFY	=	0x08,
		FLAG_EVENT_LONG_PK	=	0x10,		/* 2008.2.18 BSH   */
        FLAG_EVENT_RECEIPT  =   0x20
};


#endif

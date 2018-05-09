/*
 * LW_3v2.c
 *
 * Created: 04.05.2018 15:56:00
 * Author : frek2
 */ 

#include <avr/io.h>
#include <avr/interrupt.h>


void timerInit();
void portInit();
int readKey();
void processingInput();
void timerOne();
void timerTwo();



static int sect1 = 0;
static int mint1 = 0;
static int hourt1 = 0;
static int sect2 = 0;
static int mint2 = 0;
static int hourt2 = 0;
static int timerPointer = 0;
static int valueKey = 0;
static int timerSSR = 0; // SSR(Stop Start Reset)
static int flagActive1;
static int flagActive2;



ISR(TIMER2_OVF_vect){
	
	if(timerSSR == 1){
		
		if (flagActive1 == 1)
		{
			
		} else 
		
		if (flagActive2 == 1)
		{
			
		}
		
	}
	
}

int main(void)
{

	timerInit();
	portInit();
	sei();
    while (1) 
    {
		processingInput();
    }
}



void timerInit(){
	TCCR2A = 0x00;
	TCCR2B = 0x05; //  f/128 = 1s
	TIMSK2 = 0x01;
	ASSR = 0x20;	
}

void portInit(){
	DDRA = 0xFF;
	DDRC = 0x00;
	PORTC = 0xFF;
	DDRD = 0xFF;
}

int readKey(){
	
	if(PINC0){
		while(1){
			if(!PINC0)
				return 1;
		}		
	}

	if(PINC1){
		while(1){
			if(!PINC1)
			return 2;
		}
	}
			
	if(PINC2){
		while(1){
			if(!PINC2)
			return 3;
		}
	}

	if(PINC3){
		while(1){
			if(!PINC3)
			return 4;
		}
	}
	
	return 0;	
}

void processingInput(){
	
	valueKey = readKey();
	
	if(valueKey == 1){
		
		if(timerPointer == 0){
			
			hourt1++;			
		} else {
			
			hourt2++;						
		}
	
	} else
	
	if(valueKey == 2){
		
		if(timerPointer == 0){
					
			mint1++;
			} else {
					
			mint2++;
		}
			
	} else
	
	if(valueKey == 3){
		
		if(timerPointer == 0)
			timerPointer = 1;
		else
			timerPointer = 0;
	} else
		
	if(valueKey == 4){
		
		if(timerPointer == 0){
			
			if(timerSSR < 2)
			{
				
				timerSSR++;
				flagActive1++;
				
			} else {
				
				flagActive1 = 0;
				timerSSR = 0;
				sect1 = 0;
				mint1 = 0;
				hourt1 = 0;
				
			}
			
		} else {
			
			if(timerSSR < 2)
			{
				
				timerSSR++;
				flagActive2++;
				
			} else {
				
				flagActive2 = 0;	
				timerSSR = 0;
				sect2 = 0;
				mint2 = 0;
				hourt2 = 0;
				
			}
		}
		
	} 
}
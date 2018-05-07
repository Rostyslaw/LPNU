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


ISR(TIMER2_OVF_vect){
	


	
	
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
	TCCR2B = 0x05;  // f/128 = 1s
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
		while(true){
			if(!PINC0)
				return 1;
		}		
	}

	if(PINC1){
		while(true){
			if(!PINC1)
			return 2;
		}
	}
			
	if(PINC2){
		while(true){
			if(!PINC2)
			return 3;
		}
	}

	if(PINC3){
		while(true){
			if(!PINC3)
			return 4;
		}
	}
	
	return 0;	
}

void processingInput(){
	
}
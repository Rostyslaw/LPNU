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
void outPort(int hour, int min, int sec);



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
			if(sect1 > 0){
				
				sect1--;
				
			} else 
			
			if (mint1 > 0)
			{
				mint1--;
				sect1 = 59;
			} else
			
			if (hourt1 > 0)
			{
				hourt1--;
				mint1 = 59;
			} else
			flagActive1 = 0;
			
			
		} else 
		
		if (flagActive2 == 1)
		{
			if(sect2 > 0){
				
				sect2--;
				
			} else
			
			if (mint2 > 0)
			{
				mint2--;
				sect2 = 59;
			} else
			
			if (hourt2 > 0)
			{
				hourt2--;
				mint2 = 59;
			} else
			flagActive2 = 0;	
		}
		
	}
	
}

int main(void)
{

	timerInit();
	portInit();
	//sei();
    while (1) 
    {
		processingInput();
		
		if(timerPointer == 0){
			outPort(hourt1, mint1, sect1);
		} else
		
		if (timerPointer == 1)
		{
			outPort(hourt2, mint2, sect2);
		}
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
	PORTA = 0x00;
	DDRC = 0x00;
	PORTC = 0xFF;
	DDRD = 0xFF;
	PORTD = 0x00;
}

int readKey(){
	
	if(!PINC0){
		while(1){
			if(PINC0)
				return 1;
		}		
	}

	if(!PINC1){
		while(1){
			if(PINC1)
			return 2;
		}
	}
			
	if(!PINC2){
		while(1){
			if(PINC2)
			return 3;
		}
	}

	if(!PINC3){
		while(1){
			if(PINC3)
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

void outPort(int hour, int min, int sec){
	int SS[10] = {6, 91, 79, 103, 93, 125, 13, 127, 111};
	int hour1 = 0;
	int hour2 = 0;	
		int min1 = 0;
		int min2 = 0;
			int sec1 = 0;
			int sec2 = 0;
	
		
	if(hour < 10){
		
		PORTD = 1;
		PORTA = SS[0];
		PORTD = 2;
		PORTA = SS[hour];		
		
	} else {
		
		hour2 = hour % 10;
		hour1 = hour - hour2;
		
		PORTD = 1;
		PORTA = SS[hour1];
		PORTD = 2;
		PORTA = SS[hour2];
		
	}
	
	if(min < 10){
		
		PORTD = 4;
		PORTA = SS[0];
		PORTD = 8;
		PORTA = SS[min];
			
	} else {
		
		min2 = min % 10;
		min1 = min - min2;
		
		PORTD = 4;
		PORTA = SS[min1];
		PORTD = 8;
		PORTA = SS[min2];
			
	}
			
	if(sec < 10){
		
		PORTD = 16;
		PORTA = SS[0];
		PORTD = 32;
		PORTA = SS[sec];	
			
	} else {
		
		sec2 = sec % 10;
		sec1 = sec - sec2;
		PORTD = 16;
		PORTA = SS[sec1];
		PORTD = 32;
		PORTA = SS[sec2];				
	}
}
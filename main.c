/*
 * LW_3v2.c
 *
 * Created: 04.05.2018 15:56:00
 * Author : frek2
 */ 

#include <avr/io.h>
#include <avr/interrupt.h>
#include <util/delay.h>


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
static int timerSSR2 = 0;
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
				mint1 = 60;
			} else
			flagActive1 = 0;
					
		} 
		
	} 
	
	if(timerSSR2 == 1){
		
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
				mint2 = 60;
			} else
			flagActive2 = 0;
			
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
	
	if(PINC == 254){
		while(1){
			if(PINC == 255)
				return 1;
		}		
	}

	if(PINC == 253){
		while(1){
			if(PINC == 255) 
			return 2;
		}
	}
			
	if(PINC == 251){
		while(1){
			if(PINC == 255)
			return 3;
		}
	}

	if(PINC == 247){
		while(1){
			if(PINC == 255)
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
			
			if(timerSSR2 < 2)
			{
				
				timerSSR2++;
				flagActive2++;
				
			} else {
				
				flagActive2 = 0;	
				timerSSR2 = 0;
				sect2 = 0;
				mint2 = 0;
				hourt2 = 0;
				
			}
		}
		
	} 
}

void outPort(int hour, int min, int sec){
	int SS[10] = {0b00111111, 0b000000110, 0b01011011, 0b01001111, 0b01100110, 0b01101101, 0b01111101, 0b00000111, 0b01111111, 0b01101111};
	int hour1 = 0;
	int hour2 = 0;	
		int min1 = 0;
		int min2 = 0;
			int sec1 = 0;
			int sec2 = 0;
	
		

		hour2 = hour % 10;
		hour1 = hour / 10;
		
		PORTA = SS[hour1];
		PORTD = ~1;
		_delay_ms(1);
		PORTD = ~0;
		PORTA = SS[hour2];
		PORTD = ~2;
		_delay_ms(1);
		PORTD = ~0;
		

		min2 = min % 10;
		min1 = min / 10;
		
		PORTA = SS[min1];
		PORTD = ~4;
		_delay_ms(1);
		PORTD = ~0;
		PORTA = SS[min2];
		PORTD = ~8;
		_delay_ms(1);
		PORTD = ~0;
			

		sec2 = sec % 10;
		sec1 = sec / 10;
		PORTA = SS[sec1];
		PORTD = ~16;
		_delay_ms(1);
		PORTD = ~0;
		PORTA = SS[sec2];
		PORTD = ~32;
		_delay_ms(1);
		PORTD = ~0;		
}
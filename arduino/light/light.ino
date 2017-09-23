int incomingByte = 0;

void setup() {
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);

  // put your setup code here, to run once:

}

void loop() {

  if (Serial.available()> 0){
    if (Serial.read() == '1'){
    
     digitalWrite(LED_BUILTIN,HIGH);
    }
    else{
      digitalWrite(LED_BUILTIN,LOW);
    }

  
   
     }
  }




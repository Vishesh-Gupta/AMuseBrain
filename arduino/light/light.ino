int pin = 13;

void setup() {
  Serial.begin(4800);
  Serial.println("<Arduino is ready>");
  pinMode(pin, OUTPUT);
}

void loop() {
  boolean light = false;
  float value = 0;
  if (Serial.available() > 0) {
    // read the incoming byte:
    value = Serial.parseFloat();

    // say what you got:
    Serial.print("I received: ");
    Serial.println(value);
  }
  if (value ==1 and light==false) {
    digitalWrite(pin, HIGH);
    light= true;
  else{
    light=false
    digitalWrite(pin, LOW);
  }
    
  }
}

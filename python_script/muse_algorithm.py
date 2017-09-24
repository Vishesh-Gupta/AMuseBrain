'''
Author: Rohan Hundia
EEG Alpha Based Blink Detection and Hardware Control System 
'''

import argparse
import math
import serial
from pythonosc import dispatcher
from pythonosc import osc_server
from socketIO_client import SocketIO, LoggingNamespace
import numpy as np
import pandas as pd 

socketIO =  SocketIO('amuse-mhacks.azurewebsites.net', 80) 
arr_ch1, arr_ch2, arr_ch3, arr_ch4, new_arr_ch1, new_arr_ch2, new_arr_ch3, new_arr_ch4 = [], [], [], [], [], [], [], []


defserial = serial.Serial('com9', 9600)
i = 0;


def eeg_handler(unused_addr, args, ch1, ch2, ch3, ch4):


    
    arr_ch1.append(ch1)
    new_arr_ch1 = np.asarray(arr_ch1)
    arr_ch2.append(ch2)
    new_arr_ch2 = np.asarray(arr_ch2)
    arr_ch3.append(ch3)
    new_arr_ch3 = np.asarray(arr_ch3)
    arr_ch4.append(ch4)
    new_arr_ch4 = np.asarray(arr_ch4)
    

    socketIO.emit('channel 1 data', ch1)
     
    if (ch1 > 1000) :
        print("blink")
        defserial.write(b'1')
        #socketIO.emit('eyes open')
        #socketIO.wait()
    else:
        defserial.write(b'0')
    
    if (len(new_arr_ch1)%500 == 0):
        df = pd.DataFrame({"Channel 1" : new_arr_ch1, "Channel 2" : new_arr_ch2, "Channel 3": new_arr_ch3, "Channel 4": new_arr_ch4})
        df.to_csv("EEG_data.csv", index=False)
        

    

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--ip",
                        default="127.0.0.1",
                        help="The ip to listen on")
    parser.add_argument("--port",
                        type=int,
                        default=5001,
                        help="The port to listen on")
    args = parser.parse_args()
    

    dispatcher = dispatcher.Dispatcher()
    dispatcher.map("/debug",print)
    dispatcher.map("/muse/eeg", eeg_handler, "EEG")


    server = osc_server.ThreadingOSCUDPServer(
        (args.ip, args.port), dispatcher)
    print("Serving on {}".format(server.server_address))
    server.serve_forever()



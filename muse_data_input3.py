import argparse
import math
import serial
from pythonosc import dispatcher
from pythonosc import osc_server

arr_ch1, arr_ch2, arr_ch3, arr_ch4 = [], [], [], []


try:
    defserial = serial.Serial('com3', 9600)
except:
    pass

def eeg_handler(unused_addr, args, ch1, ch2, ch3, ch4):
    arr_ch1.append(ch1)
    arr_ch2.append(ch2)
    arr_ch3.append(ch3)
    arr_ch4.append(ch4)
    if ch1 > 1000:
        defserial.write('1')
        break;
    

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



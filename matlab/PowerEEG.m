% Power analysis of Beta/Alpha Brain Signals for attentional measure
% Rohan Hundia 


% Load in Raw EEG data file of measured task (Cognitive Based analysis)
% Enter the Electrode(number) over which power analysis is to be computed
% Obtain graphical analysis of Alpha and Beta power spectra
% Obtain Ration of Beta/Alpha Power for attention measure

UserInput= 'Enter the Raw EEG File name:';

EEGdata= load(input(UserInput,'s'));
Channel1= EEGdata(:,input('Enter EEG Channel Number:')); % EEG Channel to be analysed

    
waveletFunction='db8';
[C,L] = wavedec(Channel1,6,waveletFunction); %6 LEVEL DECOMPOSITION , SAMPLING FREQUENCY = 500Hz (Considering only Beta and Alpha Analysis) (Frequency: Alpha_9-12Hz, Beta_13-30Hz)


cD1 = detcoef(C,L,1);                   %NOISY                            
cD2 = detcoef(C,L,2);                   %NOISY
cD3 = detcoef(C,L,3);                   %GAMMA
cD4 = detcoef(C,L,4);                   %BETA
cD5 = detcoef(C,L,5);                   %ALPHA
cD6 = detcoef(C,L,6);                   %THETA
cA6 = appcoef(C,L,waveletFunction,6);   %DELTA
 
D1 = wrcoef('d',C,L,waveletFunction,1); %NOISY
D2 = wrcoef('d',C,L,waveletFunction,2); %NOISY
D3 = wrcoef('d',C,L,waveletFunction,3); %GAMMA
D4 = wrcoef('d',C,L,waveletFunction,4); %BETA
D5 = wrcoef('d',C,L,waveletFunction,5); %ALPHA
D6 = wrcoef('d',C,L,waveletFunction,6); %THETA
A6 = wrcoef('a',C,L,waveletFunction,6); %DELTA

Beta = D4; figure, plot(1:1:length(Beta), Beta.^0.8),title('BETA POWER ANALYSIS GRAPH');
Alpha = D5; figure, plot(1:1:length(Alpha),Alpha.^1.2),title('ALPHA POWER ANALYSIS GRAPH'); 
Delta = A6; figure, plot(1:1:length(Delta),Delta),title('DELTA POWER ANALYSIS GRAPH');
Theta = D6; figure, plot(1:1:length(Theta),Theta),title('THETA POWER ANALYSIS GRAPH');


POWER_ALPHA = (sum(D5.^2))/length(D5); % Power proporationality to amplitude
POWER_BETA = (sum(D4.^2))/length(D4); 
POWER_DELTA = (sum(A6.^2))/length(A6);
POWER_THETA = (sum(D6.^2))/length(D6);

RATIO = (POWER_BETA/POWER_ALPHA)+0.2967;
RATIO_Short_Term_Attention = RATIO 
RATIO_Long_Term_Attention = RATIO - 0.0234
Working_Memory = 100/((POWER_DELTA + POWER_BETA)/POWER_ALPHA )
if RATIO <= 0.5
    disp('Attentional Focus less than desired attention')
end


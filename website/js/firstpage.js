function displayBlinkDot(element){
  element.css('transform', 'scale(1.0)');
}
  var socket = io();
  var arrayValues = [];
  var scrollTopValue = 0;
  var thisID = '';
  $(document).scroll(function(){
    scrollTopValue = $(this).scrollTop();
    console.log(scrollTopValue);
  });
  socket.on('yourID', function(doc){
    thisID = doc.thisID
  });
  socket.on('new client', function(doc){
    console.log(doc.text);
  });
  var current = 100;
  var isItValidating = false;
  var blinkCounter

  socket.on('eyes open', function(doc){
    if(!isItValidating){
      $('body').scrollTop(scrollTopValue+=60);
      scrollTopValue+=60;
    }else{
      blinkCounter++;
      if(blinkCounter == 1){
        displayBlinkDot($('#firstBlinkFlash'));
      }else if(blinkCounter == 2){
        displayBlinkDot($('#secondBlinkFlash'));
      }
      else if(blinkCounter == 3){
        displayBlinkDot($('#thirdBlinkFlash'));
        socket.emit('this is a pair', {
          museSocketID:doc.id,
          userSocketID:thisID
        });
      }
    }

  });
  setTimeout(function(){
    $('body').scrollTop(scrollTopValue+=100);
  },2000);

  socket.on('challen', function(doc){
    if(arrayValues.length < 150){
      arrayValues.push(doc.text);
    }else{
      arrayValues.push(doc.text);
      arrayValues.shift();
    }
    console.log(arrayValues);
    console.log(arrayValues.length);
  });
  socket.on('eyes open', function(doc){
    console.log('eyes open');
  });

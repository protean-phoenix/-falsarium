window.onload = function(){
  const twoWidth = 850;
  const twoHeight = 480;
  const playfieldWidth = twoWidth - 7;
  const playfieldHeight = twoHeight - 7;
  const leftBoundry = 40;
  const rightBoundry = playfieldWidth - 32;
  const topBoundry = 40;
  const bottomBoundry = playfieldHeight - 32;

  const two = new Two({width:twoWidth, height:twoHeight}).appendTo(document.getElementById('userInterface'));
  const chat = document.createElement('div');
  const inputBox = document.createElement('input');
  inputBox.setAttribute('type', 'text');
  inputBox.setAttribute('id', 'inputBox');
  chat.setAttribute('id', 'chat');
  document.getElementById('userInterface').append(chat);
  document.getElementById('userInterface').append(inputBox);

  let player = {};
  let opponent = {};

  const playfield = two.makeRectangle(twoWidth/2, twoHeight/2, playfieldWidth, playfieldHeight);
  const playerSquare = two.makeRectangle(475, twoHeight/2, 50, 50);
  const opponentSquare = two.makeRectangle(375, twoHeight/2, 50, 50);
  player.square = playerSquare;
  opponent.square = opponentSquare;

  const upVector = new Two.Vector(0, -5);
  const downVector = new Two.Vector(0, 5);
  const leftVector = new Two.Vector(-5, 0);
  const rightVector = new Two.Vector(5, 0);

  let animals = ['wolf', 'gecko', 'finch', 'trout', 'beaver', 'rhino', 'mantis', 'hornet', 'skink', 'salamander', 'vulture', 'crow', 'spider', 'platypus'];
  let colors = [{name:'red', fill:'#FF5555', stroke:'#DD3333'},
    {name:'orange', fill:'#FFAA55', stroke:'#DD8833'},
    {name:'yellow', fill:'#FFFF55', stroke:'#DDDD33'},
    {name:'green', fill:'#55FF55', stroke:'#33DD33'},
    {name:'blue', fill:'#55AAFF', stroke:'#4488DD'},
    {name:'indigo', fill:'#5555FF', stroke:'#3333DD'},
    {name:'violet', fill:'#BBAAFF', stroke:'#9988DD'}];
  let playerColor = colors.splice(Math.floor(Math.random()*colors.length), 1)[0];
  let playerAnimal = animals.splice(Math.floor(Math.random()*animals.length), 1)[0];
  player.color = playerColor;
  player.animal = playerAnimal;
  let opponentColor = colors.splice(Math.floor(Math.random()*colors.length), 1)[0];
  let opponentAnimal = animals.splice(Math.floor(Math.random()*animals.length), 1)[0];
  opponent.color = opponentColor;
  opponent.animal = opponentAnimal;

  opponent.fullName = opponent.color.name+' '+opponent.animal;
  player.fullName = player.color.name+' '+player.animal;
  const nameText = new Two.Text('you are '+player.fullName+'.', 450, 100,
    {fill:player.color.fill, stroke:player.color.stroke, size:50});
  two.add(nameText);

  inputBox.style.color = player.color.fill;

  playfield.fill = '#000000';
  playfield.stroke = '#555555';
  playfield.linewidth = 7;

  player.square.fill = player.color.fill;
  player.square.stroke = player.color.stroke;
  player.square.linewidth = 7;

  opponent.square.fill = opponent.color.fill;
  opponent.square.stroke = opponent.color.stroke;
  opponent.square.linewidth = 7;

  postToChat('glhf', opponent);

  document.addEventListener('keydown', function(event){
    console.log(event.key);
    if(event.key == 'ArrowDown' && player.square.translation.y < bottomBoundry){
      player.square.translation.addSelf(downVector);
    }
    if(event.key == 'ArrowUp' && player.square.translation.y > topBoundry){
      player.square.translation.addSelf(upVector);
    }
    if(event.key == 'ArrowLeft' && player.square.translation.x > leftBoundry){
      player.square.translation.addSelf(leftVector);
    }
    if(event.key == 'ArrowRight' && player.square.translation.x < rightBoundry){
      player.square.translation.addSelf(rightVector);
    }
    if(event.key == 'Enter' && document.activeElement === inputBox){
      postToChat(inputBox.value, player);
      inputBox.value = '';
    }
  });

  two.bind('update', function(frameCount){
    if(frameCount > 5*60 && nameText.opacity > 0){
      nameText.opacity -= 0.01;
    }
  }).play();

  function postToChat(text, character){
    const chatText = document.createElement('p');
    chatText.innerHTML = character.fullName+': '+text;
    chatText.style.color = character.color.fill;

    chat.prepend(chatText);

    while(chat.childElementCount > 9){
      chat.removeChild(chat.childNodes[9]);
    }
  }
};

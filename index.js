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

  const playfield = two.makeRectangle(twoWidth/2, twoHeight/2, playfieldWidth, playfieldHeight);
  const player = two.makeRectangle(twoWidth/2, twoHeight/2, 50, 50);

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
  let color = colors.splice(Math.floor(Math.random()*colors.length), 1)[0];
  let animal = animals.splice(Math.floor(Math.random()*animals.length), 1)[0];

  const fullName = color.name+' '+animal;
  const nameText = new Two.Text('you are '+fullName+'.', 450, 100,
    {fill:color.fill, stroke:color.stroke, size:50});
  two.add(nameText);

  inputBox.style.color = color.fill;

  playfield.fill = '#000000';
  playfield.stroke = '#555555';
  playfield.linewidth = 7;

  player.fill = color.fill;
  player.stroke = color.stroke;
  player.linewidth = 7;

  document.addEventListener('keydown', function(event){
    console.log(event.key);
    if(event.key == 'ArrowDown' && player.translation.y < bottomBoundry){
      player.translation.addSelf(downVector);
    }
    if(event.key == 'ArrowUp' && player.translation.y > topBoundry){
      player.translation.addSelf(upVector);
    }
    if(event.key == 'ArrowLeft' && player.translation.x > leftBoundry){
      player.translation.addSelf(leftVector);
    }
    if(event.key == 'ArrowRight' && player.translation.x < rightBoundry){
      player.translation.addSelf(rightVector);
    }
    if(event.key == 'Enter' && document.activeElement === inputBox){
      postToChat(inputBox.value);
      inputBox.value = '';
    }
  });

  two.bind('update', function(frameCount){
    if(frameCount > 5*60 && nameText.opacity > 0){
      nameText.opacity -= 0.01;
    }
  }).play();

  function postToChat(text){
    const chatText = document.createElement('p');
    chatText.innerHTML = fullName+': '+text;
    chatText.style.color = color.fill;

    chat.prepend(chatText);

    while(chat.childElementCount > 9){
      chat.removeChild(chat.childNodes[9]);
    }
  }
};

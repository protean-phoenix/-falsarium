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

  let player = {player:true, topCollision:false, bottomCollision:false, leftCollision:false, rightCollision:false};
  let opponentOne = {player:false, topCollision:false, bottomCollision:false, leftCollision:false, rightCollision:false};
  let opponentTwo = {player:false, topCollision:false, bottomCollision:false, leftCollision:false, rightCollision:false};
  let opponentThree = {player:false, topCollision:false, bottomCollision:false, leftCollision:false, rightCollision:false};
  let opponentFour = {player:false, topCollision:false, bottomCollision:false, leftCollision:false, rightCollision:false};
  let opponentFive = {player:false, topCollision:false, bottomCollision:false, leftCollision:false, rightCollision:false};
  let opponentSix = {player:false, topCollision:false, bottomCollision:false, leftCollision:false, rightCollision:false};
  let characters = [player, opponentOne, opponentTwo, opponentThree, opponentFour, opponentFive, opponentSix];

  const playfield = two.makeRectangle(twoWidth/2, twoHeight/2, playfieldWidth, playfieldHeight);
  const playerSquare = two.makeRectangle(425, 200, 50, 50);
  const opponentOneSquare = two.makeRectangle(350, 200, 50, 50);
  const opponentTwoSquare = two.makeRectangle(500, 200, 50, 50);
  const opponentThreeSquare = two.makeRectangle(325, 275, 50, 50);
  const opponentFourSquare = two.makeRectangle(400, 275, 50, 50);
  const opponentFiveSquare = two.makeRectangle(475, 275, 50, 50);
  const opponentSixSquare = two.makeRectangle(550, 275, 50, 50);
  player.square = playerSquare;
  opponentOne.square = opponentOneSquare;
  opponentTwo.square = opponentTwoSquare;
  opponentThree.square = opponentThreeSquare;
  opponentFour.square = opponentFourSquare;
  opponentFive.square = opponentFiveSquare;
  opponentSix.square = opponentSixSquare;

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

    for(let character of characters){
      let characterColor = colors.splice(Math.floor(Math.random()*colors.length), 1)[0];
      let characterAnimal = animals.splice(Math.floor(Math.random()*animals.length), 1)[0];
      character.color = characterColor;
      character.animal = characterAnimal;

      character.square.fill = character.color.fill;
      character.square.stroke = character.color.stroke;
      character.square.linewidth = 7;

      character.fullName = character.color.name+' '+character.animal;

      if(character.player){
        continue;
      }
      postToChat('glhf', character);
    }

  const nameText = new Two.Text('you are '+player.fullName+'.', 450, 100,
    {fill:player.color.fill, stroke:player.color.stroke, size:50});
  two.add(nameText);

  inputBox.style.color = player.color.fill;

  playfield.fill = '#000000';
  playfield.stroke = '#555555';
  playfield.linewidth = 7;

  /**************************
   * EVENT LISTENER SECTION *
   **************************/

  document.addEventListener('keydown', function(event){
    if(event.key == 'ArrowDown' && player.square.translation.y < bottomBoundry && player.bottomCollision === false){
      player.square.translation.addSelf(downVector);
    }
    if(event.key == 'ArrowUp' && player.square.translation.y > topBoundry && player.topCollision === false){
      player.square.translation.addSelf(upVector);
    }
    if(event.key == 'ArrowLeft' && player.square.translation.x > leftBoundry && player.leftCollision === false){
      player.square.translation.addSelf(leftVector);
    }
    if(event.key == 'ArrowRight' && player.square.translation.x < rightBoundry && player.rightCollision === false){
      player.square.translation.addSelf(rightVector);
    }
    if(event.key == 'Enter' && document.activeElement === inputBox){
      postToChat(inputBox.value, player);
      inputBox.value = '';
    }
  });

  /**********************
   * TENSORFLOW SECTION *
   **********************/

  two.bind('update', function(frameCount){
    if(frameCount > 5*60 && nameText.opacity > 0){
      nameText.opacity -= 0.01;
    }
    collisionDetection();
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

  function collisionDetection(){
    let startCheck = 0;
    for(let character of characters){
      character.topCollision = false;
      character.bottomCollision = false;
      character.leftCollision = false;
      character.rightCollision = false;
    }
    for(let i = 0; i < characters.length-1; i++){
      startCheck++;
      characterOneTop = characters[i].square.getBoundingClientRect()['top'];
      characterOneBottom = characters[i].square.getBoundingClientRect()['bottom'];
      characterOneLeft = characters[i].square.getBoundingClientRect()['left'];
      characterOneRight = characters[i].square.getBoundingClientRect()['right'];

      for(let j = startCheck; j < characters.length; j++){
        characterTwoTop = characters[j].square.getBoundingClientRect()['top'];
        characterTwoBottom = characters[j].square.getBoundingClientRect()['bottom'];
        characterTwoLeft = characters[j].square.getBoundingClientRect()['left'];
        characterTwoRight = characters[j].square.getBoundingClientRect()['right'];

        if(((characterOneLeft >= characterTwoLeft &&
        characterOneLeft <= characterTwoRight) ||
        (characterOneRight >= characterTwoLeft &&
        characterOneRight <= characterTwoRight)) &&
        characterOneTop <= characterTwoBottom + 5 &&
        characterOneTop >= characterTwoTop){
          characters[i].topCollision = true;
          characters[j].bottomCollision = true;
        }
        if(((characterOneLeft >= characterTwoLeft &&
        characterOneLeft <= characterTwoRight) ||
        (characterOneRight >= characterTwoLeft &&
        characterOneRight <= characterTwoRight)) &&
        characterOneBottom >= characterTwoTop - 5 &&
        characterOneBottom <= characterTwoBottom){
          characters[j].topCollision = true;
          characters[i].bottomCollision = true;
        }
        if(((characterOneTop >= characterTwoTop &&
        characterOneTop <= characterTwoBottom) ||
        (characterOneBottom >= characterTwoTop &&
        characterOneBottom <= characterTwoBottom)) &&
        characterOneLeft <= characterTwoRight + 5 &&
        characterOneLeft >= characterTwoLeft){
          characters[i].leftCollision = true;
          characters[j].rightCollision = true;
        }
        if(((characterOneTop >= characterTwoTop &&
        characterOneTop <= characterTwoBottom) ||
        (characterOneBottom >= characterTwoTop &&
        characterOneBottom <= characterTwoBottom)) &&
        characterOneRight >= characterTwoLeft - 5 &&
        characterOneRight <= characterTwoRight){
          characters[j].leftCollision = true;
          characters[i].rightCollision = true;
        }
      }
    }
  }
};

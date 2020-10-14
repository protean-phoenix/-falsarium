window.onload = function(){
  const two = new Two({width:900, height:900}).appendTo(document.getElementsByTagName('Body')[0]);

  const playfield = two.makeRectangle(450, 450, 850, 850);
  const player = two.makeRectangle(450, 450, 50, 50);

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

  const nameText = new Two.Text('you are '+color.name+' '+animal+'.', 450, 100,
    {fill:color.fill, stroke:color.stroke, size:25});
  two.add(nameText);

  playfield.fill = '#000000';
  playfield.stroke = '#555555';
  playfield.linewidth = 7;

  player.fill = color.fill;
  player.stroke = color.stroke;
  player.linewidth = 7;

  two.update();
};

window.onload = function(){
  console.log("width: "+window.innerWidth);
  console.log("height: "+window.innerHeight);
  const two = new Two({width:900, height:900}).appendTo(document.getElementsByTagName('Body')[0]);
  rect = two.makeRectangle(450, 450, 850, 850);
  rect.fill = '#AAAAAA';
  rect.stroke = '#555555';
  rect.linewidth = 7;
  two.update();
};

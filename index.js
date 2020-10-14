window.onload = function(){
  helloWorldElement = document.createElement("p");
  helloWorldElement.innerHTML = "hello world!";
  document.getElementsByTagName("Body")[0].append(helloWorldElement);
};

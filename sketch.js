var dog,dogImg,happyDogImg,database,foodS,foodStock;

function preload()
{
	dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/happydogImg.png");
}

function setup() {
	createCanvas(800, 700);
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
  foodStock.set(20);

  dog = createSprite(400,400,10,60);
  dog.addImage(dogImg);
  dog.scale = 0.2;
}


function draw() { 
  background("green");
  
  if(foodS!== undefined){
    textSize(20);
    fill(255)
    text("Note: Press UP ARROW to feed DRAGO milk",200,50);
    text("Food Remaining: "+foodS,300,150);

    if(keyWentDown(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(happyDogImg);
    }

    if(keyWentUp(UP_ARROW)){
      dog.addImage(dogImg);
    }

    if(foodS === 0){
      foodS = 20;
    }
  

  drawSprites();
  //add styles here
  }
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref("/").update({
    Food:x
  });
}

function readStock(data){
  foodS = data.val();
}


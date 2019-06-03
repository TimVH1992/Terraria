const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_GAP = 2;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;

let levelOne = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 9,
				0, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7,
				6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7,
				6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
				7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7];	
	

let mapList = [levelOne];
				
let trackGrid = [];

const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;
const TRACK_GOAL = 3;
const TRACK_TREE = 4;
const TRACK_FLAG = 5;
const TRACK_STONE = 6;
const TRACK_GRASS = 7;
const TRACK_PRESENT = 8;
const TRACK_GOLD_CHEST = 9;

function returnTileTypeAtColRow(col, row) {
	if(col >= 0 && col < TRACK_COLS &&
		row >= 0 && row < TRACK_ROWS) {
		 let trackIndexUnderCoord = rowColToArrayIndex(col, row);
		 return (trackGrid[trackIndexUnderCoord]);
	} else {
		return TRACK_WALL;
	}
}

function carTrackHandling(whichCar) {
	let carTrackCol = Math.floor(whichCar.x / TRACK_W);
	let carTrackRow = Math.floor(whichCar.y / TRACK_H);
	let trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);

	if(carTrackCol >= 0 && carTrackCol < TRACK_COLS &&
		carTrackRow >= 0 && carTrackRow < TRACK_ROWS) {

			let tileHere = returnTileTypeAtColRow( carTrackCol,carTrackRow );

		if(tileHere == TRACK_GOAL) {
			alert(whichCar.name + "Wins");
			
			loadLevel(levelOne);
			
		} else if (tileHere != TRACK_ROAD) {
			whichCar.x -= Math.cos(whichCar.ang) * whichCar.speed;
            whichCar.y -= Math.sin(whichCar.ang) * whichCar.speed;
		} // end of track found
	} // end of valid col and row
} // end of carTrackHandling func

function rowColToArrayIndex(col, row) {
	return col + TRACK_COLS * row;
}

function drawTracks() {
	let arrayIndex = 0;
	let drawTileX = 0;
	let drawTileY =0;

	for(let eachRow=0;eachRow<TRACK_ROWS;eachRow++) {
		for(let eachCol=0;eachCol<TRACK_COLS;eachCol++) {

			let arrayIndex = rowColToArrayIndex(eachCol, eachRow);
			let tileKindHere = trackGrid[arrayIndex];

			let useImg = trackPics[tileKindHere];
			
			canvasContext.drawImage(useImg, drawTileX, drawTileY);
			
			drawTileX += TRACK_W;
			arrayIndex++;
		} // end of for each col
		drawTileX = 0;
		drawTileY += TRACK_H;
	} // end of for each row
} // end of drawTracks func


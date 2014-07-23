randomQuestion();

$(document).ready(function() {
	
	
setTimeout(function(){
	writeSitesettings();
	writeQueryVariable();
	writeCount();
	readVariableandwritesite();
	writeRolls();
	}, 1000);


$('body').on('click', '#flip-1', function(){
		fadeQuestion();
		fadeinAnswer('#answer-1');
		setTimeout(writeQuestion, timeout);
	});
	
	$('body').on('click', '#flip-2', function(){
		fadeQuestion();
		fadeinAnswer('#answer-2');
		setTimeout(writeQuestion, timeout);
	});
	
	$('body').on('click', '.flop', flopFull);	
	$('body').on('click', '.btn-submit', panelFlip);	
	$('body').on('click', '#closelink', formX );

});
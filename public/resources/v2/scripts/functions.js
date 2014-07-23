	function randomQuestion(){
		question = questions[Math.floor(Math.random()*questions.length)];
	}
	
	function writeRatingstars() {
		for (i = 1; i < 6; i++) {
			$('.ratings-inner').append('<i id="' + i + '" class="fa fa-star-o fa-lg ratingglow"></i>');
		}
	}
	
	function writeSitesettings(){
		$('.pagetitle').html(pagetitle);
		$(document).prop('title', pagetitle);
		$('.permalinkurl').html(permalinkurl);
		$('.pagequestion').html(pagequestion);
		$('#formcta').html(formcta);
		$('.input1').attr("placeholder", input1);
		$('.input2').attr("placeholder", input2);
		$('.input3').attr("placeholder", input3);
		$('.input1label').html(input1label);
		$('.input2label').html(input2label);
		$('.input3label').html(input3label);
		$('#footermessage').html(footermesage);
	}
		
	function mainLoad(){
		$('.questionimagearea').attr("src", question.questionimage);
		$('.answerimagearea').attr("src", question.answerimage);
		$('#question-title').html(question.questiontitle);
		$('#question-wrap').html(question.question);
		$('#answer-1-title').html(question.answer1title);
		$('#answer-1-wrap').html(question.answer1);
		$('#answer-2-title').html(question.answer2title);
		$('#answer-2-wrap').html(question.answer2);
		$('.pagetitle').fadeIn('slow');
		$('.questionimagearea').fadeIn('slow');
		$('#question').fadeIn('slow');
		$('.permalink').html(question.number);
		randomQuestion();
	}
	
	function writeRolls() {
		$('#rolls').html(rolls);
		rolls = rolls + 1;
	}
		
	function getQueryVariable(variable)
	{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
	   }
	
	function writeQueryVariable(){
		variable = getQueryVariable("question");
		
	}
	
	
	function writeCount(){
		$.get( "count.txt", function(data) {
			$("#count").html( data );
			});
	}
		
	function writeQuestion(){
		var iterations = 0;
		while (question.number == current && iterations < 11) {
			randomQuestion();
			iterations++;	
		};
		writeRolls();
		current = question.number;
		$('.questionimagearea').attr("src", question.questionimage);
		$('#question-title').html(question.questiontitle);
		$('#question-wrap').html(question.question);
		
	}
	
	function writeAnswer(){
		$('.answerimagearea').attr("src", question.answerimage);
		$('#answer-1-title').html(question.answer1title);
		$('#answer-1-wrap').html(question.answer1);
		$('#answer-2-title').html(question.answer2title);
		$('#answer-2-wrap').html(question.answer2);
		$('.permalink').html(question.number);
	}
	
	function formX() {
		if (collapsed == 0) {
			$('#close').fadeTo('slow', 1.0);
			collapsed = 1;
			}
		else {
			$('#close').fadeTo('slow', 0.0);
			collapsed = 0;
		}
	}
	
	function fadeQuestion () {
		$('#question').fadeOut(fadespeed);
	}
	
	function panelFlip () {
		$('.panel-content').fadeOut(fadespeed);
		$('.panel-thanks').fadeIn(fadespeed);
	}
	
	function pushScript() {
	$.ajax({ url: 'script.php' });
	}
	
	function tripleThreat(){
		writeAnswer();
		pushScript();
		writeCount();

	}
	
	function flopFull() {
		$('.answer').fadeOut(fadespeed);
		$('#question').fadeIn(fadespeed, tripleThreat);
		$('.ratings-inner').html("");
		writeRatingstars();
	}
	
	function fadeinAnswer (String){
		$(String).fadeIn(fadespeed);
	}
	
	function runFades(String) {
		fadeQuestion();
		fadeinAnswer(String);
		setTimeout(writeQuestion, timeout);
	}
	
	function writeNumquestions(){
		$('#numquestions').html(questions.length);
	}
	
	function readVariableandwritesite() {
		if (variable == "") {
		mainLoad();
		}
		else if (variable != ""){
		numberofquestions = questions.length;
		if (variable <= numberofquestions) {
			question = questions[variable]
			mainLoad();
			randomQuestion();
			}
		else {
			mainLoad();
		}
	}
	
	}
// hover over stars - rating

function starReplace1() {
	var rateStar = $(this).attr("id");
		reRatedrop();
	for (i = rateStar; i > -1; i--) {
		$('#' + i).removeClass('fa-star-o fa-lg');
		$('#' + i).addClass('fa-star fa-2x');
		}
	}
function starReplace2() {
	var rateStar = $(this).attr("id");
	for (i = rateStar; i > -2; i--) {
		$('#' + i).removeClass('fa-star fa-2x');
		$('#' + i).addClass('fa-star-o fa-lg');
		}
	reRatedrop();
	reRateadd();
	}	

// The default rating for the question.	
	
rateId = 0

// function ran when CLICKING a star

function setRateid () {
	rateId = $(this).attr("id");
}

function reRatedrop() {
	for (i = rateId; i > -1; i--) {
		$('#' + i).removeClass('fa-star fa-2x');
		$('#' + i).addClass('fa-star-o fa-lg');
		}
}

function reRateadd() {
	for (j = rateId; j > -1; j--) {
			$('#' + j).removeClass('fa-star-o fa-lg');
			$('#' + j).addClass('fa-star fa-2x');
			}
		}


function starRate() {
	if (rateId < $(this).attr("id")){
		rateId = $(this).attr("id");
		console.log('if');
		for (i = rateId; i > -1; i--) {
			$('#' + i).removeClass('fa-star-o fa-lg');
			$('#' + i).addClass('fa-star fa-2x');		}
		}
	else if	(rateId > $(this).attr("id")){
		console.log('else');
		rateId = $(this).attr("id");
		reRatedrop();
		reRateadd();
		}
	else {
		rateId = 0
		for (i = rateId; i > -1; i--) {
			reRatedrop();
					}
		}		
}

console.log('else if');
		
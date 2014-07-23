	
var questions = [];
var question = [];
var current = question.questionnumber;
var collapsed = 0;
var variable = ""
var timeout = "500"
var fadespeed = "400"
var rolls = 0


	
function randomQuestion(){
 	 $.ajax({
    	url: "/gary/feed/",
    	async: false,
    	dataType: 'json',
    	success: function(data) {
    	questions = data;
    	question = questions[Math.floor(Math.random()*questions.length)];
    	}
    });
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
	
	function readVariableandwritesite() {
		if (variable == "") {
		mainLoad();
				}
		else if (variable != ""){
		numberofquestions = questions.length;
		console.log(numberofquestions + "ehhh")
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
		$('.permalink').html(question.questionnumber);
	}
	
	function writeRolls() {
		$('#rolls').html(rolls);
		rolls = rolls + 1;
	}
		
		
	
	function writeCount(){
		$.get( "count.txt", function(data) {
			$("#count").html( data );
			});
	}
		
	function writeQuestion(){
		var iterations = 0;
		while (question.questionnumber == current && iterations < 11) {
			randomQuestion();
			console.log(question.questionnumber)
			iterations++;	
		};
		writeRolls();
		current = question.questionnumber;
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
		$('.permalink').html(question.questionnumber);
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
		console.log(numberofquestions + "ehhh")
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
	
	
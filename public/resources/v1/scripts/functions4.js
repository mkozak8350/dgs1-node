var pagetitle = "doesgarysinise";
var pagequestion = "does Gary Sinise...";
var permalinkurl = "http://www.doesgarysinise.com";
var formcta = "Got an idea for a question?";
var input1label = "In..";
var input1 = "enter the name of a movie";
var input2label = "Does Gary Sinise...";
var input2 = "do such and such...";
var input3label = "Anything Else to Add?";
var input3 = "ex. how were his legs removed in this movie? links to appropriate images, feel free to be absurd";
var footermesage ="This website was inspired by one of the fundamental questions about any work that features Gary Sinise. <br /> In that particular work...Does Gary Sinise have legs?";
var questions = new Object();
var collapsed = 0;
var variable = "";
var timeout = "500";
var fadespeed = "400";
var rolls = 0;
var nextQuestionIndex = 1;
var question = new Object();
var rateMath = "";
var count = "";
// write main site settings into site.  accessible for site changes.

function writeSiteSettings(){
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
	
// pull permalink and parse

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

//write permalink to variable	

function writeQueryVariable(){
		variable = getQueryVariable("question");
		
	}	

//check the permalink variable, validate, and then load relevant content, random or perm

function checkWriteSite() {
		if (variable == "") {
			mainLoad();
				}
		else if (variable != "" && variable < questions.length){
			pullQuestionClean();
			mainLoad();
			}
		else {
			console.log("elsed out");
			mainLoad();
		}
	}
	
	

//runs a random question and then loads all of the information into the page.

function mainLoad(){
		$('.questionimagearea').attr("src", "../../" + question.questionimage);
		$('.answerimagearea').attr("src", "../../" + question.answerimage);
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
		updateCounter();
		$("#count").html("");
		$("#count").html(count);
	}




// take the an array and shuffle it

function shuffleArray(array) { 
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// push nextQuestionIndex up 

function nextQuestion() {
		nextQuestionIndex++;
		if (nextQuestionIndex >= questions.length) {
			nextQuestionIndex = 0;
			pullQuestion();
		}
		else {
		question = questions[nextQuestionIndex];
		}
	}
	


//pull feed, shuffle data, write to question, set question to index 0 of shuffled data

function pullQuestionClean(){
			$.ajax({
		    	url: "/gary/feed/",
		    	async: false,
		    	dataType: 'json',
		    	success: function(data) {
		    		count = data[0].counter;
			    	 questions = data;
			    	 question = questions[variable];

						}});
					}


function pullQuestion(){
			$.ajax({
		    	url: "/gary/feed/",
		    	async: false,
		    	dataType: 'json',
		    	success: function(data) {
		    		count = data[0].counter;
		    		data.splice(0, 1);
			    	 shuffleArray(data); // housekeeping task
			    	 questions = data;
			    	 question = questions[nextQuestionIndex];
						}});
					}

		

function writeQuestion(){
		nextQuestion();	
		writeRolls();
		$('.questionimagearea').attr("src", "../../" + question.questionimage);
		$('#question-title').html(question.questiontitle);
		$('#question-wrap').html(question.question);
		
	}		
//writes number of turns per session between reloads

function writeRolls() {
		$('#rolls').html(rolls);
		rolls = rolls + 1;
	}
	
// writes number of questions at bottom
	
function writeNumquestions(){
		$('#numquestions').html(questions.length);
	}
	
// just fade in the question	
	
function fadeQuestion () {
		$('#question').fadeOut(fadespeed);
	}

//fade in specific div answer, based on choice

function fadeinAnswer (String){
		$(String).fadeIn(fadespeed);
	}

//while the question number is the same as the current 



//function for fading closing X on accordion

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

//function for flipping panels in footer question submission box.

function panelFlip () {
		$('.panel-content').fadeOut(fadespeed);
		$('.panel-thanks').fadeIn(fadespeed);
	}

//fades out the answer, fades in the question, then runs writes a new answer, and spins the questions - below

function rewriteRatingstars() {
writeRatingstars();
$('.ratings-inner').fadeIn(fadespeed);
}
	
function flopFull() {
		$('.answer').fadeOut(fadespeed);
		$('#question').fadeIn(fadespeed, writeAnswer);
		$('.ratings-inner').html("");
		$('.rated-inner').fadeOut(fadespeed, rewriteRatingstars);
		updateCounter();
		$("#count").html(count);
		console.log(count);
		
	}	



// writes the answer

function writeAnswer(){
		$('.answerimagearea').attr("src", "../../" + question.answerimage);
		$('#answer-1-title').html(question.answer1title);
		$('#answer-1-wrap').html(question.answer1);
		$('#answer-2-title').html(question.answer2title);
		$('#answer-2-wrap').html(question.answer2);
		$('.permalink').html(question.questionnumber);
	}



function starReplace1() {
	var rateStar = $(this).attr("id");
		reRatedrop();
	for (i = rateStar; i > -1; i--) {
		$('#' + i).removeClass('fa-star-o fa-2x');
		$('#' + i).addClass('fa-star fa-3x');
		}
	}
function starReplace2() {
	var rateStar = $(this).attr("id");
	for (i = rateStar; i > -2; i--) {
		$('#' + i).removeClass('fa-star fa-3x');
		$('#' + i).addClass('fa-star-o fa-2x');
		}
	reRatedrop();
	reRateadd();
	}	

// The default rating for the question.	

rateId = 0;

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
		for (i = rateId; i > -1; i--) {
			$('#' + i).removeClass('fa-star-o fa-lg');
			$('#' + i).addClass('fa-star fa-2x');		}
		}
	else if	(rateId > $(this).attr("id")){
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

function writeRatingstars() {
		for (i = 1; i < 6; i++) {
			$('.ratings-inner').append('<i id="' + i + '" class="fa fa-star-o fa-2x ratingglow"></i>');
		}
	}



function getRatingSum () {
	var total=0;
	for (var i=(question.rating).length; i--;) {
     total+=(question.rating)[i];
	 }
	 ratingSum = total / (question.rating).length;
}

function updateCounter() {
	count++;
	$.ajax({
            type: 'POST',
            data: '222',
            url: '/gary/counter/',
            dataType: 'JSON'
        }).done(function(data) {
        });
       }


function submitRating(event) {
    event.preventDefault();
    var qrating = parseInt(question.rating)
    var qratings = parseInt(question.ratings)
    var postRating = qrating / qratings;
	var newRating = qrating + parseInt($(this).attr("id"));
    var newRatings = qratings + 1;
	var ratingData = {
		'question': question.questionnumber,
		'rating': newRating,
		'_id': question._id,
		'ratings': newRatings,
        };
        console.log(ratingData);

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: ratingData,
            url: '/gary/rate/',
            dataType: 'JSON'
        }).done(function(  ) {
	           
			});
			 $(".ratings-inner").fadeOut(200, function(){
					$(".rated-inner").html("<p>Got it!</p>");
					$(".rated-inner").append("<p>Avg Rating: " + postRating.toFixed(2) + "/5</p>");
					$(".rated-inner").fadeIn(200).css('display', 'table');
					            
				});
   }

$(document).ready(function(){
	
	pullQuestion();
	setTimeout(function(){
		writeSiteSettings(); //writes the site settings
		writeQueryVariable(); //checks for a permalink
		checkWriteSite(); //writes the main info to the question and image area for first load
		writeRolls(); //writes the initial rolls of 0
		writeNumquestions(); //writes the number of questions from length of array pulled
		writeRatingstars();
		}, 400);
		
		$('body').on('click', '#closelink', formX );
		
		$('body').on('click', '.btn-submit', panelFlip);
		
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
		
		$('body').on('mouseenter', '.ratingglow', starReplace1 );
		$('body').on('mouseleave', '.ratingglow', starReplace2 );
		$('body').on('click', '.ratingglow', submitRating );
	
});
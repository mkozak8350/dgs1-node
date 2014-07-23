$(document).ready(function() {
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


	
//function starReplace2() {
//	$(this).removeClass('fa-star fa-2x');
//	$(this).addClass('fa-star-o fa-lg');
//	}

	$('body').on('click', '.flop', flopFull);	
	$('body').on('click', '.btn-submit', panelFlip);	
	$('body').on('click', '#closelink', formX );
	$('body').on('mouseenter', '.ratingglow', starReplace1 );
	$('body').on('mouseleave', '.ratingglow', starReplace2 );
	$('body').on('click', '.ratingglow', starRate );
	
});
	
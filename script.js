$(document).ready(function() {

	var nums = [];
	var operations = [];

	var onDisplay = '0';
	var newInput = true;
	var dotted = false;

	$(document).on('click', '.btn', function(){
		switch (this.id){
			case 'btn1': insertNum('1'); break;
			case 'btn2': insertNum('2'); break;
			case 'btn3': insertNum('3'); break;
			case 'btn4': insertNum('4'); break;
			case 'btn5': insertNum('5'); break;
			case 'btn6': insertNum('6'); break;
			case 'btn7': insertNum('7'); break;
			case 'btn8': insertNum('8'); break;
			case 'btn9': insertNum('9'); break;
			case 'btn0': if(onDisplay !== '0'){ insertNum('0');} break;
			case 'btn-CE': resetScreen(); break;
			case 'btn-AC': allClear(); break;
			case 'btn-plus': addOperation('+'); break;
			case 'btn-minus': addOperation('-'); break;
			case 'btn-times': addOperation('*'); break;
			case 'btn-div': addOperation('/'); break;
			case 'btn-percent': addOperation('percent'); break;
			case 'btn-equals': performCalculations(); break;
			case 'btn-dot': insertDot(); break;

		}

		if(onDisplay.length <= 8){
			$("#display p").html(onDisplay);
		} else {
			error();
		}		
		
		// alert(onDisplay);
	});

	function insertNum(num){
		if(newInput){
			onDisplay = num;
			newInput = false;
		} else {
			onDisplay += num;
		}
	}

	function insertDot(){
		if(!dotted){
			onDisplay += '.';
			dotted = true;
			if(newInput){
				onDisplay = "0.";
				newInput = false;
			}
		}
	}

	function addOperation(o){
		operations.push(o);
		nums.push(parseFloat(onDisplay));
		newInput = true;
		dotted = false;
	}


	function performCalculations(){
		console.log(nums);
		console.log(operations);

		if(operations.length !== 0){
			nums.push(parseFloat(onDisplay));
			var result = nums.reduce(function(acc, val, index){
				console.log(index-1);
				console.log(acc + ' ' + operations[index-1] + ' ' + val);

				switch(operations[index-1]){
					case '+' : return operations[index] !== 'percent' ? acc+val : acc + (acc*(val/100));
					case '-' : return operations[index] !== 'percent' ? acc-val : acc - (acc*(val/100));
					case '*' : return operations[index] !== 'percent' ? acc*val : acc * (acc*(val/100));
					case '/' : return operations[index] !== 'percent' ? acc/val : acc / (acc*(val/100));
					case 'percent' : return acc;
				}
			});
			console.log(result);

			result = result.toString();
			if(result.indexOf('.') >= 0){
				dotted = true;
			}

			if(result.length > 8){
				if(dotted){
					if(result.indexOf('.') < 8){
						onDisplay = result.substring(0, 8);
					} else{error();}
				} else{error();}
			} else {
				onDisplay = result;
			}

			nums = [];
			operations = [];
			newInput = true;
			dotted = false;

			$("#display p").html(result);
			
		}
	}

	function error(){
		$("#display p").html('err');
		window.setTimeout(function(){onDisplay = '0'; $("#display p").html(onDisplay);}, 1500);
		newInput = true;
	}

	function allClear(){
		nums = [];
		operations = [];
		resetScreen();
	}

	function resetScreen(){
		onDisplay = '0';
		newInput = true;
		dotted = false;
	}

}); //end of $(document).ready();


//(num) op num eq
//(num op num) op num eq
//((num op num) op num) op num eq
//num op eq = num op samenum eq
const calc = (operator) => {
	const operand1 = $('#inputOperand1').val();
	const operand2 = $('#inputOperand2').val();
	$('#expression').html(operand1 + " " + operator + " " + operand2);
	/*
	const result = eval(operand1 + operator + operand2);
	$("#result").html(result);
	*/

	$.ajax({
		type: 'POST',
		url: '/calc',
		data: {operand1: operand1, operand2: operand2, operator: operator},
		success: (data) => {
			$("#result").html(data.result);
		}
	});
};

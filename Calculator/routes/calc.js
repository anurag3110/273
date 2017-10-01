
/*
* GET home page.
*/

const calc = (request, response) => {
   let result;
   
   const operand1 = request.body.operand1.trim();
   const operand2 = request.body.operand2.trim();
   const operator = request.body.operator;

   if (operand1 == '') {
      result = 'Operand 1 cannot be blank';
   } else if (isNaN(operand1)) {
      result = 'Operand 1 must be a number';
   } else if (operand2 == '') {
      result = 'Operand 2 cannot be blank';
   } else if (isNaN(operand2)) {
      result = 'Operand 2 must be a number';
   } else if (operator == '/' && Number(operand2) == 0) {
      result = 'Invalid operation: Divide by zero';
   } else {
      result = eval(operand1 + operator + operand2);
   }
   response.send({ result: result });
};

module.exports = calc;

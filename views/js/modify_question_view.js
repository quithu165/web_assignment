function openQuestionList() {
	closeNothingNoti();
	closeDelSuccess();
	closeDelError();
	closeNumWarning();
	var cate = document.getElementById("category");
	var lvl = document.getElementById("level");
	if (cate.options[cate.selectedIndex].value != "" && lvl.options[lvl.selectedIndex].value != "") {
		clearQuestionList();
    	getQuestionList();
	} else {
		document.getElementById("questionForm").style.display = "none";
	}
}

//*******************************************************************************************//
function addCategory(cateList) {
	var category = document.getElementById("category");

	for (var index in cateList) {
		var option = document.createElement("option");
		option.text = cateList[index].c_name;
		option.id = cateList[index].c_id;
		category.add(option);
	}
}

//*******************************************************************************************//
function clearQuestionList() {
	document.getElementById("questionForm").style.display = "none";
	var questions = document.getElementById("questionTable");
	for (var i = questions.rows.length - 1; i >= 0; i--) {
		questions.deleteRow(i);
	}	
}

//*******************************************************************************************//
function closeNothingNoti() {
  document.getElementById("nothing").style.display = "none";
}

//*******************************************************************************************//
function closeDelSuccess() {
  document.getElementById("success").style.display = "none";
}

//*******************************************************************************************//
function closeDelError() {
  document.getElementById("error").style.display = "none";
}

//*******************************************************************************************//
function closeNumWarning() {
	document.getElementById("warning").style.display = "none";
  }

//*******************************************************************************************//
function submitForm() {
	closeNothingNoti();
	closeDelSuccess();
	closeDelError();
	closeNumWarning();
	var questions = document.getElementById("questionTable");
	var totalQuestions = questions.rows.length / 3;
	
	for (var i = totalQuestions - 1; i >= 0; i--) {
		if (questions.rows[3*i].cells[1].firstChild.value != questions.rows[3*i].cells[1].firstChild.defaultValue) {
			var newQuestion = questions.rows[3*i].cells[1].firstChild.value;
			var questionId = questions.rows[3*i].cells[1].firstChild.id;
			updateQuestion(questionId, newQuestion);
			// document.getElementById("warning").style.display = "block";
			// document.getElementById("warning").appendChild(document.createTextNode(questions.rows[3*i].cells[1].firstChild.defaultValue));
			// document.getElementById("warning").appendChild(document.createTextNode(questions.rows[3*i].cells[1].firstChild.value));
			// document.getElementById("warning").appendChild(document.createTextNode(document.getElementById(0).value));
		}
		// if (document.getElementById(i).checked == true) {
			// dataStr = dataStr + questions.rows[3*i].cells[3].id + '-';
		// }
	}

	// modifyQuestions();
}

//*******************************************************************************************//
function resetDelForm() {
	document.getElementById("deleteForm").reset();
	clearQuestionList();
	document.getElementById("questionForm").style.display = "none";
}

//*******************************************************************************************//
function showQuestionList(questionList) {
	var table = document.getElementById("questionTable");

	for (var index in questionList) {
		// Get correct answer
		var correctAns = parseFloat(questionList[index].correct);

		// Insert a row at the end of the table
		var newRow1 = table.insertRow(-1);
	
		// Insert a cell for numbering question in the row 
		var id = newRow1.insertCell(0);
		id.rowSpan = 3;
		id.style.textAlign = "center";
		id.setAttribute("id", "id" + index);
		id.appendChild(document.createTextNode(parseFloat(index)+1));

		// Insert a cell for question text in the row 
		var question = newRow1.insertCell(1);
		question.rowSpan = 3;
		var ques_text = document.createElement("input");
		ques_text.setAttribute("id", questionList[index].q_id);
		ques_text.defaultValue = questionList[index].q_text;
		ques_text.style.border = "none";
		ques_text.style.width = ques_text.value.length + "5px";
		question.appendChild(ques_text);


		// Setup for the fisrt answer 
		var ans = newRow1.insertCell(2);
		var ans1 = document.createElement("input");
		ans1.setAttribute("value", questionList[index].ans[0].a_text);
		ans1.setAttribute("id", questionList[index].ans[0].a_id);
		ans1.style.border = "none";
		ans1.style.width = ans1.value.length + "2px";
		ans.appendChild(ans1);	

		var correct = newRow1.insertCell(3);
		correct.style.textAlign = "center"; 
		/* create a radio button */
		var correctButton = document.createElement("input");
		correctButton.setAttribute("type", "radio");
		correctButton.setAttribute("name", "ans" + questionList[index].q_id);
		correctButton.setAttribute("value", "1");
		if (correctAns == 0) {
			correctButton.setAttribute("checked", "checked");
		}
		correct.appendChild(correctButton);	


		// Setup for the second answer 
		var newRow2 = table.insertRow(-1);
		var ans = newRow2.insertCell(0);
		var ans2 = document.createElement("input");
		ans2.setAttribute("value", questionList[index].ans[1].a_text);
		ans2.setAttribute("id", questionList[index].ans[1].a_id);
		ans2.style.border = "none";
		ans2.style.width = ans2.value.length + "2px";
		ans.appendChild(ans2);

		var correct = newRow2.insertCell(1);
		correct.style.textAlign = "center"; 
		/* create a radio button */
		var correctButton = document.createElement("input");
		correctButton.setAttribute("type", "radio");
		correctButton.setAttribute("name", "ans" + questionList[index].q_id);
		correctButton.setAttribute("value", "2");
		if (correctAns == 1) {
			correctButton.setAttribute("checked", "checked");
		}
		correct.appendChild(correctButton);	


		// Setup for the third answer 
		var newRow3 = table.insertRow(-1);
		var ans = newRow3.insertCell(0);
		var ans3 = document.createElement("input");
		ans3.setAttribute("value", questionList[index].ans[2].a_text);
		ans3.setAttribute("id", questionList[index].ans[2].a_id);
		ans3.style.border = "none";
		ans3.style.width = ans3.value.length + "2px";
		ans.appendChild(ans3);

		var correct = newRow3.insertCell(1);
		correct.style.textAlign = "center"; 
		/* create a radio button */
		var correctButton = document.createElement("input");
		correctButton.setAttribute("type", "radio");
		correctButton.setAttribute("name", "ans" + questionList[index].q_id);
		correctButton.setAttribute("value", "3");
		if (correctAns == 2) {
			correctButton.setAttribute("checked", "checked");
		}
		correct.appendChild(correctButton);	
	}
	document.getElementById("questionForm").style.display = "block";
}

//*******************************************************************************************//
function getCategory() {
	var ajax = new XMLHttpRequest();
	var method = "POST";
	var url = "controllers/manage_exam_controller.php?function=getCategory";
	var asynchronous = true;

	ajax.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var data = this.responseText;
			var cateList = JSON.parse(data);
			// console.log(result);
			addCategory(cateList);
		}
	}
	ajax.open(method, url, asynchronous);
	ajax.send();
}

//*******************************************************************************************//
function getQuestionList() {
	var cate = document.getElementById("category").options[document.getElementById("category").selectedIndex].id;
	var lvl = document.getElementById("level").value;

	var dataStr = '&category=' + cate + '&level=' + lvl; 

	var ajax = new XMLHttpRequest();
	var method = "POST";
	var url = "controllers/manage_exam_controller.php?function=listQuestion";
	var asynchronous = true;

	ajax.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var data = this.responseText;
			// console.log(data);
			questionList = JSON.parse(data);
			showQuestionList(questionList);
		}
	}
	ajax.open(method, url + dataStr, asynchronous);
	ajax.send();
}

//*******************************************************************************************//
function updateQuestion(questionId, newQuestion) {
	var dataStr = '&q_id=' + questionId + '&q_text=' + newQuestion; 

	var ajax = new XMLHttpRequest();
	var method = "POST";
	var url = "controllers/manage_exam_controller.php?function=updateQuestion";
	var asynchronous = true;

	ajax.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			console.log(result);
			// console.log(JSON.parse(this.responseText));
			// if (result == -1) {
			// 	document.getElementById("nothing").style.display = "block";
			// } else if (result) {
			// 	resetDelForm();
			// 	document.getElementById("success").style.display = "block";
			// } else {
			// 	resetDelForm();
			// 	document.getElementById("error").style.display = "block";
			// }
		}
	}
	ajax.open(method, url + dataStr, asynchronous);
	ajax.send();
}

//*******************************************************************************************//
function updateAnswer(answerId, newAnswer, option) {

}
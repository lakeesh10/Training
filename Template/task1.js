var rowids=0;
var inheritsFrom = function (child, parent) {
    child.prototype = Object.create(parent.prototype);
};
var Base = function(rowid,name, email, mobile){
	this.rowid=rowid;
	this.name=name;
	this.email=email;
	this.mobile=mobile;
	this.status="active";
}
Base.prototype.save= function(saveValue) {
	window.studs.push(saveValue);

}
Base.prototype.validate = function() {

	if (this.name == null || this.name == "") {
        alert("Name must be filled out");
        return false;
    }
    
	var mail = this.email;
    var atpos = mail.indexOf("@");
    var dotpos = mail.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=mail.length) {
        alert("Not a valid e-mail address");
        return false;
    }

    var number = this.mobile;
	var phoneno = /^\d{10}$/;  
  	if(!number.match(phoneno))    
        {  
        alert("Enter a valid Phone Number");  
        return false;  
        }  

  return true;
}

var Student = function(rowid,name, email, mobile, course){
	Base.call(this,rowid,name,email,mobile)
	this.course=course;
}
inheritsFrom(Student, Base);

Student.prototype.validate = function() {
    if(Base.prototype.validate.call(this)){
    	if (this.course == null || this.course == "") {
    	    alert("Course must be filled out");
    	    return false;
    	}
    	return true;
	}
    return false;
    
}

var Employee = function(rowid,name, email, mobile, salary){
	Base.call(this,rowid,name,email,mobile)
	this.salary=salary;
}
inheritsFrom(Employee, Base);

Employee.prototype.validate = function() {
    if(Base.prototype.validate.call(this)){
    	if (isNaN(this.salary) || this.salary =="" || this.salary== null) {
    	    alert("Salary must be filled out with Numbers");
    	    return false;
    	}
    	return true;
	}
    return false;
}
function searchRowid (rowid){
	var result = $.grep(window.studs, function(e){ return e.rowid == rowid; });
	return result[0];
}
function loadForm(){
	window.studs = [];
	window.student = [];
	window.employee = [];
		$('#studentDiv').show();
		


}
function mainFunc() {
	var selectBox = document.getElementById("selectBox");
	var selectedValue= selectBox.options[selectBox.selectedIndex].value;
	if (selectedValue.localeCompare("student")==0){

		$('#studentDiv').show();
		

		var studentScript = $("#sscript").html();
  		var studentTemplate = Handlebars.compile(studentScript);
  		var studentContext={
    	"course":"Course : <input type ='text' name='course'> <br>",
    	"stable": "<tr><td>Name</td><td>Email</td><td>Mobile</td><td>Course</td><td>Options</td></tr>"
  		};
  		var src=$("#stable1").html();
  		var template= Handlebars.compile(src)
  		var studentCompile = studentTemplate(studentContext);
	  	$('.studentDiv').html(studentCompile);
		$("#studentTable").append( template(window.student) );
		console.log(window.studs)
		document.getElementById("addbutton").onclick=function(){add("sform", "studentTable")};
	}
	else{
		$('#studentDiv').show();
		

		var employeeScript = $("#escript").html();
  		var employeeTemplate = Handlebars.compile(employeeScript);
  		var employeeContext={
    	"salary":"Salary : <input type ='text' name='salary'> <br>",
    	"etable": "<tr><td>Name</td><td>Email</td><td>Mobile</td><td>Salary</td><td>Options</td></tr>"
  		};
  		var src=$("#etable1").html();
  		var template= Handlebars.compile(src)
  		var employeeCompile = employeeTemplate(employeeContext);
	  	$('.studentDiv').html(employeeCompile);
		$("#employeeTable").append( template(window.employee) );
		console.log(window.studs)
		document.getElementById("addbutton").onclick=function(){add("eform", "employeeTable")};
	}
	var generalScript = $("#generalscript").html();
  	var generalTemplate = Handlebars.compile(generalScript);
  	var generalcontext={
    "form":[
  	  {lable : "Your Name : ",id : "name" },
  	  {lable : "Your Email :", id : "email"},
  	  {lable : "Your Mobile", id :"mobile"}]
  	  };
			
	  		var generalCompile = generalTemplate(generalcontext);
	  		$('.generalscript').html(generalCompile);
		
}
function removeS(e, tablename) {
	var i = e.parentNode.parentNode.rowIndex;
    $('#'+tablename).find('tr:eq('+i+')').remove();
    $("#updatebutton").hide();
    //var object = searchRowid(e.id);
    //object.status="inactive";

}
function updateS(e , formname, tablename) {
	var object = searchRowid(e.id);
	console.log(object);
	$('#'+formname).find('input')[0].value = object.name;
	$('#'+formname).find('input')[1].value = object.email;
	$('#'+formname).find('input')[2].value = object.mobile;
	if (tablename.localeCompare("studentTable")==0)
		$('#'+formname).find('input')[3].value = object.course;
	else
		$('#'+formname).find('input')[3].value = object.salary;
    
	$('#updatebutton').show();
	document.getElementById("updatebutton").onclick=function(){updateval(object,e, formname, tablename)};
	//document.getElementById("updatebutton1").onclick=function(){updateval(object,e, formname, tablename)};
}
function updateval(object,rowid, formname, tablename) {
	var e=rowid.parentNode.parentNode.rowIndex;
	var name=object.name;
	var email=object.email;
	var mobile=object.mobile
	if (tablename.localeCompare("studentTable")==0)
		var course=object.course;
	else
		var course=object.salary;

	object.name= $('#'+formname).find('input')[0].value;
	object.email= $('#'+formname).find('input')[1].value;
	object.mobile= $('#'+formname).find('input')[2].value;
	if (tablename.localeCompare("studentTable")==0)
		object.course= $('#'+formname).find('input')[3].value;
	else
		object.salary= $('#'+formname).find('input')[3].value;

	if(object.validate()){
		$('#'+tablename).find('tr:eq('+e+')').find('td:eq(0)').html(object.name);
		$('#'+tablename).find('tr:eq('+e+')').find('td:eq(1)').html(object.email);
		$('#'+tablename).find('tr:eq('+e+')').find('td:eq(2)').html(object.mobile);
		if (tablename.localeCompare("studentTable")==0)
			$('#'+tablename).find('tr:eq('+e+')').find('td:eq(3)').html(object.course);
		else
			$('#'+tablename).find('tr:eq('+e+')').find('td:eq(3)').html(object.salary);

		
	}
	else{
		object.name=name;
		object.email=email;
		object.mobile=mobile;
		if (tablename.localeCompare("studentTable")==0)
			object.course=course;
		else
			object.salary = course;
	}
	console.log(object);

}
function add(formname, tablename ) {
	var rowid=rowids;
	var name= $('#'+formname).find('input')[0].value;
	var email= $('#'+formname).find('input')[1].value;
	var mobile= $('#'+formname).find('input')[2].value;
	var course= $('#'+formname).find('input')[3].value;
	var stud;
	if (tablename.localeCompare("studentTable")==0){
		
		stud = new Student(rowid,name,email,mobile,course);
	}
	else{
		stud = new Employee(rowid,name,email,mobile,course)
	
	}
	
	
	if(stud.validate()){
		if (tablename.localeCompare("studentTable")==0)
			window.student.push(stud);
		else
			window.employee.push(stud);
		stud.save(stud);
		rowids=rowids + 1;
		var table = document.getElementById(tablename);
		var row = table.insertRow(-1);
		
	
		row.insertCell(0).innerHTML = name;
		row.insertCell(1).innerHTML = email;
		row.insertCell(2).innerHTML = mobile;
		row.insertCell(3).innerHTML = course;
		var cell5 = row.insertCell(4);
		var btn = document.createElement("BUTTON");        // Create a <button> element
		btn.innerHTML = 'Edit';
		btn.id=rowid;
  btn.onclick = function(){updateS(btn, formname, tablename)};                                // Append the text to <button>
		cell5.appendChild(btn); 
		var btn1 = document.createElement('button');
  btn1.innerHTML = 'Remove';
  btn1.onclick = function(){removeS(btn, tablename)};
  
		cell5.appendChild(btn1); 
	}

}


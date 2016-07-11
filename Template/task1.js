
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
	//addForm("sform", "studentTable", "studentDiv");
	//addForm("eform","employeeTable","employeeDiv");
		$('#studentDiv').show();
		$('#employeeDiv').hide();


}
function mainFunc() {
	var selectBox = document.getElementById("selectBox");
	var selectedValue= selectBox.options[selectBox.selectedIndex].value;
	if (selectedValue.localeCompare("student")==0){
		$('#studentDiv').show();
		$('#employeeDiv').hide();
		document.getElementById("addbutton").onclick=function(){updateval("sform", "studentTable")};
	}
	else{
		$('#studentDiv').hide();
		$('#employeeDiv').show();
		document.getElementById("addbutton").onclick=function(){updateval("eform", "employeeTable")};
	}
		
}
function removeS(e, tablename) {
	var i = e.parentNode.parentNode.rowIndex;
    $('#'+tablename).find('tr:eq('+i+')').remove();
    $("#updatebutton").hide();
    var object = searchRowid(e.id);
    object.status="inactive";

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
    
   /* $('#'+formname).find('input').each(function(index, val){
    	if (index <4)
    		val.value = $('#'+tablename).find(' tr:eq('+rowid+')').find(' td:eq('+index+')').html();
    	
    });
	*/
	
	$('#updatebutton').show();
	document.getElementById("updatebutton").onclick=function(){updateval(object,e, formname, tablename)};
	document.getElementById("updatebutton1").onclick=function(){updateval(object,e, formname, tablename)};
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
	if (tablename.localeCompare("studentTable")==0)
		stud = new Student(rowid,name,email,mobile,course);
	else
		stud = new Employee(rowid,name,email,mobile,course)
	
	
	if(stud.validate()){
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

function addForm(formname, tablename, divname){
	var f = document.createElement("form");
	f.id=formname;
	f.setAttribute('method',"post");
	if (tablename.localeCompare("studentTable")==0)
		details=[["Your Name : ","student_name"],["Your Email : ","student_email"],["Your Mobile : ","student_mobile"],["Course : ","student_course"]];
	else
		details=[["Your Name : ","employee_name"],["Your Email : ","employee_email"],["Your Mobile : ","employee_mobile"],["Salary : ","employee_salary"]];
	
	details.forEach(function(item){
		var namelabel = document.createElement('label'); // Create Label for Name Field
		namelabel.innerHTML = item[0]; // Set Field Labels
		f.appendChild(namelabel);
		var nameElement = document.createElement("input");
		nameElement.type = "text";
		nameElement.name = item[1];
		nameElement.id = item[1];
		f.appendChild(nameElement);

		var linebreak = document.createElement('br');
		f.appendChild(linebreak);
		var linebreak = document.createElement('br');
		f.appendChild(linebreak);
	})

	var linebreak = document.createElement('br');
	f.appendChild(linebreak);
	var linebreak = document.createElement('br');
	f.appendChild(linebreak);

	var s = document.createElement("input");
	s.type="button"
	s.value = "Add";
	s.id="addbtn"
	s.onclick = function(){add(formname,tablename)};

	f.appendChild(s);

	var s1 = document.createElement("input");
	s1.type="button"
	s1.value = "Update";
	s1.id="updatebutton"
	

	f.appendChild(s1)
	var tab= document.createElement("table");
	tab.id = tablename;
	tab.style.width  = '100%';
	tab.setAttribute('border', '1');
	if (tablename.localeCompare("studentTable")==0)
		var heading = ["Name","Email","Mobile","Course","Options"];
	else
		var heading = ["Name","Email","Mobile","Salary","Options"];
	var tr = tab.insertRow();

	for (var j = 0; j < 5; j++) {
		var td = tr.insertCell();
        td.appendChild(document.createTextNode(heading[j]));
    }
    
	document.getElementById(divname).innerHTML="";
	document.getElementById(divname).appendChild(f);
	document.getElementById(divname).appendChild(tab);
	$('#updatebutton').hide();

}


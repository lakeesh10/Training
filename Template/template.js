$(function () {
  var studentScript = $("#sscript").html();
  var studentTemplate = Handlebars.compile(studentScript);
  var studentContext={
    "course":"Course : <input type ='text' name='course'> <br>",
    "stable": "<table id='studentTable'><tr><td>Name</td><td>Email</td><td>Mobile</td><td>Course</td><td>Options</td></tr></table>"
  };
  var studentCompile = studentTemplate(studentContext);
  $('.studentDiv').html(studentCompile);

  

  var employeeScript = $("#escript").html();
  var employeeTemplate = Handlebars.compile(employeeScript);
  var employeeContext={
    "salary":"Salary : <input type ='text' name='salary'> <br>",
     "etable": "<table id='employeeTable'><tr><td>Name</td><td>Email</td><td>Mobile</td><td>Salary</td><td>Options</td></tr></table>"
  };
  var employeeCompile = employeeTemplate(employeeContext);
  $('.employeeDiv').html(employeeCompile);
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


});
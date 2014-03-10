$(document).ready(function(){
var $CategorySelected=$("#Ctgry").val();
var $input;
var $Other;
var $reset=$("input[type='reset']");

/*if $CategorySelected contains a value called Other (selected from the user), a textbox will appear and allows
 * user to type in a specified category to be added in the selection box and disables "Enter Item" box
 * Otherwise, the box will stay hidden or when user selects a different category other than "Other"
 */
function SelectedOther(){
	if ($CategorySelected=="Other"){
		$("label[for='Other'], #Other").show('fast');
		$("#Item").attr('disabled','disabled');
		$("#Item:text").val("This field is disabled");
	}else{
		$("label[for='Other'], #Other").hide();
		$("#Item").removeAttr('disabled');
		$("#Item:text").val("");
	}
}
//Validates if the Enter Category text box is displayed and validates if it is empty and displays an error message
function OtherValidate(){
	if ($("#Other").css("display")=="block" || $("#Other").css("display")=="inline" || $("#Other").css("display")=="inline-block"){
		if($("#Other").val()=="" || $("#Other").val()==undefined){
		$(".ErrMsg").text("*Please Enter a Category*");
	}
}
}
//This function stores item that is entered by the user as determined by the category selected by the user
//Preselected items in the list will dynamically create and append lists depending on the category it was selected 
//If the user selects the "Other" option, it will call the AddNewCategory method *See Function Below*
//*Note*, I should have stored the repetitive statements in a function and call them but I got lazy and didnt do it
function ItemStored(){
		switch ($CategorySelected){
		case "Dairy":
			 $(".Dairy").find(".CtgryLst").append("<li><span class='Checked'></span>"+$input+"<span class='Remove'></span></li>");
			 $(".Dairy").slideDown("slow");
			 $(".ErrMsg").text("Awesome, Your item is succesfully listed.");
			break;
		case "Canned Foods":
			 $(".CannedFoods").find(".CtgryLst").append("<li><span class='Checked'></span>"+$input+"<span class='Remove'></span></li>");
			 $(".CannedFoods").slideDown("slow");
			 $(".ErrMsg").text("Awesome, Your item is succesfully listed.");
			 break;
		case "Fruits and Vegetables":
			 $(".FruitsVeg").find(".CtgryLst").append("<li><span class='Checked'></span>"+$input+"<span class='Remove'></span></li>");
			 $(".FruitsVeg").slideDown("slow");
			 $(".ErrMsg").text("Awesome, Your item is succesfully listed.");
			 break;
		case "Beverages":
			 $(".Beverages").find(".CtgryLst").append("<li><span class='Checked'></span>"+$input+"<span class='Remove'></span></li>");
			 $(".Beverages").slideDown("slow");
			 $(".ErrMsg").text("Awesome, Your item is succesfully listed.");
			 break;
		case "Frozen Food":
			 $(".FrozenFood").find(".CtgryLst").append("<li><span class='Checked'></span>"+$input+"<span class='Remove'></span></li>");
			 $(".FrozenFood").slideDown("slow");
			 $(".ErrMsg").text("Awesome, Your item is succesfully listed.");
			 break;
		case "Meat":
			 $(".Meat").find(".CtgryLst").append("<li><span class='Checked'></span>"+$input+"<span class='Remove'></span></li>");
			 $(".Meat").slideDown("slow");
			 $(".ErrMsg").text("Awesome, Your item is succesfully listed.");
			 break;
		case "Other": 
			AddNewCategory(); 
			break;
		case $CategorySelected:
			 $("."+$CategorySelected.replace(/\s+/g,'')).find(".CtgryLst").append("<li><span class='Checked'></span>"+$input+"<span class='Remove'></span></li>");
			 $("."+$CategorySelected.replace(/\s+/g,'')).slideDown("slow");
			 $(".ErrMsg").text("Awesome, Your item is succesfully listed.");
			break;
	
	}
}

/*This function determines if the $Other variable value is already added in the list, if it already contains in the list
 * it will display a message
 * Otherwise it will append that new category to the selection list and create an itemwrapper div, h3, and ul elements 
 * Adds the class to the ItemWrapper div
 * Next (just in case), determines if the category input box is not empty so it can display a message letting user know that
 * their specified category is listed
 */
 
function AddNewCategory() {
	if($("."+$Other).hasClass($Other)){
		$(".ErrMsg").text("*No need to retype, Your category is already listed*");
	}else{
		$("#Ctgry").append("<option>"+$Other+"</option>");
	$(".LstItm").prepend("<div class='ItmWrpr Hidden'><h3 class='CtgryNm' style='background:gray;'><span class='ItmWrprRemove'></span>"+$Other+"</h3><ul class='CtgryLst'>");
	if($("#Other").val()!="" || $("#Other").val()!=undefined){
		$(".ItmWrpr").first().addClass($Other.replace(/\s+/g,''));
		$(".ErrMsg").text("*Nice, Your category is now listed*");
	}
	$("option").last().css("color","green");
}
}

//When the user chooses a category from the selected option, the value will then be stored in a variable called $CategorySelected
$("#Ctgry").on('change',function(){
	$CategorySelected=$(this).val();
//After the value is stored in the variable, SelectedOther() method is called *See Function Above*
	SelectedOther();

	
});

//When user enters an item in the text box, it will retrieve the value and store it in a variable called $input
$("#Item").on('change',function(){
	$input=$(this).val();
});

/*Only when user selects the "Other" option from the list, the input box will appear.
 * When user enters a value in it, it will be retrieved and stored in a variable called $Other
 */
$('#Other').on('change',function(){
	$Other=$(this).val();
});

// This button will be the main function of the entire application
$("#Add").on('click',function(){
/*When user clicks on the Add button, it will check whether the selection list and the input item text box is entered
 * if both are empty, it will display an error message prompting the user to fill in specified fields
 * Otherwise it will call the OtherValidate and ItemStored methods *See Function Above*
 */
	if($("#Item").val()=="" || $("#Item").val()==undefined || $CategorySelected=="Select One"){
		$(".ErrMsg").text("*Uh oh, That's not good, did you forget to select a category and enter an item?*");
	}else{
		OtherValidate();
		ItemStored();
	}
	
});

//when clicked, all lists will be cleared and the category lists are retained so user does not have to retype it
$reset.on('click',function(){
	$(".CtgryLst li").remove();
	$(".ItmWrpr").slideUp("slow");
	$(".ErrMsg").text("*Success!, Your lists has been cleared and your categories are retained*");
	
});
//allows user to hide the category, type a new item to display it again
$(".LstItm").on("click",".ItmWrprRemove",function(){
	$(this).closest(".ItmWrpr").slideUp("slow");
});
//allows user to remove an item list if necessary
$(".LstItm").on("click",".Remove",function(){
	$(this).first().parent().remove();
});
//allows user to check off an item
$(".LstItm").on("click",".Checked",function(){
	$(this).first().parent().toggleClass("Highlighted");
});


});
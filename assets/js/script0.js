/**
 * Author: Abdoulie Kassama
 *
 * @abdouliekassama
 *
 * https://akassama.com/
 *
 * Github: https://github.com/akassama/
 *
*/
$( document ).ready(function() {

  /**
  * The codes re-generates the password based on the current settings
  * When clicked, takes the current parameters, i.e.length, letters, symbols etc. and generates the password
  * The arrows symbol is replace in the DOM with a spinning symbol for 0.6 seconds
  */
  $('#btn-regenerate').click(function(){
    //replace fa-arrows icons with spinning fa-sync
    $("#regenerate-icon").attr('class', 'fas fa-sync fa-spin');

    var current_pass = $("#pass-value").val();

    setTimeout(function (){
        //generate new password
        passwordGenerator();

        //restore to fa-arrows after 0.6 sec
        $("#regenerate-icon").attr('class', 'fa-solid fa-arrows-rotate');
      }, 600);
  });


  /**
  * The codes shuffles the password
  * When clicked, it uses the same password text and re-shuffles it
  * The shuffle symbol is replace in the DOM with a spinning symbol for 0.6 seconds
  */
  $('#btn-shuffle').click(function(){
    //replace fa-shuffle icons with spinning fa-shuffle
    $("#shuffle-icon").attr('class', 'fa-solid fa-shuffle fa-spin');

    var current_pass = $("#pass-value").val();

    setTimeout(function (){
        $("#pass-value").val(shuffler(current_pass));

        //restore to fa-shuffle after 0.6 sec
        $("#shuffle-icon").attr('class', 'fa-solid fa-shuffle');
      }, 600);
  });


  /**
  * The codes changes the value of the range input (length) on change
  * It then runs the fuction to generate new password with the current settings
  */
  $("#pass-range").change(function(){
    var new_val = $(this).val();
    $("#pass-length").text(new_val);

    //generate password
    passwordGenerator();
  });
   // $('#pass-range').on("change mousemove", function() {
   //     var new_val = $(this).val();
   //     $("#pass-length").text(new_val);
   //
   //     //generate password
   //     passwordGenerator();
   //  });


  /**
  * Function that shuffles string
  * @param    {String} text    String passed to the function
  * @return   {String}         Shuffled string
  */
  function shuffler(text) {
    var a = text.split(""),
        n = a.length;
        for(var i = n - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
        }
        return a.join("");
  }


  /**
  * The codes looks of check and un-check actions for the letters checkbox
  * When checked, letters are included in the generated password
  * When un-checked, letters are not included in the generated password
  * Cannot be un-checked if numbers and symbols are also uncheked
  */
  $('#letters').click(function(){
      if($(this).prop("checked") == true){
        alert("Letters");
      }
      else if($(this).prop("checked") == false){
        alert("No Letters");
      }
    });


  /**
  * The codes looks of check and un-check actions for the numbers checkbox
  * When checked, numbers are included in the generated password
  * When un-checked, numbers are not included in the generated password
  * Cannot be un-checked if letters and symbols are also uncheked
  */
  $('#numbers').click(function(){
    if($(this).prop("checked") == true){
      alert("Numbers");
    }
    else if($(this).prop("checked") == false){
      alert("No Numbers");
    }
  });


  /**
  * The codes looks of check and un-check actions for the symbols checkbox
  * When checked, symbols are included in the generated password
  * When un-checked, symbols are not included in the generated password
  * Cannot be un-checked if letters and numbers are also uncheked
  */
  $('#symbols').click(function(){
    if($(this).prop("checked") == true){
      alert("Symbols");
    }
    else if($(this).prop("checked") == false){
      alert("No Symbols");
    }
  });


  /**
  * Function that generates the password
  * Looks at the current parameters, i.e.length, letters, symbols etc. and generates the password
  * Sets pass-value input with the generated password
  */
  function passwordGenerator() {
    //get password parameters
    var pass_length = parseInt($("#pass-range").val());
    var has_letters = $('#letters').is(":checked");
    var has_numbers = $('#numbers').is(":checked");
    var has_symbols = $('#symbols').is(":checked");

    var random_str = ""; //set default random string as empty

    //parameters set inputs
    var letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var numbers = "0123456789";
    var symbols = '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';

    //append letters to random_str list if checked
    if(has_letters){
      random_str += letters;
    }

    //append numbers to random_str list if checked
    if(has_numbers){
      random_str += numbers;
    }

    //append symbols to random_str list if checked
    if(has_symbols){
      random_str += symbols;
    }

    var result = '';
    for (var i = pass_length; i > 0; --i){
      result += random_str[Math.floor(Math.random() * random_str.length)];
    }

    $('#pass-value').val(result);
  }


});

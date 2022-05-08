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
  * If document loads and pass-value is empty, generate password
  */
  if($("#pass-value").val() === ''){
    //generate new password
    passwordGenerator();

    //set emoji reaction
    setEmoji();
  }


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

    //set emoji reaction
    setEmoji();
  });



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
  * Cannot be un-checked if numbers, symbols, and complex characters are also uncheked
  */
  $('#letters').click(function(){
    //validate at-least one check
    validateChecks();
  });


  /**
  * The codes looks of check and un-check actions for the numbers checkbox
  * When checked, numbers are included in the generated password
  * When un-checked, numbers are not included in the generated password
  * Cannot be un-checked if letters, symbols, and complex characters are also uncheked
  */
  $('#numbers').click(function(){
    //validate at-least one check
    validateChecks();
  });


  /**
  * The codes looks of check and un-check actions for the symbols checkbox
  * When checked, symbols are included in the generated password
  * When un-checked, symbols are not included in the generated password
  * Cannot be un-checked if letters, numbers, and complex characters are also uncheked
  */
  $('#symbols').click(function(){
    //validate at-least one check
    validateChecks();
  });


  /**
  * The codes looks of check and un-check actions for the complex characters checkbox
  * When checked, symbols are included in the generated password
  * When un-checked, symbols are not included in the generated password
  * Cannot be un-checked if letters, numbers, and symbols are also uncheked
  */
  $('#complex').click(function(){
    //validate at-least one check
    validateChecks();
  });


  /**
  * Function that shuffles string
  * @param    {String} text    String passed to the function
  */
  function validateChecks() {
    //get current parameter check status
    var has_letters = $('#letters').is(":checked");
    var has_numbers = $('#numbers').is(":checked");
    var has_symbols = $('#symbols').is(":checked");
    var has_complex = $('#complex').is(":checked");

    //get number of checked parameters
    var total_checked = $('input.param-check:checked').length;
    if(total_checked == 1){
      //if last checked is letters, numbers, symbols, or complex characters then disable
      if(has_letters){
        $("#letters").attr("disabled", true);
      }
      else if(has_numbers){
        $("#numbers").attr("disabled", true);
      }
      else if(has_symbols){
        $("#symbols").attr("disabled", true);
      }
      else if(has_complex){
        $("#complex").attr("disabled", true);
      }
    }
    else{
      //re-enable all
      $("#letters").attr("disabled", false);
      $("#numbers").attr("disabled", false);
      $("#symbols").attr("disabled", false);
      $("#complex").attr("disabled", false);
    }
  }


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
    var has_complex = $('#complex').is(":checked");

    // if no checkbox is selected, then exit the function
    if(!has_letters && !has_numbers && !has_symbols && !has_complex){
      alert("Oops! You need to check at least one of Letters, Numbers, Symbols or Complex characters");
      return;
    }

    var random_str = ""; //set default random string as empty

    //parameters set inputs
    var letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var numbers = "0123456789";
    var symbols = '!@#$%^&*_+-=<>?|';
    var complex = '~`(){}[]:";\',./\\';

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

    //append complex characters to random_str list if checked
    if(has_complex){
      random_str += complex;
    }

    var result = '';
    for (var i = pass_length; i > 0; --i){
      result += random_str[Math.floor(Math.random() * random_str.length)];
    }

    $('#pass-value').val(result);
  }


  /**
  * Function set password strength emoji and text
  * Sets the strength emoji based on length of password
  */
  function setEmoji() {
    var weird_emoji_src = "./assets/images/reactions/no-clue.png";
    var crying_emoji_src = "./assets/images/reactions/crying.png";
    var wow_emoji_src = "./assets/images/reactions/wow.png";
    var neutral_emoji_src = "./assets/images/reactions/neutral.png";
    var happy_emoji_src = "./assets/images/reactions/happy.png";
    var like_emoji_src = "./assets/images/reactions/like.png";

    //get password length
    var pass_length = parseInt($("#pass-range").val());

    //re-set background color class
    //$("#container-div").attr('class', 'container bg-light rounded p-4 mt-3'); //uncomment to change background

    if(pass_length <= 4){
      $("#emoji-reaction").attr("src", wow_emoji_src);
      //$("#emoji-text").html("<span class='text-danger'>Poor</span>");
      //$('#container-div').addClass(' poor-bg').removeClass(' bg-light'); //uncomment to change background
    }
    else if(pass_length > 4 && pass_length <= 8){
      $("#emoji-reaction").attr("src", neutral_emoji_src);
      //$("#emoji-text").html("<span class='text-warning'>Weak</span>");
      //$('#container-div').addClass(' weak-bg').removeClass(' bg-light'); //uncomment to change background
    }
    else if(pass_length > 8 && pass_length <= 16){
      $("#emoji-reaction").attr("src", happy_emoji_src);
      //$("#emoji-text").html("<span class='text-primary'>Good</span>");
      //$('#container-div').addClass(' good-bg').removeClass(' bg-light'); //uncomment to change background
    }
    else if(pass_length > 16){
      $("#emoji-reaction").attr("src", like_emoji_src);
      //$("#emoji-text").html("<span class='text-success'>Strong</span>");
      //$('#container-div').addClass(' strong-bg').removeClass(' bg-light'); //uncomment to change background
    }

    //get current parameter check status
    var has_letters = $('#letters').is(":checked");
    var has_numbers = $('#numbers').is(":checked");
    var has_symbols = $('#symbols').is(":checked");
    var has_complex = $('#complex').is(":checked");
    //weird emoji
    if((!has_letters && !has_numbers && !has_symbols) && has_complex && pass_length > 8){
      $("#emoji-reaction").attr("src", weird_emoji_src);
      //$("#emoji-text").html("<span class='text-danger'>Hmm!</span>");
      //$('#container-div').addClass(' poor-bg').removeClass(' bg-light'); //uncomment to change background
    }
  }

});

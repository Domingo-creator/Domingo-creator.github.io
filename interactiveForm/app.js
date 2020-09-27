document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector("form");
    let totalDue = 0;
    let size = 'default';
    let design = 'default';
    let color = 'default';


    //OUT OF STOCK Variables: 
    const outOfStock = {
        smallIHeartJs: ['blue'],
        smallJsParts: ['red'], 
        mediumIHeartJs: ['blue', 'red'],
        mediumJsParts: ['yellow', 'purple'],
        largeIHeartJs: ['yellow'],
        largeJsParts: ['blue','red','yellow','purple','green']
    }
    
    //*********SHIRT INFO FUNCTIONALITY *****************************************/
    /****************************************************************************/
    //Grey out shirt options not available to current choices
    
    //**Shirt Size Listener***
    $('#size').on('change', function() {
        size = this.value;
        if(size === 'default') {
            $('#design').attr('disabled','disabled');
            $('#color').attr('disabled','disabled');
        }
        else {
            $('#design').removeAttr('disabled')
        }
        updateGreyedOptions(); 
        checkValidSelection();
    });

    //**Shirt Design Listener***
    $('#design').on('change', function() {
        design = this.value;
        if(size === 'default') {
            $('#color').Attr('disabled','disabled');
        }
        else {
             $('#color').removeAttr('disabled')
        }
        updateGreyedOptions();
        checkValidSelection();   
    });

    //**Shirt Color Listener***
    $('#color').on('change', function() {
        color = this.value;
        updateGreyedOptions();
        checkValidSelection();
    });
  

    //Grey out options that unavailable based on current choices
    function updateGreyedOptions() {
        //clear current greyed options and
        $('#tshirt-info').find('.unavailable').removeClass('unavailable');
        $('.selection-unavailable').remove();
    
        //grey out options based on current values of size, design, and color
        switch(size)  {
            case 'small':
                if(outOfStock.smallIHeartJs.length === 5) {
                    $('#design option[value="i-heart-js"]').addClass('unavailable'); 
                   
                    
                } 
                if(outOfStock.smallJsParts.length === 5) {
                    $('#design option[value="js-parts"]').addClass('unavailable');
                }
                break;
            case 'medium':
                if(outOfStock.mediumIHeartJs.length === 5) {
                    $('#design option[value="i-heart-js"]').addClass('unavailable');
                }
                if(outOfStock.mediumJsParts.length === 5) {
                    $('#design option[value="js-parts"]').addClass('unavailable');
                }
                break;
            case 'large':
                if(outOfStock.largeIHeartJs.length === 5) {
                    $('#design option[value="i-heart-js"]').addClass('unavailable');
                }
                if(outOfStock.largeJsParts.length === 5) {
                    $('#design option[value="js-parts"]').addClass('unavailable');
                }
                break;
            default:   
           }
        switch(design) {
            case 'i-heart-js':
                switch(size) {
                    case 'small':
                        for(let i =0; i < outOfStock.smallIHeartJs.length; i++) {
                            $('#color option[value="' + outOfStock.smallIHeartJs[i] + '"]').addClass('unavailable');
                        }
                        break;
                    case 'medium':
                        for(let i =0; i < outOfStock.mediumIHeartJs.length; i++) {
                            $('#color option[value="' + outOfStock.mediumIHeartJs[i] + '"]').addClass('unavailable');
                        }
                        break;
                    case 'large':
                        for(let i =0; i < outOfStock.largeIHeartJs.length; i++) {
                            $('#color option[value="' + outOfStock.largeIHeartJs[i] + '"]').addClass('unavailable');
                        }
                        break;
                }
                break;
            case 'js-parts':
                switch(size) {
                    case 'small':
                        for(let i =0; i < outOfStock.smallJsParts.length; i++) {
                            $('#color option[value="' + outOfStock.smallJsParts[i] + '"]').addClass('unavailable');
                        }
                        break;
                    case 'medium':
                        for(let i =0; i < outOfStock.mediumJsParts.length; i++) {
                            $('#color option[value="' + outOfStock.mediumJsParts[i] + '"]').addClass('unavailable');
                        }
                        break;
                    case 'large':
                        for(let i =0; i < outOfStock.largeJsParts.length; i++) {
                            $('#color option[value="' + outOfStock.largeJsParts[i] + '"]').addClass('unavailable');
                        }
                        break;
                }
                break;
        }
    }

      
    //if selected color is unavailable, add the text "NOT AVAILABLE IN SIZE" after the selection box
    function checkValidSelection() {
        if ($('#design option:selected').hasClass('unavailable')) {
            $('<span class="selection-unavailable">***DESIGN NOT AVAILABLE IN THIS SIZE***</span>').insertAfter('#design');
        }
        if ($('#color option:selected').hasClass('unavailable')) {
            $('<span class="selection-unavailable">***COLOR NOT AVAILABLE IN THIS SIZE/DESIGN***</span>').insertAfter('#color');
        }
    }

    /******************  REGISTER FOR ACTIVITIES ********************************/
    /****************************************************************************/
    // grey out any options that time conflict with currently selected options  
    //determine total cost of selections

        //***CHECKBOX LISTENERS */
    $('#main-conference').on('click',function() {   
        if(this.checked) {
            totalDue += 200;
        } else {
            totalDue -= 200;
        }
        $('#totalDue').empty().append(totalDue);
    });

    $('#js-frameworks-workshop').on('click',function() {
        if($('#js-frameworks-workshop').prop('disabled')) {
            //do nothing
        }
        else if(this.checked) {
            $('#express-workshop').attr('disabled', 'disabled').attr('onclick', 'return false');
            $('#express-workshop').next().addClass('disabled');
            totalDue += 100;
        } else {
            $('#express-workshop').removeAttr('disabled', 'disabled').removeAttr('onclick', 'return false');
            $('#express-workshop').next().removeClass('disabled');
            totalDue -= 100;
        }
        $('#totalDue').empty().append(totalDue);
    });

    $('#js-libraries-workshop').on('click',function() {
        if($('#js-libraries-workshop').prop('disabled')) {
            //do nothing
        }
        else if(this.checked) {
            $('#node-js-workshop').attr('disabled', 'disabled').attr('onclick', 'return false');
            $('#node-js-workshop').next().addClass('disabled');
            totalDue += 100;
        } else {
            $('#node-js-workshop').removeAttr('disabled', 'disabled').removeAttr('onclick', 'return false');
            $('#node-js-workshop').next().removeClass('disabled');
            totalDue -= 100;
        }
        $('#totalDue').empty().append(totalDue);
    });

    $('#express-workshop').on('click',function() {
        if($('#express-workshop').prop('disabled')) {
            //do nothing
        }
        else if(this.checked) {
            $('#js-frameworks-workshop').attr('disabled', 'disabled').attr('onclick', 'return false');
            $('#js-frameworks-workshop').next().addClass('disabled');
            totalDue += 100;
        } else {
            $('#js-frameworks-workshop').removeAttr('disabled', 'disabled').removeAttr('onclick', 'return false');
            $('#js-frameworks-workshop').next().removeClass('disabled');
            totalDue -= 100;
        }
        $('#totalDue').empty().append(totalDue);
    });

    $('#node-js-workshop').on('click',function() {
        if($('#node-js-workshop').prop('disabled')) {
            //do nothing
        }
        else if(this.checked) {
            $('#js-libraries-workshop').attr('disabled', 'disabled').attr('onclick', 'return false');
            $('#js-libraries-workshop').next().addClass('disabled');
            totalDue += 100;
        } else {
            $('#js-libraries-workshop').removeAttr('disabled', 'disabled').removeAttr('onclick', 'return false');
            $('#js-libraries-workshop').next().removeClass('disabled');
            totalDue -= 100;
        }
        $('#totalDue').empty().append(totalDue);    
    });

    $('#build-tools-workshop').on('click',function() {
        if(this.checked) {
            totalDue += 100;
        } else {
            totalDue -= 100;
        }
        $('#totalDue').empty().append(totalDue);
    });

    $('#npm-workshop').on('click',function() {
        if(this.checked) {
            totalDue += 100;
        } else {
            totalDue -= 100;
        }
        $('#totalDue').empty().append(totalDue); 
        
    });

    //**********************PAYMENT FUNCTIONALITY *******************************/
    /****************************************************************************/
    //Determine payment type.  Change information fields based on choice

    //***PAYMENT TYPE LISTENER**/
     $('#payment-type').on('change', function() {
        switch(this.value) {
            case 'default':
                $('#payment-field').css('display', 'none');
                break;
            case 'cash':
                $('#payment-field').css('display', 'none');
                break;
            case 'credit':
                $('#payment-field').css('display', 'contents');
                break;   
            default:
                break;
        }        
    });
    
    
    //***********************CHECK FOR VALID INPUTS *****************************/
    /****************************************************************************/
    $('#submit').on('click', function(e) {
        e.preventDefault();
        //remove all instances of 'invalid-input' class
        $('form').find('.invalid-input').removeClass('invalid-input');
        
        if(hasValidInputs()) {
            alert('Registration is complete!  See you there');
        } else {
            alert('Registration failed.  Please correct highlighted fields');
        }
    });

    //if any checks fail, mark the field as invalid input 
    function hasValidInputs () {
        console.log('in hasValidInputs');
        //Make sure name has only letters
        if(!/^[a-z\s]+$/i.test($('#name:input').val()) /* contains any non letters))*/ ) {
            $('#name').prev().prev().addClass('invalid-input');
        }

        //make sure email has valid @ and .
        if(!/^[^@]+@[^@.]+\.[a-z]+$/i.test($('#email:input').val())){
            $('#email').prev().prev().addClass('invalid-input');
        }
        //check for valid shirt selection
        if(size === 'default') {
            $('#size').prev().prev().addClass('invalid-input');
        }
        if(design === 'default' || $('#design option:selected').hasClass('unavailable')) {
            $('#design').prev().prev().addClass('invalid-input');
        }
        if(color === 'default'|| $('#color option:selected').hasClass('unavailable')) {
            $('#color').prev().prev().addClass('invalid-input');
        }

        //check that at least one activity is selected
        if(totalDue === 0) {
            $('#register-for-activities p').addClass('invalid-input');
        }

        //check that payment option is selected
        if($('#payment-type option:selected').val() === 'default') {
            $('#payment-type').prev().prev().addClass('invalid-input');
        }
        //if credit is selected, check for valid inputs
        if ($('#payment-type option:selected').val() === 'credit' ) {
            //make sure credit card is between 11 and 13 numbers?
            if (!/^\d{11,13}$/.test($('#card-number:input').val())) {
                $('#card-number').prev().prev().addClass('invalid-input');
            }
            //make sure zip code is 5 digits
            if (!/^\d{5}$/.test($('#zip-code:input').val())) {
                $('#zip-code').prev().prev().addClass('invalid-input');
            }
            //make sure CCV is 3 digits?
            if (!/^\d{3}$/.test($('#ccv:input').val())) {
                $('#ccv').prev().prev().addClass('invalid-input');
            }

            if ($('#expiration-date option:selected').val() === 'default') {
                $('#expiration-date').prev().prev().addClass('invalid-input');    
            }
            if (!/^20[2-3][0-9]$/i.test($('#expiration-year:input').val())) {
                $('#expiration-year').prev().prev().addClass('invalid-input');    
            }
        }
        //if no invalid-inputs exist, return true.  else return false
        console.log("document.querySelector('invalid-inpue') = " + document.querySelector('.invalid-input'));
        if( document.querySelector('.invalid-input') === null) {
            return true;
        } else {
            return false;
        }

        
    }
    
    
});
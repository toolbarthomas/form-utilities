(function (win, doc, $) {

    // Private variables
    var FORM_UTILITIES = {};

    window.setFormUtilities = function(options) {

        var default_options = {
            'submitClass': 'js__form-utilities--submit-in-progress',
            'disableButtons': true
        };

        // Check if the options parameter matches the type OBJECT
        if(typeof options != 'object') {
            options = {};
        }

        // Prepare the options object by adding any missing keys from default_options.
        options = prepareOptions(options, default_options);

        // No options have been defined
        if(options.length === 0) {
            console.log('No options have been defined. Script can\t continue.');
            return;
        }

        // Query all form selectors
        var $forms = $('form');

        // Return if we have no form selectors defined.
        if($forms.length === 0) {
            return;
        }

        // Append forms to FORM_UTILITIES
        FORM_UTILITIES['forms'] = $forms;

        // Append our options to FORM_UTILITIES
        FORM_UTILITIES['options'] = options;


        // Iterate between all form selectors
        $forms.each(function() {

            var $form = $(this);

            disableDoubleSubmit($form);

        });
    }

    // Prepare options object by adding any missing keys from default_options.
    // Return options as Object
    function prepareOptions(options, default_options) {

        // Duplicate default_options so we override it
        // without removing orignal values
        var prepared_options = default_options;

        for (var key in default_options) {

            // Set the default value for our current key
            var value = default_options[key];

            // Check if custom options has a corresponding value located within default_options
            if (options.hasOwnProperty(key)) {

                // Check if our key value is defined
                if(options[key] != null) {
                    value = options[key];
                }
            }

            // Push final key/value to prepared_options
            prepared_options[key] = value;
        }

        console.log(prepared_options);

        // Ensure that we always return an object
        if(typeof prepared_options != 'object') {
            prepared_options = {};
        }

        return prepared_options;
    }

    // Helper function that prevents double submits on selected current form:
    // Fire's preventDefault() if the submit's more than one time.
    // Adds an extra class to the form element for styling purposes
    // Set each submit button on
    function disableDoubleSubmit($form) {

        $form.on({

            submit: function(event) {

                var $this = $(this);

                // Prevent double submit
                if($this.data('submitInProgress') != null) {
                    event.preventDefault();
                    console.log('Submit is already in progress!');
                    return;
                }

                // Set submitInProgress flag
                $this.data('submitInProgress', true);

                $this.addClass(FORM_UTILITIES.submitClass);
            }
        });

    }

})(window.jQuery(window), window.jQuery(document), window.jQuery);
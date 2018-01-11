/**
 * @function formUtilities
 * @description Javascript functions to improve overall form experience.
 *
 * @param {object} options Options object that can be customized.
 * @param {string} options.form Default selector for the form element
 * @param {string|boolean} options.submitFormClass // Adds a custom class to the form elements, no class will be added if the value is false.
 * @param {string} options.submitNotice Show console notice when first submit has been triggered.
 * @param {string} options.submitWarning Show console notice when second submit has been triggered.
 * @param {string} options.submitButtons Selector query for defining specific submit buttons.
 * @param {boolean} options.disableButtons Append disabled property to the submit buttons.
 * @param {string|boolean} options.disabledButtonClass // Adds a custom class to the submit elements, no class will be added if the value is false.
 * @param {boolean} options.stopImmediatePropagation Prevents other javascript from being executed
 * @param {boolean} options.debugMode Show submit status from the console..
 *
 */

(function (win, doc, $) {

    // Private variables
    var FORM_UTILITIES = {};

    window.formUtilities = function(options) {

        var default_options = {
            'form': 'form',
            'submitFormClass': 'js__form-utilities--submit-in-progress',
            'submitNotice': 'Submit initiated',
            'submitWarning': 'A second submit has been prevented, since another submit is already in progress for the selected form.',
            'submitButtons': ':submit',
            'disableButtons': true,
            'disabledButtonClass': 'js__form-utilities__submit--disabled',
            'stopImmediatePropagation': false,
            'debugMode': false
        };

        // Check if the options parameter matches the type OBJECT
        if(typeof options != 'object') {
            options = {};
        }

        // Prepare the options object by adding any missing keys from default_options.
        options = prepareOptions(options, default_options);

        // No options have been defined
        if(options.length === 0) {
            console.log('No options have been defined. Form Utilities can\'t be executed.');
            return;
        }

        // Append our options to FORM_UTILITIES
        FORM_UTILITIES['options'] = options;

        // Query all form selectors
        var $forms = $(FORM_UTILITIES.options.form);

        // Return if we have no form selectors defined.
        if ($forms.length === 0) {
            return;
        }

        // Iterate between all form selectors
        $forms.each(function() {

            var $form = $(this);

            $form.on({
                submit: function(event) {

                    // Prevent Submit if another submit within the current form is in progress.
                    if (submitInProgress($form)) {
                        event.preventDefault();
                    }

                    if (FORM_UTILITIES.options.stopImmediatePropagation === true) {
                        event.stopImmediatePropagation();
                    }

                    // Show current message
                    showSubmitStatus($form);

                    // Append submit class
                    setSubmitFormClass($form);

                    // Disable all submit buttons
                    disableSubmitButtons($form);

                    // Append the submitInProgress flag.
                    $form.data('submitInProgress', true);
                }
            });

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

        // Ensure that we always return an object
        if(typeof prepared_options != 'object') {
            prepared_options = {};
        }

        return prepared_options;
    }

    // Show current message based on the amount of submit's
    function showSubmitStatus($form) {

        if (FORM_UTILITIES.options.debugMode === false) {
            return;
        }

        if (submitInProgress($form)) {
            console.log(FORM_UTILITIES.options.submitWarning);
        } else {
            console.log(FORM_UTILITIES.options.submitNotice);
        }
    }

    // Helper function that adds submitInProgress flag on the current form.
    function submitInProgress($form) {

        // Return true since the current form is submitting
        if($form.data('submitInProgress') != null) {
            return true;
        }

        // Return false since it's our first submit
        return false;
    }

    // Append submit class defined within options to the form element
    function setSubmitFormClass($form) {

        // Don't set submit class if our value is false
        if(typeof FORM_UTILITIES.options.submitFormClass != 'string') {
            return;
        }

        $form.addClass(FORM_UTILITIES.options.submitFormClass);
    }

    // Disable all submit buttons
    function disableSubmitButtons($form) {

        // Don't disable buttons if our disableButtons option is false
        if (FORM_UTILITIES.options.disableButtons === false) {
            return;
        }

        // Don't continue if a submit is already in progress
        if (submitInProgress($form)) {
            return;
        }

        var submits = $form.find(FORM_UTILITIES.options.submitButtons);

        // Return if we have no submits defined.
        if(submits.length === 0) {
            return;
        }

        // Disable our buttons
        submits.prop('disabled', true);

        // Check if we have a custom disabled class for our buttons
        if (typeof FORM_UTILITIES.options.disabledButtonClass != 'string') {
            return;
        }

        // Append the disabled class on all submit buttons
        submits.addClass(FORM_UTILITIES.options.disabledButtonClass);
    }

})(window.jQuery(window), window.jQuery(document), window.jQuery);
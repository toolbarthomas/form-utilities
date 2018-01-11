# Form utilities

Javascript functions to improve overall form experience.
That enables the following features:

### Prevents multiple submit
This script supports the ability to prevent al next submits after the intitial submit is already in progress.



### Prevent multiple submit

## Initializing Form Utilities
The form utilities javascript function should be initiated after the document.ready event, for example:

```javascript

    $(document).ready({
        setFormUtilities();
    });

```

## Options
Options should be defined when executing the actual function.
The following options can be customized:

```javascript

    var options = {
        'form': 'form', // Default selector for the form element
        'submitNotice': 'Submit initiated', // Show console notice when first submit has been triggered.
        'submitFormClass': 'js__form-utilities--submit-in-progress', // Classname that will be set on $form if submit is
        'submitWarning': 'A second submit has been prevented, since another submit is already in progress for the selected form.', // Console notice when second submit has been triggered.
        'submitButtons': ':submit', // Selector query for defining specific submit buttons
        'disableButtons': true, // Append disabled property to the submit buttons
        'disabledButtonClass': 'js__form-utilities__submit--disabled', // Appends a custom class to the submit buttons
        'debug_mode': false // Show submit status from the console.
    }

    setFormUtilities(options);

```
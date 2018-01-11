# Form utilities

Javascript functions to improve overall form experience.
That enables the following features:

### Prevents multiple submit
This script supports the ability to prevent al next submits after the intitial submit is already in progress.

## Setup
You can get Form Utilities from the src/ folder in the GitHub repository.
This plugin is written in jQuery and should also be included just before importing **jquery.form-utilities.js**, for example:

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>

<script src="assets/js/jquery.form-utilities.js"></script>
```


The form utilities javascript function should be initiated within the document.ready event, for example:

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
        'submitFormClass': 'js__form-utilities--submit-in-progress', // Adds a custom class to the form elements, no class will be added if the value is false.
        'submitWarning': 'A second submit has been prevented, since another submit is already in progress for the selected form.', // Console notice when second submit has been triggered.
        'submitButtons': ':submit', // Selector query for defining specific submit buttons
        'disableButtons': true, // Append disabled property to the submit buttons
        'disabledButtonClass': 'js__form-utilities__submit--disabled', // Adds a custom class to the submit elements, no class will be added if the value is false.
        'stopImmediatePropagation':  // Prevents other javascript from being executed
        'debugMode': false // Show submit status from the console.
    }

    setFormUtilities(options);

```

## Bower Dependencies

* wiredep as bower postinstall hook
* gulp wiredep

Adjust packages with overrides-property in bower.json:

    "overrides": {
      "bootstrap-sass-official": {
        "main": "assets/javascripts/bootstrap.js"
      }
    }


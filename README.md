What is everycheckbox?
======================

A tiny plugin to use a checkbox to toggle all/none in a collection
of checkboxes.
Example usage: `$('input.my-master-toggle').everycheckbox();`, or why not
`$('[data-master-toggle=true]').everycheckbox({'parentSelector': '.control-group'});`

Invoking it on one "Master toggle" input element makes all checkboxes in
the collection to be checked when the master is checked.
When deselecting the master (when all checkboxes are checked),
all of the checkboxes are unchecked.
When at least one checkbox is unchecked, the "Master toggle" is unchecked.

Options:
--------
`parentSelector`: a selector string to find the enclosing element housing the
group of selectors to be toggled. Default is "fieldset".
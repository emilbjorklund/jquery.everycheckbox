What is everycheckbox?
----------------------

Tiny plugin to use a checkbox to toggle all/none in a collection
of checkboxes. Applies to an enclosing element.

Example usage: `$('.my-collection-of-inputs').everycheckbox();`
Another example: `$('.my-collection-of-inputs').everycheckbox({masterSelector: '#mymaster'});`

Invoking it on a collection of input elements makes all checkboxes in
the collection to be checked when the master is checked. The master toggle
is configurable, default selector is "[data-master-toggle=true]".
When deselecting the master (when all checkboxes are checked),
all of the checkboxes are unchecked.
When at least one checkbox is unchecked, the "Master toggle" is unchecked.

Options:
========
masterSelector: a selector string to find the master toggle input in the
group of selectors to be toggled. Default is "[data-master-toggle=true]".
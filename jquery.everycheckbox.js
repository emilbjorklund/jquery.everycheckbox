/*
* Tiny plugin to use a checkbox to toggle all/none in a collection
* of checkboxes.
* Example usage: $('input.my-master-toggle').everycheckbox();
*
* Invoking it on one "Master toggle" input element makes all checkboxes in
* the collection to be checked when the master is checked.
* When deselecting the master (when all checkboxes are checked),
* all of the checkboxes are unchecked.
* When at least one checkbox is unchecked, the "Master toggle" is unchecked.
*
* Options:
* ========
* parentSelector: a selector string to find the enclosing element housing the
* group of selectors to be toggled. Default is "fieldset".
*/

!function ($) {
	var EveryCheckbox = function (element, options) {
		this.init(element, options);
	};

	EveryCheckbox.prototype = {
		constructor: EveryCheckbox,
		init: function (element, options) {
			this.$el = $(element);
			this.settings = $.extend({}, $.fn.everycheckbox.defaults, options);
			this.$parent = this.$el.parents(this.settings.parentSelector);
			this.$checkboxes = this.$parent.find('input[type="checkbox"]').not(this.$el);
			this.$el.on('change', $.proxy(this.handleToggle, this));
		},

		handleToggle: function () {
			if (this.$el.is(':checked')) {
				this.checkAll();
			} else {
				this.checkNone();
			}
		},

		checkAll: function () {
			var self = this;
			this.$checkboxes.
				attr('checked', 'checked').
				on('change.everycheckbox', $.proxy(this.uncheckSelf, this));
		},
		checkNone: function () {
			this.$checkboxes.
				removeAttr('checked').
				off('change.everycheckbox');
		},
		uncheckSelf: function () {
			this.$el.removeAttr('checked');
		}
	};

	$.fn.everycheckbox = function ( options ) {
		return this.each(function () {
			var $this = $(this),
				data = $this.data('everycheckbox'),
				options = typeof options == 'object' && options;

			if (!data) {
				$this.data('everycheckbox', (data = new EveryCheckbox(this, options)));
			}
		});
	};

	$.fn.everycheckbox.Constructor = EveryCheckbox;

	$.fn.everycheckbox.defaults = {
		'parentSelector': 'fieldset'
	};
}(window.jQuery);
/*
* Tiny plugin to use a checkbox to toggle all/none in a collection
* of checkboxes. Applies to an enclosing element.
* Example usage: $('.my-collection-of-inputs').everycheckbox();
*
* Invoking it on a collection of input elements makes all checkboxes in
* the collection to be checked when the master is checked. The master toggle
* is configurable, default selector is "[data-master-toggle=true]".
* When deselecting the master (when all checkboxes are checked),
* all of the checkboxes are unchecked.
* When at least one checkbox is unchecked, the "Master toggle" is unchecked.
*
* Options:
* ========
* masterSelector: a selector string to find the master toggle input in the
* group of selectors to be toggled. Default is "[data-master-toggle=true]".
*/

!function ($) {
	var EveryCheckbox = function (element, options) {
		this.init(element, options);
	};

	EveryCheckbox.prototype = {
		constructor: EveryCheckbox,
		init: function (element, options) {
			this.$wrap = $(element);
			this.settings = $.extend({}, $.fn.everycheckbox.defaults, options);
			this.$el = this.$wrap.find(this.settings.masterSelector);

			this.$checkboxes = this.$wrap.find('input[type="checkbox"]').not(this.$el);
			// Do some event delegation to detect changes in checkboxes in general:
			// (Uses proxy to bind "this" to our object.)
			this.$wrap.on('change', 'input[type=checkbox]', $.proxy(function (e) {
				var $target = $(e.target);
				// Only uncheck self is the target is not checked & "master toggle" is:
				// (Couln't possibly be a change event in "master toggle")
				if ($target.is(':not(:checked)') && this.$el.is(':checked')) {
					this.uncheckSelf();
				}
				// If, on the other hand, the target is the "master toggle", trigger handler:
				if (this.$el.is($target)) {
					this.handleToggle();
				}
			}, this));
		},

		handleToggle: function () {
			if (this.$el.is(':checked')) {
				this.checkAll();
			} else {
				this.checkNone();
			}
		},

		checkAll: function () {
			this.$checkboxes.attr('checked', 'checked').trigger('change');
		},
		checkNone: function () {
			this.$checkboxes.removeAttr('checked').trigger('change');
		},
		uncheckSelf: function () {
			this.$el.removeAttr('checked');
		}
	};

	// jQuery plugin definition:
	$.fn.everycheckbox = function (options) {
		return this.each(function () {
			var $this = $(this),
				data = $this.data('everycheckbox'), // Set data to previous plugin data, if existing.
				opts = (typeof options == 'object' && options); // Returns options if options are object, else false.

			// If no previous data, initialize new plugin data:
			if (!data) {
				$this.data('everycheckbox', (data = new EveryCheckbox(this, opts)));
			}
		});
	};

	$.fn.everycheckbox.Constructor = EveryCheckbox;

	$.fn.everycheckbox.defaults = {
		masterSelector: '[data-master-toggle=true]'
	};
}(window.jQuery);
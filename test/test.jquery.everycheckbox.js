module('Basic setup');
test('jquery.everycheckbox exists on jquery prototype', function () {
	ok(jQuery.fn.everycheckbox, 'there is a function called everycheckbox.');
});
test('verify the fixtures', function () {
	var $fixture = $('#qunit-fixture');
	strictEqual(
		$fixture.find('#checkboxes-default input').size(),
		4,
		'There should be 4 checkboxes in the fixtures default group'
	);
	strictEqual(
		$fixture.find('#checkboxes-custom input').size(),
		4,
		'There should be 4 checkboxes in the fixtures custom group'
	);
});

module('Default options', {
	setup: function () {
		$('#checkboxes-default').everycheckbox();
	}
});
test('master should have data on everycheckbox', function () {
	var data = $('#checkboxes-default').data('everycheckbox');
	ok(data, 'there should be data associated with the checkbox group');
});
test('toggling the master toggles all', function () {
	$('#checkboxes-default').
		find('[data-master-toggle]').
			prop('checked', true).trigger('change');
	equal(
		$('#checkboxes-default input:checked').size(),
		4,
		'all checkboxes should be checked after clicking master'
	);
});
test('unchecking any after activating the master should uncheck master', function () {
	$('#checkboxes-default').
		find('[data-master-toggle]').
			prop('checked', true).trigger('change').
		end().
		find('input:eq(3)').
			prop('checked', false).trigger('change');
	equal(
		$('#checkboxes-default').find('[data-master-toggle]').is(':checked'),
		false,
		'master should not be checked.'
	);
});
test('unchecking master again should uncheck all checkboxes', function () {
	$('#checkboxes-default').
		find('[data-master-toggle]').prop('checked', true).
			trigger('change');

	equal(
		$('#checkboxes-default input:checked').size(),
		4,
		'all checkboxes should be checked after clicking master'
	);
	$('#checkboxes-default').
		find('[data-master-toggle]').
			prop('checked', false).
				trigger('change');

	equal(
		$('#checkboxes-default input:checked').size(),
		0,
		'no checkboxes should be checked after clicking master again'
	);
});

module('Custom options', {
	setup: function () {
		$('#checkboxes-custom').everycheckbox({
			masterSelector: '#data-master-toggle'
		});
	}
});
test('master should have data on everycheckbox', function () {
	var data = $('#checkboxes-custom').data('everycheckbox');
	ok(
		data,
		'there should be data associated with the checkbox group'
	);
	ok(
		data.$el.is($('#data-master-toggle')),
		'master selector is now custom id'
	);
});
test('toggling the master toggle toggles the rest of the checkboxes', function () {
	$('#data-master-toggle').
		prop('checked', true).
			trigger('change');
	equal(
		$('#checkboxes-custom input:checked').size(),
		4,
		'all checkboxes should be checked after clicking master'
	);
});
test('unchecking any after toggling the master should uncheck master', function () {
	$('#checkboxes-custom').
		find('#data-master-toggle').
			prop('checked', true).
				trigger('change').end().
		find('input:eq(3)').
			prop('checked', false).
				trigger('change');
	equal(
		$('#checkboxes-custom').find('#data-master-toggle').is(':checked'),
		false,
		'master should not be checked.'
	);
});
test('unchecking master again should uncheck all checkboxes', function () {
	$('#checkboxes-custom').
		find('#data-master-toggle').
			prop('checked', true).
				trigger('change');
	equal(
		$('#checkboxes-custom input:checked').size(),
		4,
		'all checkboxes should be checked after clicking master'
	);

	$('#checkboxes-custom').
		find('#data-master-toggle').
			prop('checked', false).
				trigger('change');
	equal(
		$('#checkboxes-custom input:checked').size(),
		0,
		'no checkboxes should be checked after clicking master again'
	);
});

module('Events', {
	setup: function () {
		$('#checkboxes-default').everycheckbox();
	}
});
test('toggling all boxes should trigger change-events on all', function () {
	var changed = 0;

	$('#checkboxes-default').
		find('input').on('change', function () {
			changed = changed + 1;
		}).end().
		find('[data-master-toggle]').
		prop('checked', true).
		trigger('change');

	equal(changed, 4, '4 change events should be recorded');
});
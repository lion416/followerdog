'use strict';

(function($, $scope) {
    // Bootstrap Datepicker default options
    $scope.defaults = {
        todayHighlight: true,
        orientation: "bottom left",
        templates: {
            leftArrow: '<i class="fas fa-angle-left"></i>',
            rightArrow: '<i class="fas fa-angle-right"></i>'
        }
    };

    var BootstrapDatepicker = function() {
        return {
            init: function() {
                // Basic options
                $("#datepicker-default").datepicker($scope.defaults);

                // Input group
                $("#datepicker-inputgroup").datepicker($scope.defaults);

                // Enable helpers
                $("#datepicker-helpers").datepicker($.extend({}, $scope.defaults, {
                    todayBtn: "linked",
                    clearBtn: true
                }));

                // Orientations pickers
                $("#datepicker-tl").datepicker($.extend({}, $scope.defaults, {
                    orientation: "top left"
                }));

                $("#datepicker-tr").datepicker($.extend({}, $scope.defaults, {
                    orientation: "top right"
                }));

                $("#datepicker-bl").datepicker($.extend({}, $scope.defaults, {
                    orientation: "bottom left"
                }));

                $("#datepicker-br").datepicker($.extend({}, $scope.defaults, {
                    orientation: "bottom right"
                }));

                // Data range example
                $('#datepicker-range').datepicker($scope.defaults);

                // Inline datepicker
                $('#datepicker-inline').datepicker($scope.defaults);

                $('#datepicker-inline').on('changeDate', function() {
                    $('#datepicker-inline-value').val($('#datepicker-inline').datepicker('getFormattedDate'));
                });
            }
        }
    }();

    var PickADateDatepicker = function() {
        return {
            init: function () {
                // Basic options
                $('.pickadate').pickadate();

                // Change day names
                $('.pickadate-header-labels').pickadate({
                    weekdaysShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                    showMonthsShort: true
                });

                // Button options
                $('.pickadate-buttons').pickadate({
                    today: '',
                    close: '',
                    clear: 'Clear selection'
                });

                // Format options
                $('.pickadate-format').pickadate({
                    // Escape any “rule” characters with an exclamation mark (!).
                    // Ex. We scaped the "d" character which formats to "Date of the month"
                    format: 'Selecte!d !date: dddd, dd mmm, yyyy',
                    formatSubmit: 'yyyy/mm/dd',
                    hiddenPrefix: 'prefix__',
                    hiddenSuffix: '__suffix'
                });

                // Editable input
                var $editableDate = $('.pickadate-editable').pickadate({
                    editable: true,
                    onClose: function() {
                        $('.pickadate-editable').focus();
                    }
                });

                var picker_date = $editableDate.pickadate('picker');
                $editableDate.on('click', function(event) {
                    if (picker_date.get('open')) {
                        picker_date.close();
                    } else {
                        picker_date.open();
                    }
                    event.stopPropagation();
                });

                // Dropdown selectors
                $('.pickadate-selectors').pickadate({
                    selectYears: true,
                    selectMonths: true
                });

                // Year selector
                $('.pickadate-year').pickadate({
                    selectYears: 4
                });

                // Disable certain dates
                $('.pickadate-disable').pickadate({
                    disable: [
                        [2018,12,7],
                        [2018,12,25],
                        [2018,12,31],
                        [2019,1,6],
                        [2019,2,14]
                    ]
                });

                // Disable date range
                $('.pickadate-disable-range').pickadate({
                    disable: [
                        5,
                        [2018, 12, 21, 'inverted'],
                        { from: [2019, 2, 14], to: [2019, 2, 25] },
                        [2019, 1, 20, 'inverted'],
                        { from: [2019, 3, 17], to: [2019, 3, 18], inverted: true }
                    ]
                });

                // Events
                $('.pickadate-events').pickadate({
                    onStart: function() {
                        console.log('Pickadate - onStart triggered')
                    },
                    onRender: function() {
                        console.log('Pickadate - onRender triggered')
                    },
                    onOpen: function() {
                        console.log('Pickadate - onOpen triggered')
                    },
                    onClose: function() {
                        console.log('Pickadate - onClose triggered')
                    },
                    onStop: function() {
                        console.log('Pickadate - onStop triggered')
                    },
                    onSet: function(context) {
                        console.log('Pickadate - onSet triggered', context)
                    }
                });
            }
        }
    }();

    $(function() {
        BootstrapDatepicker.init();
        PickADateDatepicker.init();
    });
})(jQuery, {});
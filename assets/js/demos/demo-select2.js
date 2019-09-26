'use strict';

(function($, $scope) {
    $scope.iconFormat = function (icon) {
        var originalOption = icon.element;
        if (!icon.id) { return icon.text; }

        return '<i class="' + $(icon.element).data('icon') + '"></i>' + icon.text;
    };

    var Select2Selects = function() {
        return {
            init: function() {
                // Default initialization, most of the time you'll likely use it like it
                $('.select-2').select2();

                // Select with search hidden
                $('#select2-hide-search').select2({
                    minimumResultsForSearch: Infinity
                });

                // Select with placeholder
                $('.select2-placeholder').select2({
                    placeholder: "Select a state",
                    allowClear: true
                });

                // Single select with icons
                $('.select2-with-icons').select2({
                    templateResult: $scope.iconFormat,
                    minimumResultsForSearch: Infinity,
                    templateSelection: $scope.iconFormat,
                    escapeMarkup: function(mk) { return mk; }
                });
            }
        }
    }();

    $(function() {
        Select2Selects.init();
    });
})(jQuery, {});

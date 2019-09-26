/**
 * FOR DEMO PURPOSES ONLY
 **/

'use strict';

// document ready
(function($, $scope) {
    // VARIABLES
    // Basic inputs
    $scope.formDemoInitialColor = "3";
    $scope.formDemoInitialBackground = "6";
    $scope.formColorOptions = {
        card: $(".demo-form-color-options").data("current-color", $scope.formDemoInitialColor).data("current-background", $scope.formDemoInitialBackground),

        colorSelector: $("#demo-form-color-current").addClass("btn-outline-" + $scope.formDemoInitialColor),
        currentColor: $scope.formDemoInitialColor,

        backgroundSelector: $("#demo-form-background-current").addClass("btn-" + $scope.formDemoInitialBackground),
        currentBackground: $scope.formDemoInitialBackground
    };

    // Checkboxes & radios
    $scope.$demoFormStyledCheckboxes = $(".demo-form-styled-checkboxes");

    // FUNCTIONS
    // Apply colors th basic inputs form demo
    $scope.applyColors = function(color, colorOrBackground) {
        console.log(colorOrBackground, color);

        // All .form-control inputs
        $(".form-control", $scope.formColorOptions.card)
            .removeClass((colorOrBackground === "color" ? ($.isNumeric(color.current) ? "color-" : "text-") : "bg-") + color.current)
            .addClass((colorOrBackground === "color" ? ($.isNumeric(color.color) ? "color-" : "text-") : "bg-") + color.color);

        // All checkboxes and radio buttons
        if (colorOrBackground === "color") {
            $(".checkbox", $scope.formColorOptions.card)
                .removeClass("checkbox-" + color.current)
                .addClass("checkbox-" + color.color);

            $(".radio", $scope.formColorOptions.card)
                .removeClass("radio-" + color.current)
                .addClass("radio-" + color.color);
        }

        // Store the current color for interaction usage
        $scope.formColorOptions.card.data("current-" + colorOrBackground, color.color);

        // Update the selector text
        $scope.formColorOptions[colorOrBackground + "Selector"].html(color.color);
        $scope.formColorOptions[colorOrBackground + "Selector"]
            .removeClass("btn-" + (colorOrBackground === "color" ? "outline-" : "") + color.current)
            .addClass("btn-" + (colorOrBackground === "color" ? "outline-" : "") + color.color);
    };

    // Toggle .inverted css class
    $scope.toggleInverted = function() {
        $(".checkbox", $scope.$demoFormStyledCheckboxes).toggleClass("inverted");
    };

    $(function() {
        // Setting the initial value for the color selector
        $scope.formColorOptions.colorSelector.html($scope.formColorOptions.currentColor);
        $scope.applyColors({color: $scope.formDemoInitialColor, current: $scope.formDemoInitialColor}, "color");
        $scope.applyColors({color: $scope.formDemoInitialBackground, current: $scope.formDemoInitialBackground}, "background");

        // Changing the color for all inputs
        $("#demo-form-color-selector").on("click", ".dropdown-item", function(e) {
            e.preventDefault();

            var color = $(this).data("color");
            var current = $scope.formColorOptions.card.data("current-color");

            $scope.applyColors({color: color, current: current}, "color");
        });

        // Changing the background for all inputs
        $("#demo-form-background-selector").on("click", ".dropdown-item", function(e) {
            e.preventDefault();

            var color = $(this).data("color");
            var current = $scope.formColorOptions.card.data("current-background");

            $scope.applyColors({color: color, current: current}, "background");
        });

        // Toggle .inverted css class for checkboxes demo
        $scope.$demoFormStyledCheckboxes.on("click", ".btn-toggle-checkbox-inverted", function(e) {
            $scope.toggleInverted();
        });
    });
})(jQuery, {});

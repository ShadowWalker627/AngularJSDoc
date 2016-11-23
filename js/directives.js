/**
 * Created by baymax on 16/11/14.
 */
app.directive('myTransclude',function () {
    return{

    }
});

app.directive("treeControlCheckbox",function () {
    return{
        restrict: 'E',
        scope:{
            checked : "&"
        },
        controller: ['$scope',function ($scope) {

        }],
        template: '<input type="checkbox" ng-model="checkId" ng-change="checked()" ng-checked="isChecked()"/>',
        link: function (scope, element, attrs, ctrl) {
            scope.checkId = scope.$id;
        }
    }
})
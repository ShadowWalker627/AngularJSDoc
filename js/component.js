/**
 * Created by baymax on 16/11/9.
 */
app.component('hello',{
    template:'<h3>{{$ctrl.greeting}} Solar System!</h3>'+
    '<button ng-click="$ctrl.toggleGreeting()">toggle greeting</button>',
    controller: function () {
        this.greeting = 'hello';
        this.toggleGreeting = function () {
            this.greeting = (this.greeting == 'hello') ? 'what up' : 'hello';
        }
    }
});

app.component('people',{
    bindings: {people: '<'},
    template: '<h3>Some people:</h3>' +
    '<ul>' +
    '  <li ng-repeat="person in $ctrl.people">' +
    '    <a ui-sref="person({ personId: person.id })">' +
    '      {{person.name}}' +
    '    </a>' +
    '  </li>' +
    '</ul>'
});

app.component('person',{
    bindings: {person: '<'},
    template: '<li ng-repeat="person in $ctrl.people"> ' +
    '<a ui-sref="person({ personId: person.id })">{{person.name}} </a>' +
    '</li>'
});
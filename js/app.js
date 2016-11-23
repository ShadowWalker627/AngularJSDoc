/**
 * 提高性能：
 *      关闭 debug
 *      减少 watcher 数量
 *      在无线滚动加载中避免使用ng-repeat
 *
 *      通过factory 创建单例对象，用于两个作用域间通信传值
 * */
var app = angular.module('uiRouteApp',['ui.router']);

app.config(function ($compileProvider,$stateProvider, $urlRouterProvider) {
    $compileProvider.debugInfoEnabled(false);   //关闭 debug，提高性能

    //控制器所有的 resolve 解决项都被解决后才被实例化
    var states = [
        {
            name: 'hello',
            url:'/hello',
            template:'<h3>{{$ctrl.greeting}} Solar System!</h3>'+
            '<button ng-click="$ctrl.toggleGreeting()">toggle greeting</button>',
            controller: function () {
                this.greeting = 'hello';
                this.toggleGreeting = function () {
                    this.greeting = (this.greeting == 'hello') ? 'what up' : 'hello';
                }
            },
            controllerAs: '$ctrl'
        },
        {
            name: 'about',
            url:'/about',
            template: '<h1>about</h1>'
        },
        {
            name: 'people',
            url: '/people',
            template: '<h3>Some people:</h3>' +
                    '<ul>' +
                    '  <li ng-repeat="person in $ctrl.people | orderBy: \'name\' : false ">' +
                    '    <a ui-sref="person({personId: person.id})">' +
                    '      {{person.name}} -----'+' {{person.id}}' +
                    '    </a>' +
                    '  </li>' +
                    '</ul>',
                    // '<select ng-options="person as person.name for person in $ctrl.people track by person.id" ng-model="$ctrl.person">' +
                    // '</select>',
            controllerAs: '$ctrl',
            controller: function (people) {
                var vm = this;
                vm.people = people;
            },
            resolve:{
                people: function (PeopleService) {
                    PeopleService.getAllPeople().then(function (data) {
                        console.log(data); //all person array
                    });
                    //getAllPeople 返回一个 promise 对象，resolve 解析 promise 对象，得到其 resolved 返回的值
                    return PeopleService.getAllPeople();

                    //如果直接将$http 的 promise 返回，如下：
                    // return PeopleService.getAllPeople_http_promise().then(function (res) {
                    //     return res.data;
                    // })
                }
            }
        },
        {
            name: 'person',
            url: '/person/{personId}',
            template: '<h3>A person!</h3>' +

                    '<div>Name: {{$ctrl.person.name}}</div>' +
                    '<div>Id: {{$ctrl.person.id}}</div>' +
                    '<div>Company: {{$ctrl.person.company}}</div>' +
                    '<div>Email: {{$ctrl.person.email}}</div>' +
                    '<div>Address: {{$ctrl.person.address}}</div>' +

                    '<button ui-sref="people">Close</button>',
            controller:function (person) {
                var vm = this;
                vm.person = person;
            },
            controllerAs: '$ctrl',
            resolve: {
                person: function (PeopleService, $stateParams) {
                    return PeopleService.getPerson($stateParams.personId)
                }
            }
        },
        {
            name: 'ngRepeat',
            url: '/ngRepeat',
            templateUrl:'./doc/directive/ngRepeat.html',
            controller: repeatCtrl,
            controllerAs: 'vm'
        },
        {
            name: '$compile',
            url: '/$compile',
            templateUrl: './doc/ng-service/$compile.html',
            controller: $compileCtrl,
            controllerAs: 'vm'
        },
        {
            name: '$q',
            url:'/$q',
            templateUrl: './doc/ng-service/$q.html',
            controller: $qCtrl,
            controllerAs: 'vm'
        },
        {
            name: 'ngForm',
            url:'/ngForm',
            templateUrl: './doc/directive/ngForm.html',
            controller: ngFormCtrl,
            controllerAs: 'vm'
        },
        {
            name: 'understandingScope',
            url:'/understandingScope',
            templateUrl: './doc/guide/understandingScope.html',
            controller: understandingScopeCtrl,
            controllerAs: 'vm'
        },
        {
            name: 'directives',
            url: '/directives',
            templateUrl: './doc/guide/directives.html',
            controller: directivesCtrl,
            controllerAs: 'vm'
        },
        {
            name: 'directivesProp',
            url: '/directivesProp',
            parent: 'directives',
            views: {
                'scope':{
                  templateUrl: './doc/guide/directives/scope.html'
                },
                'transclude':{
                    templateUrl: './doc/guide/directives/transclude.html'
                },
                'controller':{
                    templateUrl: './doc/guide/directives/controller.html'
                }
            }
        },
        {
            name:'ngFunction',
            url: '/ngFunction',
            templateUrl: './doc/guide/ng-function.html',
            controller: ngFunctionCtrl,
            controllerAs: 'vm'
        }
    ];

    states.forEach(function (state) {
       $stateProvider.state(state);
    });

    $urlRouterProvider.otherwise('/hello');
});
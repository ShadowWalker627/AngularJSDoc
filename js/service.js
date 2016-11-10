/**
 * Created by baymax on 16/11/9.
 */
app.service('PeopleService',PeopleService);
app.factory('FooService',FooService);

PeopleService.$injector = [];
FooService.$injector = [];

function PeopleService($http) {
    var service = {
        getAllPeople: function () {
            return $http.get('./person.json').then(function (res) {
                return res.data
            });
        },
        //直接返回$http的promise:
        getAllPeople_http_promise: function () {
            return $http.get('./person.json')
        },
        getPerson: function (id) {
            function personMatchesParam(person) {
                return person.id == id;
            }

            return service.getAllPeople().then(function (people) {
                return people.find(personMatchesParam);
            })
        }
    };
    return service;
}

function FooService() {
    return{
        target: 'factory',
        sayHello: function () {
            return 'hello ' + this.target
        }
    }
}
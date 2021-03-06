
/**
 * Created by baymax on 16/11/9.
 */
app.controller('MainCtrl',MainCtrl);
app.controller('repeatCtrl', repeatCtrl);
app.controller('$qCtrl',$qCtrl);

MainCtrl.$injector = ['FooService'];
repeatCtrl.$injector = [];
$qCtrl.$injector = [];

function MainCtrl(FooService, $interval) {
    var vm = this;

		// http://www.jb51.net/article/74606.htm
		// moment 中文
    $interval(function () {
        vm.time = new Date();
    }, 1000);

    /**
     *
     * null 是对象，undefined 独立的一个类型
     * if 判断 false
     * typeof null undefined
     *
     * */
//            var myData = {
//                name: 'Adam'
//            };
//            console.log('var '+ myData.weather);
//            console.log('Prop ' + ("weather" in myData));
//
//            myData.weather = 'sunny';
//            console.log('var '+ myData.weather);
//            console.log('Prop ' + ("weather" in myData));
//
//            myData.weather = null;
//            console.log('var '+ myData.weather);
//            console.log('Prop ' + ("weather" in myData));
}

//ngRepeatController
function repeatCtrl() {
    var vm = this;
    vm.friends = [
        {name:'John', age:25, gender:'boy'},
        {name:'John', age:25, gender:'boy'},
        {name:'Jessie', age:30, gender:'girl'},
        {name:'Johanna', age:28, gender:'girl'},
        {name:'Joy', age:15, gender:'girl'},
        {name:'Mary', age:28, gender:'girl'},
        {name:'Peter', age:95, gender:'boy'},
        {name:'Sebastian', age:50, gender:'boy'},
        {name:'Erika', age:27, gender:'girl'},
        {name:'Patrick', age:40, gender:'boy'},
        {name:'Samantha', age:60, gender:'girl'}
    ];
    vm.forTrackBy=[3,4,5,3];
    vm.result = "25"
}

//$q
function $qCtrl($q) {
    var vm = this;
    vm.okToGreet_es6 = true;
    vm.okToGreet_commonjs = true;

    //es6 constructor
    vm.greet_es6 = function () {
        vm.asyncGreet_es6 = function (name) {
            return $q(function (resolve, reject) {
                setTimeout(function () {
                    if(vm.okToGreet_es6){
                        resolve('Hello ' + name +'!');
                    }else{
                        reject('Greeting ' + name + ' is not allowed!')
                    }
                },1000)
            })
        };

        vm.promise_es6 = vm.asyncGreet_es6('Robin Hood');
        vm.promise_es6.then(function (greeting) {
            console.log('Success: ' + greeting);
        },function (reason) {
            console.log('Failed: ' + reason)
        });
    };

    //CommonJS style
    vm.greet_commonjs = function () {
        vm.asyncGreet_commonjs = function (name) {
            var deferred = $q.defer();

            setTimeout(function () {
                deferred.notify('About to greet ' + name + '.');

                if(vm.okToGreet_commonjs){
                    deferred.resolve('Hello ' + name +'!');
                }else(
                    deferred.reject('Greeting ' + name + ' is not allowed!')
                )
            },1000);

            return deferred.promise;
        };

        vm.promise_commonjs = vm.asyncGreet_commonjs('Robin Hood');
        vm.promise_commonjs.then(function (greeting) {
            console.log('Success: ' + greeting);
        },function (reason) {
            console.log('Failed: ' + reason)
        },function(update) {
            console.log('Got notification: ' + update);
        });
    }
}
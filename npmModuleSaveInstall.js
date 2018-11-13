/*
underscore

npm 패키지로 설정하는 명령어
npm init

npm install underscore
npm install underscore(모듈명) --save

일시적으로 사용하는 모듈은 --save 빼고 설치
프로젝트에 항상 필요하고 같이 다녀야하는 모듈이면 --save로 설치
*/
var _ = require('underscore') /*모듈명, underscore를 _로 선언해서 쓰는 관습이 있음. */

var arr = [3,6,9,1,12];

console.log(_.first(arr));
console.log(_.last(arr));
console.log(_.rest(arr));
console.log(_.indexOf(arr, 1));
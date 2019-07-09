let regex=/hello/;
// console.log(regex.test("hello"))
let regex2=/ab{2,3}c/
// console.log(regex2.test("abbc"))
var regex3 = /ab{2,5}c/g;
// var string = "abc abbc abbbc abbbbc abbbbbc abbbbbbc";
// console.log( string.match(regex3) );
// var regex4=/\/(gif|jpg|jpeg|png|GIF|JPG|PNG)$/
// var string2="jpg image/png image/jpeg"
// console.log( regex4.test('image/GIFDA'));
let array=[
  {"url":"sadada1"}
  // {"url":"sadada2"},
  // {"url":"sadada3"}
]
let obj={"url":"sadada4"}
console.log(array)
console.log(obj)
array.splice(0,1,obj)
console.log(array)

# Vietnamese Bad Words
This package is for developers to be able to easily integrate bad word checking into their projects.
This package can return bad words in array or regular expression (regex) form.

Enjoy!

Install
=======

    npm install vn-badwords

Usage
=====

```js
const list = require('vn-badwords'),
	array = list.array,
	regex = list.regex;
const check = regex.test("Có làm thì mới có ăn, không làm mà đòi có ăn thì ăn con cặc.");

/* OUTPUT:
	check: true
*/

```

Changelog
=======

**1.0.8**:
* Cập nhật thêm nhận ký

**1.0.7**:
* Cập nhật thêm từ khóa




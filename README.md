
# Vietnamese Bad Words
This package is for developers to be able to easily integrate bad word checking into their projects.
This package can return bad words in array or regular expression (regex) form.

Enjoy!

Install
=======

	# NPM
    npm install vn-badwords

	# YARN
	yarn add vn-badwords


Usage
=====

```js
const list = require('vn-badwords'),
	array = list.array,
	regexp = list.regexp;
let text = "Có làm thì mới có ăn, không làm mà đòi có ăn thì ăn con cặc.";

// e.g regex
const isRegexp = regexp.test(text);
// output: true

// e.g array
const isArray = array.includes(text);
// output: true

```

**1.1.1-hotfix.2**: Cập nhật một số từ, sửa đổi lại lỗi.


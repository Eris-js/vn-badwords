
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
const { badWords, blackList } = require('vn-badwords'),

const text = "Có làm thì mới có ăn, không làm mà đòi có ăn thì ăn con cặc.";


badWords(text, { validate: true });
// output: true

badWords(text, { replacement: '*' });
// output: Có làm thì mới có ăn, không làm mà đòi có ăn thì ăn con ***.

badWords(text, '*');
// output similar to BadWords(text, { replacement: '*' });

badWords(text, '*', (badwordsMatch, count) => console.log(badwordsMatch, count));
// returns value and a callback function
```
<<<<<<< HEAD

=======
Tham gia server hỗ trợ để góp ý cũng như là đóng góp từ khóa nhé: https://discord.gg/pUhzvB4hcs
**1.1.1-hotfix.2**: Cập nhật một số từ, sửa đổi lại lỗi.
>>>>>>> e31c98791520881552863ac89b1d1121548d9039


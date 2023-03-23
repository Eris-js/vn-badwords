# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

## [#846374f] 23-03-2023

* Chuyển các file `.js` thành `.ts` và add thêm các type cần thiết

* Hot Fix 1 lỗi khi không pass `options` thì sẽ không nhận được blacklist.

* Cài package `typescript`, và thêm config `typescript`.

    * Dựa trên template của [TSConfig base cho Node16](https://github.com/tsconfig/bases/blob/main/bases/node16.json)
    * Add thêm resolveJsonModule: true để import được file JSON.
    * Add thêm noEmit: true để không dùng output của TS Compiler mà dùng `tsup` để build package nhanh hơn.
* Chỉnh lại `package.json` để export thêm type, và thêm dòng build type trong config của `tsup`.

* Cài thêm package `tsx` để chạy các file `.ts`.
    * Để chạy các file ts, chạy `npx tsx đường/dẫn/tới/file/ts`. vd `npx tsx src/test.ts`

* Cài thêm package vitest và add thêm file unit test.

    * API của Vitest giống Jest nhưng chạy nhanh hơn rất nhiều + hỗ trợ TypeScript sẵn luôn, không cần phải config thêm.
    * Để chạy test, chạy `npm run test`.

## [#18d2da7] 23-03-2023

* Sửa lại phần `options`, thay vì phải check riêng thì mình tách riêng ra 1 function + tạo sẵn 1 default config để có thể merge vào tạo 1 config object => từ đó dùng để chạy các chức năng tiếp theo
* Cài package `tsup`, để build project này ra vừa hỗ trợ node vừa hỗ trợ ESM (cho các project typescript & browser/frontend)
* Dời hết source code vào trong folder `src` để có thể config npm bỏ qua những file này khi publish.
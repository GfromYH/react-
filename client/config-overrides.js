const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    //根据import来按需打包
    fixBabelImports('import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true,
    }),
     addLessLoader({
       javascriptEnabled: true,
       // modifyVars: { '@primary-color': '#2894a5' },
    }),
);

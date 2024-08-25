const types = require('@babel/types');
const template = require('@babel/template');
function babelPluginImport(){
    return {
       visitor:{
        ImportDeclaration(path,state){
            const {node} = path;
            const {specifiers} = node;
            const {libraryName,libraryDirectory='lib'} = state.opts;
            if(node.source.value === libraryName
                &&(!types.isImportDefaultSpecifier(specifiers[0]))){
                const  newImportDeclarations = specifiers.map(specifier=>{
                    return template.statement(
                    `import ${specifier.local.name} from '${libraryName}/${specifier.imported.name}';`
                    )();
                    /* return types.importDeclaration(
                        [types.importDefaultSpecifier(specifier.local)],
                        types.stringLiteral(libraryDirectory?
                            `${libraryName}/${libraryDirectory}/${specifier.imported.name}`
                            :`${libraryName}/${specifier.imported.name}`)
                    ); */
                })
                path.replaceWithMultiple(newImportDeclarations);
            }
        }
       }
    }
}
module.exports = babelPluginImport;
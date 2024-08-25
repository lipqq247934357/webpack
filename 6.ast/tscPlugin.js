const typeAnnotationMap= {
    TSNumberKeyword:'NumberLiteral',
    TSStringKeyword:'StringLiteral'
}
function tscPlugin(){
    return {
        pre(file){
         file.set('errors',[]);
        },
        visitor:{
            VariableDeclarator(path,state){
                const errors = state.file.get('errors');
                const {node} = path;
                const idType = typeAnnotationMap[node.id.typeAnnotation.typeAnnotation.type];
                const initType = node.init.type;
                if(idType !== initType){
                    Error.stackTraceLimit = 0;
                    errors.push(path.buildCodeFrameError(
                        `无法把${initType}赋值给${idType}`,Error
                    ));
                }
            }
        },
        post(file){
         console.log(...file.get('errors'));
        }
     }
}
module.exports = tscPlugin;
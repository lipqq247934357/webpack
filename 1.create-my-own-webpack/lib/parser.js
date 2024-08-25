const fs = require("fs");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const { transformFromAstSync } = require("@babel/core");

module.exports = {
    getAST: (path) => {
        const content = fs.readFileSync(path, "utf-8");
        return parser.parse(content, {
            sourceType: "module",
        });
    },
    getDependencies: (ast) => {
        const dependencies = [];
        traverse(ast, {
            ImportDeclaration: ({ node }) => {
                dependencies.push(node.source.value);
            },
        });
        return dependencies;
    },
    transform: (ast) => {
        const { code } = transformFromAstSync(ast, null, {
            presets: ["@babel/preset-env"],
        });

        return code;
    },
};

rm -rf ./lib && npx tsc -p tsconfig.json
rm -rf ./dist && npx webpack-cli --config webpack.config.js
cp ./dist/susX.min.js ./dist/susX.js 
npx prettier ./dist/susX.js -w
import { TreeChecker } from './TreeChecker.js';



const treeChecker = new TreeChecker({
    selector: '.tree-checker',
});

treeChecker.render();

console.log('instance TreeChecker', treeChecker);
class Compile {
    constructor (el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;
        if (this.el) {
            // save to fragment
            let fragment = this.nodeToFragment(this.el);
            // compile
            this.compile(fragment);
            // send back to root node to display
            this.el.appendChild(fragment);
        }
    }

    // toolbox functions
    isElementNode (node) {
        return node.nodeType === 1
    }

    isDirective (name) {
        // starts with 'l-'
        return name.includes('l-')
    }

    // core functions
    nodeToFragment (el) {
        let fragment = document.createDocumentFragment();
        // let firstChild;
        // push all the real nodes to fragement, when el.firstChild is null, the while ends. 
        while (el.firstChild) {
            fragment.appendChild(el.firstChild);
        }

        return fragment;
    }

    compileElement(node) {
        let nodeAttributes = node.attributes;
        Array.from(nodeAttributes).forEach((attribute) => {
            if (this.isDirective(attribute.name)) {
                let expr = attribute.value;
                let type = attribute.name.split('-')[1];
                CompileToolBox[type](node, this.vm, expr)
            }
        })
    }
    
    compileText(node) {
        let expr = node.textContent;
        // get content between '{{}}'
        let reg = /\{\P([^}]+)\}\}/g;
        if (reg.test(expr)) {
            let type = attribute.name.split('-')[1];
            CompileToolBox['text'](node, this.vm, expr);
        }
    }
    // compiles the element node and the text node
    compile (fragment) {
        let childNodes = fragment.childNodes;
        Array.from(childNodes).forEach((node) => {
            if (this.isElementNode(node)) {
                this.compileElement(node);
                this.compile(node)
            } else {
                this.compileText(node);
            }
        })
    }
}

CompileToolBox = {
    getVal (vm,expr) {
        expr = expr.split('.');
        return expr.reduce((prev, next)=> {
            return prev[next]
        }, vm.$data) // vm.$data will be the first 'prev', then iterate all the attribute in $data
    },
    text(node, vm, expr) {

        this.updater['textUpdater']();
    },
    model(node, vm, expr) {
        let modelUpdaterFn = this.updater['modelUpdater'];
        modelUpdaterFn && modelUpdaterFn(node, this.getVal(vm, expr));
    },
    updater: {
        textUpdater (node, value) {
            node.textContent = value;
        },
        modelUpdater (node, value) {
            node.value = value
        }
    }
}

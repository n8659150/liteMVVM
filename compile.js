class Compile {
    constructor (el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        if (this.el) {
            let fragment = this.nodeToFragment(this.el);
            this.compile(fragment);
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
                let result = attribute.value;
                // TODO
            }
        })
    }
    
    compileText(node) {
        let text = node.textContent;
        // get content between '{{}}'
        let reg = /\{\P([^}]+)\}\}/g;
        if (reg.test(text)) {
            //TODO
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

    CompileToolBox = {
        text() {

        },
        model() {

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


    

}
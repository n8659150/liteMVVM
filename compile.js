class Compile {
    constructor (el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        if (this.el) {
            let fragment = this.nodeToFragment(this.el);
            this.compile(fragment);
        }
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

    // compiles the element node and the text node
    compile (fragment) {
        let childNodes = fragment.childNodes;
        Array.from(childNodes).forEach((node) => {
            if (this.isElementNode(node)) {
                console.log('this node is element node:', node);
                this.compile(node)
            } else {
                console.log('this node is text node:', node);
            }
        })
    }
    // toolbox functions
    isElementNode (node) {
        return node.nodeType === 1
    }

}
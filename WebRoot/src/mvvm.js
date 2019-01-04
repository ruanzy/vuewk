function VM(options) {
    this.$options = options;
    this.$el = document.querySelector(this.$options.el);
    this.$data = this.$options.data;
    this.proxyData(this, this.$data);
    observable(this.$data);
    this.$compile = new Compile(this.$options.el, this);
}
VM.prototype = {
    proxyData: function(origin, target) {
        Object.keys(target).forEach(function(key) {
            Object.defineProperty(origin, key, {
                enumerable: false,
                configurable: true,
                get: function getter() {
                    return target[key];
                },
                set: function setter(newValue) {
                    target[key] = newValue;
                }
            });
        });
    }
};
function observable(data) {
    if (typeof data != 'object') {
        return;
    }
    Object.keys(data).forEach(function(key) {
        defineReactive(data, key, data[key]);
    });
}
function defineReactive(data, key, value) {
    let dep = new Dep();
    observable(value);
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: false,
        get: function() {
            Dep.target && dep.addSub(Dep.target);
            return value;
        },
        set: function(newValue) {
            if (newValue == value) return;
            value = newValue;
            dep.notify();
        }
    });
}
function Dep() {
    this.subs = [];
}
Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },
    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        })
    }
};
function Observer(vm, exp, cb) {
    this.vm = vm;
    this.cb = cb;
    this.exp = exp;
    this.value = this.get();
}
Observer.prototype = {
    update: function() {
        var value = this.get();
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal);
        }
    },
    get: function() {
        Dep.target = this;
        var value = this.vm[this.exp];
        Dep.target = null;
        return value;
    }
};
function Compile(el, vm) {
    this.$vm = vm;
    this.$el = document.querySelector(el);
    if (this.$el) {
        this.$fragment = this.nodeToFragment(this.$el);
        this.compileElement(this.$fragment);
        this.$el.appendChild(this.$fragment);
    }
}
Compile.prototype = {
    nodeToFragment: function(el) {
        let fragment = document.createDocumentFragment();
        let child;
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }
        return fragment;
    },
    compileElement: function(node) {
        let childNodes = node.childNodes;
        const _this = this;
        let reg = /\{\{(.*)\}\}/g;
        var arr = [].slice.call(childNodes);
        arr.forEach(function(node) {
            if (_this.isElementNode(node)) {
                _this.compile(node);
            } 
			else if (_this.isTextNode(node) && reg.test(node.textContent)) {
                var txt = node.textContent;
                let reg2 = /\{\{(.*)\}\}/g;
                var a = reg2.exec(txt);
                if (a) {
                    _this.compileText(node, a[1]);
                }
            }
            if (node.childNodes && node.childNodes.length) {
                _this.compileElement(node);
            }
        })
    },
    compile: function(node) {
        var nodeAttrs = node.attributes,
        me = this; [].slice.call(nodeAttrs).forEach(function(attr) {
            var attrName = attr.name;
            if (me.isDirective(attrName)) {
                var exp = attr.value;
                var dir = attrName.substring(2);
                if (me.isEventDirective(dir)) {
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                } else {
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }
            }
        });
    },
    compileText: function(node, exp) {
        compileUtil.text(node, this.$vm, exp);
    },
    isElementNode: function(node) {
        return (node.nodeType == 1);
    },

    isTextNode: function(node) {
        return node.nodeType == 3;
    },

    isDirective: function(attr) {
        return (attr.indexOf('v-') == 0);
    },

    isEventDirective: function(attr) {
        return attr.indexOf('on') == 0;
    },

    isLinkDirective: function(attr) {
        return attr.indexOf('bind') == 0;
    }
};
var compileUtil = {
    text: function(node, vm, exp) {
        this.bind(node, vm, exp, 'text');
    },
    bind: function(node, vm, exp, dir) {
        var updaterFn = updater[dir + 'Updater'];
        updaterFn && updaterFn(node, this.getVMVal(vm, exp));
        new Observer(vm, exp,
        function(value, oldValue) {
            updaterFn && updaterFn(node, value, oldValue);
        });
    },
    getVMVal: function(vm, exp) {
        let arr = exp.split('.');
        let value = vm.$data;
        arr.forEach(function(item) {
            value = value[item];
        });
		return value;
    },
    eventHandler: function(node, vm, exp, dir) {
        var eventType = dir.split(':')[1];
		var methods = vm.$options.methods;
        var fn = methods && methods[exp];
        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    }
};
var updater = {
    textUpdater: function(node, value) {
        node.textContent = typeof value == 'undefined' ? '': value;
    }
};
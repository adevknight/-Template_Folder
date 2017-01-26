function inherits(children, parent) {
  children.parent_ = parent;
  children.prototype = Object.create(parent.prototype, {
    constructor : {
      value : parent,
      enumerable : false,
      writable : true,
      configurable : true
    }
  });
}

function Parent(x) {
  this.ownParentName = x;
}
Parent.prototype.protParent = "Prot Parent";

function Children(x) {
  this.ownChildrenName = x;
}
Children.prototype.protChildren = "Prot Children";

inherits(Children, Parent);

var albert = new Children("Albert");


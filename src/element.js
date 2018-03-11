// Basic DOM-ish system to create string DOM templates

class attribute {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
  toString() {
    if (typeof this.value === 'boolean') return `${this.value ? this.name : ''}`;
    return `${this.name}="${this.value}"`;
  }
}

class element {
  constructor(type, attributes, ...children) {
    this.children = [...children];
    this.attributes = [...attributes];
    this.type = type;
  }
  attributesToString() {
    return this.attributes.reduce((string, attribute) => `${string} ${attribute}`, '').trim();
  }
  childrenToString() {
    return this.children.reduce((string, child) => `${string}${child}`, '');
  }
  toString() {
    return `<${this.type} ${this.attributesToString()}>${this.childrenToString()}</${this.type}>`;
  }
}

export default element;
export { attribute };

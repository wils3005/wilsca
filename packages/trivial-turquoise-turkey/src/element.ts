abstract class Element {
  static tagName = "";

  static innerHTML(): string {
    return "";
  }

  ["constructor"]!: typeof Element;
  readonly tagName: string;
  readonly innerHTML: string;

  constructor(innerHTML?: string) {
    this.tagName = this.constructor.tagName;
    this.innerHTML = innerHTML || this.constructor.innerHTML();
  }

  toString(): string {
    return `<${this.tagName}>${this.innerHTML}</${this.tagName}>`;
  }
}

export { Element };

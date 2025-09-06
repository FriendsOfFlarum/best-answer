export default class Extend {
  static Model = class {
    constructor(_model: any) {}
    hasOne<T>(_name?: string) {
      return this as any;
    }
    attribute<T>(_name?: string, _transform?: any) {
      return this as any;
    }
  };
}

export default class Model {
  static transformDate(value?: string | Date | null) {
    return value ? new Date(value as any) : null;
  }
}

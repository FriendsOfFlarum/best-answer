export default class ExtensionPage {
  __settingsCalls: any[] = [];
  buildSettingComponent(config: any) {
    this.__settingsCalls.push(config);
    return { selector: 'Setting', attrs: { config }, children: [] } as any;
  }
  submitButton() {
    return { selector: 'button', attrs: { className: 'Button Button--primary' }, children: ['Save'] } as any;
  }
}

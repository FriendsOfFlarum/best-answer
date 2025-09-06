import BestAnswerSettingsPage from '@src/admin/components/BestAnswerSettingsPage';
import { textContent } from '@helpers/vnode';

describe('BestAnswerSettingsPage (admin)', () => {
  test('renders headings and builds all settings components', () => {
    const page: any = new (BestAnswerSettingsPage as any)();
    const vnode = page.content();

    // Behavior: the page includes key section headings
    const text = textContent(vnode);
    expect(text).toContain('translated:fof-best-answer.admin.settings.label.tags');
    expect(text).toContain('translated:fof-best-answer.admin.settings.label.general');
    expect(text).toContain('translated:fof-best-answer.admin.settings.label.search');
    expect(text).toContain('translated:fof-best-answer.admin.settings.label.reminders');

    // Behavior: number of settings entries added matches configuration surface
    expect(Array.isArray(page.__settingsCalls)).toBe(true);
    expect(page.__settingsCalls.length).toBe(15);

    // Spot-check a few setting keys to verify intent
    const keys = page.__settingsCalls.map((c: any) => c.setting);
    expect(keys).toContain('fof-best-answer.enabled-tags');
    expect(keys).toContain('fof-best-answer.allow_select_own_post');
    expect(keys).toContain('fof-best-answer.search.solution_search');
  });
});

import app from 'flarum/forum/app';
import { jest } from '@jest/globals';
import SolutionSearchSource from '@src/forum/components/SolutionSearchSource';
import { findByClassName, textContent } from '@helpers/vnode';

describe('SolutionSearchSource', () => {
  test('exposes includes, limit, and mutators', () => {
    const src = new SolutionSearchSource();
    expect(src.includes()).toEqual(['mostRelevantPost', 'bestAnswerPost', 'tags']);
    expect(src.limit()).toBe(3);
    expect(src.queryMutators()).toContain('is:solved');
  });

  test('builds queryString with mutators', () => {
    const src = new SolutionSearchSource();
    src.setQueryString('abc');
    expect(src.queryString).toBe('abc is:solved');
  });

  test('renders header and link items, and appends results', async () => {
    const src = new SolutionSearchSource();

    const discussion = (id: string, best = true, rel = true) => ({
      id: () => id,
      bestAnswerPost: () => (best ? ({ number: () => 5, contentPlain: () => 'best answer' } as any) : null),
      mostRelevantPost: () => (rel ? ({ contentPlain: () => 'relevant' } as any) : null),
      tags: () => [],
      title: () => 'Some Title',
    });

    (app.store as any).find = jest.fn(() => Promise.resolve([discussion('1'), discussion('2', false, true)]));

    await src.search('HELLO');

    const vnodes = src.view('hello') as any;
    // First is header li
    const header = vnodes[0];
    expect(header.selector).toBe('li');
    expect(header.attrs.className).toContain('Dropdown-header');
    expect(textContent(header)).toContain('translated:fof-best-answer.forum.search.discussions_solutions_heading');

    // Second is link li containing a LinkButton vnode
    const linkLi = vnodes[1];
    expect(linkLi.selector).toBe('li');
    const linkBtn = linkLi.children.find((c: any) => typeof c?.selector === 'function');
    expect(linkBtn).toBeTruthy();

    // The rest are result items (as component vnodes)
    const resultItems = vnodes.slice(2);
    expect(resultItems.length).toBe(2);
    expect(typeof resultItems[0].selector).toBe('function');
  });
});

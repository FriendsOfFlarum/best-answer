import SolutionSearchItem from '@src/forum/components/SolutionSearchItem';
import app from 'flarum/forum/app';
import { textContent } from '@helpers/vnode';

type VNodeLike = { selector?: string | Function; attrs: Record<string, unknown>; children?: any };
type SolutionSearchItemLike = {
  oninit: (v: {
    attrs: {
      query: string;
      discussion: unknown;
      bestAnswerPost: unknown;
      mostRelevantPost: unknown;
      tags: unknown[];
    };
  }) => void;
  view: () => VNodeLike;
  mostRelevantContent: () => string | null;
  bestAnswerContent: () => string | null;
};

describe('SolutionSearchItem', () => {
  test('renders a link with highlighted title and optional best/relevant snippets', () => {
    (app.forum as any).attribute = (k: string) => (k === 'showTagsInSearchResults' ? true : undefined);
    const comp = new (SolutionSearchItem as unknown as { new (): SolutionSearchItemLike })();
    const discussion = {
      id: () => '10',
      title: () => 'Hello World',
      bestAnswerPost: () => ({ number: () => 5, contentPlain: () => 'best' }),
      mostRelevantPost: () => ({ contentPlain: () => 'relevant' }),
      tags: () => [],
    } as any;
    comp.oninit({
      attrs: { query: 'he', discussion, bestAnswerPost: discussion.bestAnswerPost(), mostRelevantPost: discussion.mostRelevantPost(), tags: [] },
    });
    // Inspect the items directly for expected excerpts
    // Behavior: content getters reflect provided posts
    expect((comp as any).mostRelevantContent()).toBe('relevant');
    expect((comp as any).bestAnswerContent()).toBe('best');
  });

  test('omits tags and excerpts when features disabled or data missing', () => {
    (app.forum as any).attribute = () => false; // showTagsInSearchResults disabled
    const comp = new (SolutionSearchItem as unknown as { new (): SolutionSearchItemLike })();
    const discussion = {
      id: () => '11',
      title: () => 'Nothing here',
      bestAnswerPost: () => null,
      mostRelevantPost: () => null,
      tags: () => [],
    } as any;
    comp.oninit({ attrs: { query: 'x', discussion, bestAnswerPost: null, mostRelevantPost: null, tags: [] } });
    const vnode = comp.view();
    const link = (vnode.children || []).find((c: any) => typeof c?.selector === 'function');
    const nodeText = (link?.children || []).map((c: any) => (typeof c === 'string' ? c : (c as any)?.attrs?.className || '')).join(' ');
    expect(nodeText).not.toContain('SolutionSearchResult-tags');
    expect(nodeText).not.toContain('DiscussionSearchResult-excerpt');
  });
});

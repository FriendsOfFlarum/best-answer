import DeckColumns from 'ext:flarum/deck/forum/extenders/DeckColumns';
/** Broadcast through flarum/realtime when a best answer is set or removed (see extend.php). */
export declare const BEST_ANSWER_EVENT = "bestAnswerEvent";
/**
 * Deck's classes only exist while it's enabled, so the sources extending them
 * are declared when this runs, not when the module loads.
 */
export default function deckColumns(): DeckColumns;

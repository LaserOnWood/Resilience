export type Category = 'hits' | 'body-zone' | 'accessory';
export interface Card { id: string; name: string; category: Category; description: string; image: string; value: number | string; }
export interface TokenPhrase { id: string; text: string; }
export interface Draw { id: string; createdAt: string; cards: [Card, Card, Card]; token: TokenPhrase; }

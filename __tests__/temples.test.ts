import { describe, it, expect } from 'vitest';
import {
  temples,
  engineerComments,
  chooseRandomTemple,
  chooseRandomComment,
} from '../lib/temples';

describe('temples.ts', () => {
  describe('temples array', () => {
    it('temples 配列に要素が含まれていること', () => {
      expect(temples.length).toBeGreaterThan(0);
    });

    it('すべての temple が name と area を持っていること', () => {
      temples.forEach((temple) => {
        expect(temple).toHaveProperty('name');
        expect(temple).toHaveProperty('area');
        expect(typeof temple.name).toBe('string');
        expect(typeof temple.area).toBe('string');
        expect(temple.name.length).toBeGreaterThan(0);
        expect(temple.area.length).toBeGreaterThan(0);
      });
    });

    it('すべての temple の area が "京都" であること', () => {
      temples.forEach((temple) => {
        expect(temple.area).toBe('京都');
      });
    });

    it('temple の数が405以上であること', () => {
      expect(temples.length).toBeGreaterThanOrEqual(405);
    });
  });

  describe('engineerComments array', () => {
    it('engineerComments 配列に要素が含まれていること', () => {
      expect(engineerComments.length).toBeGreaterThan(0);
    });

    it('すべてのコメントが文字列であること', () => {
      engineerComments.forEach((comment) => {
        expect(typeof comment).toBe('string');
        expect(comment.length).toBeGreaterThan(0);
      });
    });

    it('engineerComments に50個以上のコメントが含まれていること', () => {
      expect(engineerComments.length).toBeGreaterThanOrEqual(50);
    });
  });

  describe('chooseRandomTemple()', () => {
    it('関数がテンプル オブジェクトを返すこと', () => {
      const temple = chooseRandomTemple();
      expect(temple).toHaveProperty('name');
      expect(temple).toHaveProperty('area');
    });

    it('返されたテンプルが temples 配列に含まれていること', () => {
      for (let i = 0; i < 100; i++) {
        const temple = chooseRandomTemple();
        expect(temples).toContainEqual(temple);
      }
    });

    it('複数回呼び出した場合、異なる結果が返される可能性があること', () => {
      const results = new Set<string>();
      for (let i = 0; i < 50; i++) {
        const temple = chooseRandomTemple();
        results.add(temple.name);
      }
      // ランダムなので、50回中複数の異なるテンプルが選ばれることを期待
      expect(results.size).toBeGreaterThan(1);
    });
  });

  describe('chooseRandomComment()', () => {
    it('関数が文字列を返すこと', () => {
      const comment = chooseRandomComment();
      expect(typeof comment).toBe('string');
      expect(comment.length).toBeGreaterThan(0);
    });

    it('返されたコメントが engineerComments 配列に含まれていること', () => {
      for (let i = 0; i < 100; i++) {
        const comment = chooseRandomComment();
        expect(engineerComments).toContain(comment);
      }
    });

    it('複数回呼び出した場合、異なるコメントが返される可能性があること', () => {
      const results = new Set<string>();
      for (let i = 0; i < 50; i++) {
        const comment = chooseRandomComment();
        results.add(comment);
      }
      // ランダムなので、50回中複数の異なるコメントが選ばれることを期待
      expect(results.size).toBeGreaterThan(1);
    });
  });
});

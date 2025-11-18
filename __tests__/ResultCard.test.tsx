import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResultCard from '../components/ResultCard';
import { Temple } from '../lib/temples';

describe('ResultCard component', () => {
  const mockTemple: Temple = {
    name: '清水寺',
    area: '京都',
  };

  const mockComment = 'テストコメント';

  it('コンポーネントが正しくレンダリングされること', () => {
    const { container } = render(
      <ResultCard temple={mockTemple} comment={mockComment} />
    );
    expect(container).toBeTruthy();
  });

  it('神社の名前が表示されること', () => {
    render(<ResultCard temple={mockTemple} comment={mockComment} />);
    expect(screen.getByText('清水寺')).toBeInTheDocument();
  });

  it('神社のエリア情報が表示されること', () => {
    render(<ResultCard temple={mockTemple} comment={mockComment} />);
    expect(screen.getByText('（京都）')).toBeInTheDocument();
  });

  it('コメントが表示されること', () => {
    render(<ResultCard temple={mockTemple} comment={mockComment} />);
    expect(screen.getByText('テストコメント')).toBeInTheDocument();
  });

  it('正しい ID を持つ div が含まれること', () => {
    const { container } = render(
      <ResultCard temple={mockTemple} comment={mockComment} />
    );
    const resultCardElement = container.querySelector('#result-card');
    expect(resultCardElement).toBeTruthy();
  });

  it('タイトル「あなたの初詣先は…」が表示されること', () => {
    render(<ResultCard temple={mockTemple} comment={mockComment} />);
    expect(screen.getByText('あなたの初詣先は…')).toBeInTheDocument();
  });

  it('エンジニア運勢のラベルが表示されること', () => {
    render(<ResultCard temple={mockTemple} comment={mockComment} />);
    expect(screen.getByText('💻 エンジニア運勢')).toBeInTheDocument();
  });

  it('「AI初詣メーカー2026」のフッターが表示されること', () => {
    render(<ResultCard temple={mockTemple} comment={mockComment} />);
    expect(screen.getByText('AI初詣メーカー2026')).toBeInTheDocument();
  });

  it('異なるテンプルデータでも正しくレンダリングされること', () => {
    const anotherTemple: Temple = {
      name: '伏見稲荷大社',
      area: '京都',
    };
    const anotherComment = '別のコメント';

    render(<ResultCard temple={anotherTemple} comment={anotherComment} />);
    expect(screen.getByText('伏見稲荷大社')).toBeInTheDocument();
    expect(screen.getByText('別のコメント')).toBeInTheDocument();
  });

  it('長いコメントでも正しくレンダリングされること', () => {
    const longComment =
      'これは非常に長いコメントです。'.repeat(10);
    render(<ResultCard temple={mockTemple} comment={longComment} />);
    expect(screen.getByText(longComment)).toBeInTheDocument();
  });
});

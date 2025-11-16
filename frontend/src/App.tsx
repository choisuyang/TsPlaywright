import { useState } from 'react';

type ProductCheckResult = {
  productNo: string;
  ok: boolean;
  fields: {
    title: boolean;
    price: boolean;
  };
  values: {
    title: string | null;
    price: string | null;
  };
  errors: string[];
  screenshot?: string | null;
};

export default function App() {
  const [productNo, setProductNo] = useState('541076');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ProductCheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRun = async () => {
    if (!productNo) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`http://localhost:3001/api/check-product/${productNo}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || '에러 발생');
        return;
      }

      setResult(data);
    } catch (e: any) {
      setError(e?.message || '네트워크 에러');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <h2>상품 상세 검증</h2>

      {/* 입력 + 실행 버튼 영역 */}
      <div style={{ marginTop: 12, marginBottom: 16 }}>
        <input
          style={{ padding: '6px 10px', marginRight: 8 }}
          placeholder="상품번호 입력"
          value={productNo}
          onChange={(e) => setProductNo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleRun();
          }}
        />
        <button onClick={handleRun} disabled={loading} style={{ padding: '6px 12px' }}>
          {loading ? '검증 중...' : '실행'}
        </button>
      </div>

      {/* 👉 여기부터 실행 결과 표시 */}
      {error && (
        <div style={{ color: 'red', marginBottom: 8 }}>
          에러: {error}
        </div>
      )}

      {result && (
        <div style={{ marginTop: 8 }}>
          <div style={{ marginBottom: 8 }}>
            전체 결과:{' '}
            {result.ok ? (
              <span style={{ color: 'green', fontWeight: 'bold' }}>true (PASS)</span>
            ) : (
              <span style={{ color: 'red', fontWeight: 'bold' }}>false (FAIL)</span>
            )}
          </div>

          <ul style={{ marginTop: 4 }}>
            {/* 🔥 필드 PASS/FAIL */}
            <li>상품명: {String(result.fields.title)}</li>
            {/* 🔥 실제 값 노출 */}
            {result.values.title && (
              <div style={{ marginLeft: 20, color: '#555' }}>→ {result.values.title}</div>
            )}

            <li>가격: {String(result.fields.price)}</li>
            {result.values.price && (
              <div style={{ marginLeft: 20, color: '#555' }}>→ {result.values.price}</div>
            )}
          </ul>

          {/* 🔥 에러 리스트 */}
          {result.errors.length > 0 && (
            <>
              <div style={{ marginTop: 8 }}>에러/불일치 상세:</div>
              <ul>
                {result.errors.map((e, idx) => (
                  <li key={idx}>{e}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      {result?.screenshot && (
        <div style={{ marginTop: 16 }}>
          <div style={{ marginBottom: 4 }}>페이지 스크린샷</div>
          <img
            src={`data:image/png;base64,${result.screenshot}`}
            alt="상품 상세 페이지 스크린샷"
            style={{
              maxWidth: '100%',
              border: '1px solid #ddd',
              borderRadius: 4,
            }}
          />
        </div>
      )}
    </div>
  );
}

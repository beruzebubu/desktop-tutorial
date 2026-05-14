import { useState, useCallback, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `あなたはYOSUSKEの個人OS「Life Log AI Box」の判断エンジンです。
美容サロン経営者・個人投資家・クリエイターの写真を分析し、JSON形式のみで返答してください。
分類ルール:
- 一軍: 今月の判断に即必要（POS売上/シフト/給与/ホットペッパー/今月の経費レシート）
- 二軍: 後で確認が必要（投資スクリーンショット/材料発注/NISA/株/FX/月次レポート）
- 三軍: とりあえず保存（プライベート写真/日常/不明）
以下のJSON形式のみで返答（前置き・バッククォートなし）:
{
 "box": "一軍" | "二軍" | "三軍",
 "category": "カテゴリ名（給料計算/経費/投資/シフト/材料費/その他）",
 "title": "短いタイトル（20文字以内）",
 "comment": "ひと言コメント（40文字以内）",
 "amount": 推定金額（数字のみ、不明なら0）, 
 "amountType": "material" | "ad" | "fixed" | "invest" | "none",
 "riskScore": 0～10の整数（経営判断の緊急度）
};`;

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function analyzeImage(file, apiKey) {
  const base64 = await fileToBase64(file);
  const mediaType = file.type && file.type.startsWith("image/") ? file.type : "image/jpeg";

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: mediaType,
                data: base64,
              },
            },
            {
              type: "text",
              text: "この画像を判定してJSONのみで返してください。",
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Anthropic API error: ${response.status}`);
  }

  const data = await response.json();
  return data?.content?.[0]?.text ?? "";
}

export function useImageAnalyzer(apiKey) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const run = useCallback(
    async (file) => {
      setLoading(true);
      setError("");
      try {
        const text = await analyzeImage(file, apiKey);
        if (mountedRef.current) setResult(text);
      } catch (e) {
        if (mountedRef.current) setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        if (mountedRef.current) setLoading(false);
      }
    },
    [apiKey]
  );

  return { loading, result, error, run };
}

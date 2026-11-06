# A2O 知識庫問答

單頁 HTML 的知識庫問答機器人：內建檢索（RAG）、Groq 雲端模型串流回答。
使用者必須輸入自己的 **Groq API Key** 才能使用；Key 只存在瀏覽器 localStorage。

## 特色

- **單一 `index.html`**：零建置、零後端，GitHub Pages 直接部署
- **內建知識庫**：A2O 練習包 15 份文件（新人須知 2026/2024 版、報價流程、退換貨辦法、LX-350 產品母稿、客服 FAQ、客戶清單、展後名單、客戶意見、週會決議、週報、影子 AI 盤點、客訴個資、行銷 15 件事）全部內嵌
- **客戶端 RAG**：中文雙字元（bigram）＋英文字詞的 TF-IDF 評分檢索，取前 4 份文件注入提示詞，回答附「引用來源」
- **防幻覺守則**：只依知識庫回答、2024 版已停用以 2026 版為準、產品母稿【不可對外】數字不得出現、WRAS 只能說「目前未取得」、免費賠償類承諾需主管核准
- **串流輸出**：SSE 逐字顯示，可中途停止
- **質感 UI**：暖紙色編輯風設計、無陰影細線框、建議問題 chips、markdown 條列渲染

## 使用

1. 到 [console.groq.com/keys](https://console.groq.com/keys) 免費申請 API Key（`gsk_` 開頭）
2. 開啟頁面 → 貼上 Key → 儲存並開始
3. 直接發問，或點建議問題

> 金鑰僅存於你的瀏覽器 localStorage，呼叫 Groq 時由瀏覽器直接帶上，不經過任何第三方伺服器。
> 公開部署請使用個人金鑰並自行留意用量額度。

## 本機測試

```bash
node server.js     # 或任何靜態伺服器
# 開啟 http://localhost:5178
```

直接雙擊 index.html 也可以（fetch 透過 CORS 直連 Groq，不需本地伺服器）。

## 部署到 GitHub Pages

```bash
git init
git add .
git commit -m "A2O 知識庫問答 v1"
git branch -M main
git remote add origin https://github.com/<你的帳號>/a2o-knowledge-qa.git
git push -u origin main
```

再到 GitHub 倉庫 → Settings → Pages → Source 選 `main` / `(root)`，即可取得
`https://<你的帳號>.github.io/a2o-knowledge-qa/` 公開網址。

## 更新知識庫

編輯 `index.html` 內的 `const KB = [...]`：每份文件一個物件
`{ id, title, status, text }`。`status` 會影響檢索加權與版面標記
（`現行` 加權、`已停用` 降權並標紅、`參考` 中性）。

## 已知限制

- 檢索為關鍵字層級（非語意向量），極口語的問法可能命中年份不同的文件——系統提示詞已強制以 2026 版為準
- API Key 存在 localStorage；公開站台上請使用個人金鑰並自行控管額度
- 知識庫更新需改 HTML 重新部署

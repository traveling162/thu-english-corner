# 英語角成果展網站

## 檔案結構
```
index.html          首頁（大標題 + YouTube 影片 + 六場活動卡片）
activity.html        單一場活動的詳細頁面（照片牆 + 影片）
css/style.css         版面與樣式
js/data.js            ★ 你唯一需要常常編輯的檔案：影片連結、活動標題、照片路徑
js/script.js          網站邏輯（語言切換、渲染卡片，不太需要動）
images/activity-1/... 六個活動各自的照片資料夾
```

## 怎麼放照片
把照片放進對應資料夾，例如 `images/activity-1/1.jpg`、`images/activity-1/2.jpg`，
然後打開 `js/data.js`，在對應活動的 `photos` 陣列裡填上檔名：

```js
photos: [
  "images/activity-1/1.jpg",
  "images/activity-1/2.jpg",
  "images/activity-1/3.jpg"
],
cover: "images/activity-1/cover.jpg", // 首頁卡片顯示的封面照
```

沒放照片之前，卡片會顯示「放照片：xxx」的提示框，方便你知道還缺哪張。

## 怎麼放 YouTube 影片
把 YouTube 網址整個貼上即可（`watch?v=`、`youtu.be/` 都支援）：

```js
const HERO_VIDEO_URL = "https://www.youtube.com/watch?v=你的影片ID"; // 首頁主打影片

videoUrls: [
  "https://www.youtube.com/watch?v=另一支影片ID"
], // 該活動頁面顯示的影片，可以放多支
```

## 本機預覽
在這個資料夾內開一個簡單伺服器（直接用瀏覽器打開 index.html 也可以，
但為了讓 YouTube 內嵌正常運作，建議用伺服器方式）：

```bash
python3 -m http.server 8000
```
然後瀏覽器打開 http://localhost:8000

## 部署到 GitHub Pages（免費）
1. 在 GitHub 建一個新的 repository（例如 `english-corner`）
2. 把這整個資料夾的內容 push 上去
3. 到 repo 的 Settings → Pages，Source 選擇 `main` 分支、根目錄 `/`
4. 儲存後幾分鐘內會拿到網址，格式類似：
   `https://你的帳號.github.io/english-corner/`

## 之後想新增或修改活動
- 修改文字/連結：只需要編輯 `js/data.js`
- 想新增第七場活動：在 `ACTIVITIES` 陣列多加一個物件，並在 `images/` 底下
  新增一個資料夾放照片即可，首頁卡片牆會自動多長出一張卡。

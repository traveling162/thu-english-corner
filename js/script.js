// ================= Language toggle =================
function initLangToggle() {
  const btn = document.getElementById('langToggle');
  if (!btn) return;
  const saved = localStorage.getItem('ec-lang') || 'zh';
  setLang(saved);

  btn.addEventListener('click', () => {
    const current = document.documentElement.classList.contains('lang-en') ? 'en' : 'zh';
    setLang(current === 'zh' ? 'en' : 'zh');
  });

  function setLang(lang) {
    document.documentElement.classList.toggle('lang-en', lang === 'en');
    btn.textContent = lang === 'en' ? '中文' : 'EN';
    localStorage.setItem('ec-lang', lang);
  }
}
initLangToggle();

// ================= Homepage: hero video =================
function renderHeroVideo(container, url) {
  const id = getYouTubeId(url);
  if (!id) {
    container.innerHTML = '<p class="empty-note">請在 js/data.js 的 HERO_VIDEO_URL 填入 YouTube 連結</p>';
    return;
  }
  container.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}" title="Highlight video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
}

// ================= Homepage: stamp grid =================
function renderStampGrid(container, activities) {
  container.innerHTML = activities.map(a => `
    <a class="stamp-card" href="activity.html?id=${a.id}">
      <div class="stamp-photo">
        ${a.cover ? `<img src="${a.cover}" alt="${a.titleZh}" onerror="this.parentElement.innerHTML='<div class=&quot;no-photo&quot;>放照片：${a.cover}</div>'">` : `<div class="no-photo">放照片：${a.cover}</div>`}
      </div>
      <div class="stamp-meta">
        <span>${a.stamp}</span>
        <span>${a.date}</span>
      </div>
      <div class="stamp-title">
        <span class="zh" data-zh>${a.titleZh}</span>
        <span class="en" data-en>${a.titleEn}</span>
      </div>
    </a>
  `).join('');
}

// ================= Activity detail page =================
function renderActivityDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'), 10);
  const activity = ACTIVITIES.find(a => a.id === id);

  const header = document.getElementById('detailHeader');
  if (!activity) {
    header.innerHTML = `<h1>找不到這個活動 / Activity not found</h1>`;
    return;
  }

  header.innerHTML = `
    <span class="eyebrow">${activity.stamp} · ${activity.date}</span>
    <h1><span data-zh>${activity.titleZh}</span><span data-en>${activity.titleEn}</span></h1>
    <p class="detail-desc">
      <span data-zh>${activity.descZh}</span>
      <span data-en>${activity.descEn}</span>
    </p>
  `;
  document.title = activity.titleZh + ' | English Corner';

  // Photo gallery
  const gallery = document.getElementById('gallery');
  const galleryEmpty = document.getElementById('galleryEmpty');
  if (activity.photos && activity.photos.length) {
    gallery.innerHTML = activity.photos.map(src => `
      <figure><img src="${src}" alt="${activity.titleZh}" loading="lazy"
        onerror="this.closest('figure').remove()"></figure>
    `).join('');
  } else {
    galleryEmpty.innerHTML = `<p class="empty-note">尚未加入照片，請把照片放進 images/activity-${activity.id}/ 資料夾，並在 data.js 的 photos 陣列中列出檔名。</p>`;
  }

  // Videos
  const videoList = document.getElementById('videoList');
  const videoHeading = document.getElementById('videoHeading');
  if (activity.videoUrls && activity.videoUrls.length) {
    videoHeading.style.display = '';
    videoList.innerHTML = activity.videoUrls.map(url => {
      const vid = getYouTubeId(url);
      if (!vid) return '';
      return `<div class="postcard-video">
        <iframe src="https://www.youtube.com/embed/${vid}" title="${activity.titleZh}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>`;
    }).join('');
  }
}

const communityAreas = ["都城市", "曽於市", "三股町"];

const jobs = [
  {
    title: "カフェのランチスタッフ",
    company: "まちなかカフェ ao",
    area: "都城市中町",
    pay: "時給 1,050円〜",
    tags: ["週2日OK", "未経験歓迎", "主婦・学生歓迎"],
  },
  {
    title: "道の駅の販売サポート",
    company: "そおマーケット",
    area: "曽於市末吉町",
    pay: "時給 1,100円〜",
    tags: ["午前のみ", "車通勤OK", "地域密着"],
  },
  {
    title: "住宅会社の事務スタッフ",
    company: "みまた住まいサポート",
    area: "三股町樺山",
    pay: "月給 18万円〜",
    tags: ["正社員", "残業少なめ", "PC入力"],
  },
];

const quizSteps = [
  {
    step: "01",
    question: "希望の働き方は？",
    options: ["正社員", "アルバイト・パート", "副業・短時間", "未経験から挑戦"],
  },
  {
    step: "02",
    question: "働きたいエリアは？",
    options: ["都城市", "曽於市", "三股町", "どこでもOK"],
  },
  {
    step: "03",
    question: "いつから働きたい？",
    options: ["すぐ", "1ヶ月以内", "3ヶ月以内", "相談したい"],
  },
];

const instagramIdeas = [
  "求人カードを投稿・リールで紹介",
  "プロフィールURLからこのサイトへ誘導",
  "DM相談・応募前質問を受け付け",
];

export default function HomePage() {
  return (
    <div className="local-job-home">
      <section className="local-hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="service-badge">都城・曽於・三股限定</p>
          <h1 id="hero-title">地元で働きたい人と、お店・会社をつなぐ求人コミュニティ</h1>
          <p className="hero-lead">
            Instagramからすぐ開ける、スマホ特化の地域求人サイト。短い質問に答えるだけで、希望に近い求人へ案内します。
          </p>
          <div className="hero-actions" aria-label="主要アクション">
            <a href="#quick-match" className="primary-action">15秒で求人を探す</a>
            <a href="https://www.instagram.com/" className="secondary-action">Instagram連携を見る</a>
          </div>
        </div>
        <div className="phone-preview" aria-label="スマホ画面のプレビュー">
          <div className="phone-top">21:20</div>
          <div className="preview-card">
            <span>AREA</span>
            <strong>都城・曽於・三股</strong>
            <p>地元求人だけを毎日更新</p>
          </div>
          <div className="preview-question">
            <p>ご希望の働き方は？</p>
            <div>正社員</div>
            <div>アルバイト・パート</div>
          </div>
        </div>
      </section>

      <section className="area-strip" aria-label="対象エリア">
        {communityAreas.map((area) => <span key={area}>{area}</span>)}
      </section>

      <section className="quick-match" id="quick-match" aria-labelledby="match-title">
        <div className="section-heading local-heading">
          <p>Quick match</p>
          <h2 id="match-title">簡単15秒で希望の求人情報を見る</h2>
        </div>
        <div className="quiz-grid">
          {quizSteps.map((quiz) => (
            <article className="quiz-card" key={quiz.step}>
              <span className="step-number">STEP {quiz.step}</span>
              <h3>{quiz.question}</h3>
              <div className="option-grid">
                {quiz.options.map((option) => <button type="button" key={option}>{option}</button>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section local-section" aria-labelledby="jobs-title">
        <div className="section-heading local-heading">
          <p>New jobs</p>
          <h2 id="jobs-title">地元の新着求人</h2>
        </div>
        <div className="job-card-list">
          {jobs.map((job) => (
            <article className="job-card local-job-card" key={`${job.company}-${job.title}`}>
              <div>
                <p className="job-company">{job.company}</p>
                <h3>{job.title}</h3>
              </div>
              <p className="job-meta">{job.area}</p>
              <p className="job-salary">{job.pay}</p>
              <div className="job-tags">
                {job.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <a href="#quick-match" className="card-link">希望条件を入力して応募相談</a>
            </article>
          ))}
        </div>
      </section>

      <section className="instagram-panel" aria-labelledby="instagram-title">
        <div>
          <p className="service-badge">Instagram導線</p>
          <h2 id="instagram-title">インスタ投稿から求人サイトへ、そのまま応募相談へ</h2>
          <p>
            投稿・ストーリーズ・プロフィールURLをこのサイトに接続。地域の人が見慣れたInstagramから、求人検索と問い合わせまで迷わず進めます。
          </p>
        </div>
        <ul>
          {instagramIdeas.map((idea) => <li key={idea}>{idea}</li>)}
        </ul>
      </section>
    </div>
  );
}

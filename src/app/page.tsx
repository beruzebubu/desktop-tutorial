const popularKeywords = ["事務", "未経験歓迎", "在宅ワーク", "正社員", "週2日", "カフェ", "軽作業", "エンジニア"];

const newJobs = [
  {
    title: "一般事務スタッフ",
    company: "みやこのじょうワークス株式会社",
    location: "宮崎県 都城市",
    salary: "時給 1,150円〜1,350円",
    tags: ["未経験歓迎", "土日祝休み"],
  },
  {
    title: "倉庫内ピッキング・梱包",
    company: "南九州ロジスティクス",
    location: "鹿児島県 曽於市",
    salary: "月給 21万円〜26万円",
    tags: ["車通勤OK", "日勤のみ"],
  },
  {
    title: "カフェホールスタッフ",
    company: "Cafe Blue Leaf",
    location: "宮崎県 北諸県郡三股町",
    salary: "時給 1,050円〜",
    tags: ["週2日から", "扶養内OK"],
  },
];

const workStyles = [
  { title: "正社員", description: "安定して長く働ける求人を探す" },
  { title: "アルバイト・パート", description: "時間や曜日に合わせて働く" },
  { title: "在宅・リモート", description: "場所に縛られない働き方を選ぶ" },
  { title: "未経験歓迎", description: "新しい職種にチャレンジする" },
];

export default function HomePage() {
  return (
    <div className="job-home">
      <section className="job-hero" aria-labelledby="hero-title">
        <p className="service-name">しごと検索</p>
        <h1 id="hero-title">あなたに合った仕事を、すぐに見つけよう</h1>
        <p className="hero-lead">地域の求人からリモートワークまで、希望条件に合う仕事をまとめて検索できます。</p>
        <form className="job-search" action="#">
          <label>
            <span>キーワード</span>
            <input type="search" name="keyword" placeholder="職種、会社名、キーワード" />
          </label>
          <label>
            <span>勤務地</span>
            <input type="text" name="location" placeholder="市区町村、駅名、在宅など" />
          </label>
          <button type="submit">求人を検索</button>
        </form>
      </section>

      <section className="landing-section" aria-labelledby="popular-title">
        <div className="section-heading">
          <p>Popular searches</p>
          <h2 id="popular-title">人気検索キーワード</h2>
        </div>
        <div className="keyword-list">
          {popularKeywords.map((keyword) => (
            <a href="#" key={keyword} className="keyword-chip">{keyword}</a>
          ))}
        </div>
      </section>

      <section className="landing-section" aria-labelledby="new-jobs-title">
        <div className="section-heading">
          <p>New jobs</p>
          <h2 id="new-jobs-title">新着求人カード一覧</h2>
        </div>
        <div className="job-card-list">
          {newJobs.map((job) => (
            <article className="job-card" key={`${job.company}-${job.title}`}>
              <div>
                <p className="job-company">{job.company}</p>
                <h3>{job.title}</h3>
              </div>
              <p className="job-meta">{job.location}</p>
              <p className="job-salary">{job.salary}</p>
              <div className="job-tags">
                {job.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section" aria-labelledby="work-style-title">
        <div className="section-heading">
          <p>Work style</p>
          <h2 id="work-style-title">働き方カテゴリ</h2>
        </div>
        <div className="work-style-grid">
          {workStyles.map((style) => (
            <a href="#" className="work-style-card" key={style.title}>
              <h3>{style.title}</h3>
              <p>{style.description}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="jobseeker-cta" aria-labelledby="cta-title">
        <div>
          <p className="service-name">For job seekers</p>
          <h2 id="cta-title">プロフィールを登録して、スカウトを受け取りましょう</h2>
          <p>希望条件や経験を登録すると、あなたに興味を持った企業から直接連絡が届きます。</p>
        </div>
        <a href="#" className="cta-button">無料で登録する</a>
      </section>
    </div>
  );
}

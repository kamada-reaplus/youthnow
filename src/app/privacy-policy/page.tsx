import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー（個人情報保護方針）| Youth Now!",
  description:
    "株式会社Reaplusのプライバシーポリシー（個人情報保護方針）。個人情報の取得方法、利用目的、安全管理措置などについて説明します。",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-neutral-white">
      {/* ヘッダーのスペース確保 */}
      <div className="h-20"></div>

      <main className="container mx-auto max-w-4xl px-lg py-2xl">
        {/* タイトル */}
        <h1 className="text-h2 text-neutral-black text-center mb-xl">
          プライバシーポリシー
          <br />
          （個人情報保護方針）
        </h1>

        {/* 導入文 */}
        <div className="text-body text-neutral-black mb-2xl leading-relaxed">
          <p>
            株式会社Reaplus（以下、「当社」という。）は，ユーザーの個人情報について以下のとおりプライバシーポリシー（以下、「本ポリシー」という。）を定めます。本ポリシーは、当社がどのような個人情報を取得し、どのように利用・共有するか、ユーザーがどのようにご自身の個人情報を管理できるかをご説明するものです。
          </p>
        </div>

        {/* セクション */}
        <div className="space-y-2xl">
          {/* 1. 事業者情報 */}
          <section>
            <h2 className="text-h4 text-brand-primary mb-lg border-b-2 border-brand-primary/20 pb-sm">
              1. 事業者情報
            </h2>
            <div className="text-body text-neutral-black space-y-xs">
              <p>法人名：株式会社Reaplus</p>
              <p>住所：東京都目黒区五本木2丁目13-2　1F</p>
              <p>代表者：松元 詞音</p>
            </div>
          </section>

          {/* 2. 個人情報の取得方法 */}
          <section>
            <h2 className="text-h4 text-brand-primary mb-lg border-b-2 border-brand-primary/20 pb-sm">
              2. 個人情報の取得方法
            </h2>
            <div className="text-body text-neutral-black space-y-md">
              <p>
                当社をユーザーが利用をするとき、氏名・生年月日・住所・電話番号・メールアドレスなど個人を特定できる情報を取得させていただきます。
              </p>
              <p>
                お問い合わせフォームやコメントの送信時には、氏名・電話番号・メールアドレスを取得させていただきます。
              </p>
            </div>
          </section>

          {/* 3. 個人情報の利用目的 */}
          <section>
            <h2 className="text-h4 text-brand-primary mb-lg border-b-2 border-brand-primary/20 pb-sm">
              3. 個人情報の利用目的
            </h2>
            <div className="text-body text-neutral-black space-y-md">
              <p>
                (1)
                ご本人から直接書面によって取得する個人情報(ホームページや電子メール等によるものを含む)の利用目的取得に先立ち、ご本人に対し書面により明示します。
              </p>
              <p>(2) 前項以外の方法によって取得する個人情報の利用目的</p>

              {/* 表 */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-brand-primary/30 bg-white">
                  <thead>
                    <tr className="bg-brand-primary/10">
                      <th className="border border-brand-primary/30 px-lg py-md text-left text-body font-bold text-neutral-black">
                        分類
                      </th>
                      <th className="border border-brand-primary/30 px-lg py-md text-left text-body font-bold text-neutral-black">
                        利用目的
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-brand-primary/30 px-lg py-md text-body text-neutral-black">
                        個人のお客様情報
                      </td>
                      <td className="border border-brand-primary/30 px-lg py-md text-body text-neutral-black">
                        ご利用履歴管理のため
                        <br />
                        お問合せ対応のため
                      </td>
                    </tr>
                    <tr className="bg-neutral-white/50">
                      <td className="border border-brand-primary/30 px-lg py-md text-body text-neutral-black">
                        お取引先担当者様情報
                      </td>
                      <td className="border border-brand-primary/30 px-lg py-md text-body text-neutral-black">
                        発注内容確認のため（通信記録等）
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-brand-primary/30 px-lg py-md text-body text-neutral-black">
                        業務の受託に伴い、お客様からお預かりする個人情報
                      </td>
                      <td className="border border-brand-primary/30 px-lg py-md text-body text-neutral-black">
                        委託された当該業務を適切に遂行するため
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 4. 個人データを安全に管理するための措置 */}
          <section>
            <h2 className="text-h4 text-brand-primary mb-lg border-b-2 border-brand-primary/20 pb-sm">
              4. 個人データを安全に管理するための措置
            </h2>
            <p className="text-body text-neutral-black">
              当社は個人情報を正確かつ最新の内容に保つよう努め、不正なアクセス・改ざん・漏えい・滅失及び毀損から保護するため全従業員及び役員に対して教育研修を実施しています。また、個人情報保護規程を設け、現場での管理についても定期的に点検を行っています。
            </p>
          </section>

          {/* 5. 個人データの共同利用 */}
          <section>
            <h2 className="text-h4 text-brand-primary mb-lg border-b-2 border-brand-primary/20 pb-sm">
              5. 個人データの共同利用
            </h2>
            <div className="text-body text-neutral-black space-y-sm">
              <p>当社は、以下のとおり共同利用を行います。</p>
              <ul className="list-none space-y-xs pl-lg">
                <li>
                  <strong>個人データの管理に関する責任者</strong>
                  <br />
                  株式会社Reaplus
                </li>
                <li>
                  <strong>共同して利用する者の利用目的</strong>
                  <br />
                  上記「利用目的」の内容と同様。
                </li>
                <li>
                  <strong>利用項目</strong>
                  <br />
                  氏名、住所、電話番号、メールアドレス
                </li>
                <li>
                  <strong>共同して利用する者の範囲</strong>
                  <br />
                  当社企業グループを構成する企業
                </li>
              </ul>
            </div>
          </section>

          {/* 6. 個人データの第三者提供について */}
          <section>
            <h2 className="text-h4 text-brand-primary mb-lg border-b-2 border-brand-primary/20 pb-sm">
              6. 個人データの第三者提供について
            </h2>
            <p className="text-body text-neutral-black">
              当社は法令及びガイドラインに別段の定めがある場合を除き、同意を得ないで第三者に個人情報を提供することは致しません。
            </p>
          </section>

          {/* 7. 保有個人データの開示、訂正 */}
          <section>
            <h2 className="text-h4 text-brand-primary mb-lg border-b-2 border-brand-primary/20 pb-sm">
              7. 保有個人データの開示、訂正
            </h2>
            <div className="text-body text-neutral-black space-y-md">
              <p>
                当社は本人から個人情報の開示を求められたときには、遅滞なく本人に対しこれを開示します。個人情報の利用目的の通知や訂正、追加、削除、利用の停止、第三者への提供の停止を希望される方は以下の手順でご請求ください。
              </p>
              <div className="bg-neutral-light-cyan/30 border border-brand-primary/20 rounded-lg p-lg space-y-xs">
                <p>
                  <strong>送付先住所</strong>
                </p>
                <p>
                  〒153-0053
                  <br />
                  東京都目黒区五本木2丁目13-2　1F
                  <br />
                  株式会社Reaplus　お問い合わせ窓口
                </p>
                <p className="text-body-sm">
                  受付時間：11:00～19:00(土・日曜日、年末年始、ゴールデンウィークを除く)
                </p>
              </div>
            </div>
          </section>

          {/* 8. 個人情報取り扱いに関する相談や苦情の連絡先 */}
          <section>
            <h2 className="text-h4 text-brand-primary mb-lg border-b-2 border-brand-primary/20 pb-sm">
              8. 個人情報取り扱いに関する相談や苦情の連絡先
            </h2>
            <p className="text-body text-neutral-black">
              当社の個人情報の取り扱いに関するご質問やご不明点、苦情、その他のお問い合わせはお問い合わせフォームよりご連絡ください。
            </p>
          </section>

          {/* 9. SSL */}
          <section>
            <h2 className="text-h4 text-brand-primary mb-lg border-b-2 border-brand-primary/20 pb-sm">
              9. SSL（Secure Socket Layer）について
            </h2>
            <p className="text-body text-neutral-black">
              当社のWebサイトはSSLに対応しており、WebブラウザとWebサーバーとの通信を暗号化しています。ユーザーが入力する氏名や住所、電話番号などの個人情報は自動的に暗号化されます。
            </p>
          </section>

          {/* 10. cookie */}
          <section>
            <h2 className="text-h4 text-brand-primary mb-lg border-b-2 border-brand-primary/20 pb-sm">
              10. cookieについて
            </h2>
            <div className="text-body text-neutral-black space-y-md">
              <p>
                cookieとは、WebサーバーからWebブラウザに送信されるデータのことです。Webサーバーがcookieを参照することでユーザーのパソコンを識別でき、効率的に当社Webサイトを利用することができます。当社Webサイトがcookieとして送るファイルは、個人を特定するような情報は含んでおりません。
              </p>
              <p>
                お使いのWebブラウザの設定により、cookieを無効にすることも可能です。
              </p>
            </div>
          </section>

          {/* 11. 免責事項 */}
          <section>
            <h2 className="text-h4 text-brand-primary mb-lg border-b-2 border-brand-primary/20 pb-sm">
              11. 免責事項
            </h2>
            <div className="text-body text-neutral-black space-y-md">
              <p>
                当社Webサイトに掲載されている情報の正確性には万全を期していますが、利用者が当社Webサイトの情報を用いて行う一切の行為に関して、一切の責任を負わないものとします。
              </p>
              <p>
                当社は、利用者が当社Webサイトを利用したことにより生じた利用者の損害及び利用者が第三者に与えた損害に関して、一切の責任を負わないものとします。
              </p>
            </div>
          </section>

          {/* 12. 著作権・肖像権 */}
          <section>
            <h2 className="text-h4 text-brand-primary mb-lg border-b-2 border-brand-primary/20 pb-sm">
              12. 著作権・肖像権
            </h2>
            <p className="text-body text-neutral-black">
              当社Webサイト内の文章や画像、すべてのコンテンツは著作権・肖像権等により保護されています。無断での使用や転用は禁止されています。
            </p>
          </section>

          {/* 13. リンク */}
          <section>
            <h2 className="text-h4 text-brand-primary mb-lg border-b-2 border-brand-primary/20 pb-sm">
              13. リンク
            </h2>
            <p className="text-body text-neutral-black">
              当社Webサイトへのリンクは、自由に設置していただいて構いません。ただし、Webサイトの内容等によってはリンクの設置をお断りすることがあります。
            </p>
          </section>

          {/* 14. アクセス解析ツール */}
          <section>
            <h2 className="text-h4 text-brand-primary mb-lg border-b-2 border-brand-primary/20 pb-sm">
              14. アクセス解析ツール
            </h2>
            <div className="text-body text-neutral-black space-y-md">
              <p>
                当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
              </p>
              <p>
                この規約に関して、詳しくは
                <a
                  href="https://marketingplatform.google.com/about/analytics/terms/jp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary underline hover:text-brand-secondary transition-colors"
                >
                  「Googleアナリティクス規約」
                </a>
                をご覧ください。
              </p>
            </div>
          </section>

          {/* 15. 広告について */}
          <section>
            <h2 className="text-h4 text-brand-primary mb-lg border-b-2 border-brand-primary/20 pb-sm">
              15. 広告について
            </h2>
            <div className="text-body text-neutral-black space-y-md">
              <p>
                当サイトでは、第三者配信の広告サービス（Google
                AdSense、infotop、impact）を利用しており、ユーザーの興味に応じた商品やサービスの広告を表示するため、クッキー(Cookie)を使用しております。
              </p>
              <p>
                クッキーを使用することで当サイトはお客様のコンピュータを識別できるようになりますが、お客様個人を特定できるものではありません。
              </p>
              <p>
                Cookie を無効にする方法や Google
                アドセンスに関する詳細は
                <a
                  href="https://policies.google.com/technologies/ads?hl=ja"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary underline hover:text-brand-secondary transition-colors"
                >
                  「広告 – ポリシーと規約 – Google」
                </a>
                をご確認ください。
              </p>
            </div>
          </section>
        </div>

        {/* 制定日 */}
        <div className="mt-2xl pt-xl border-t-2 border-brand-primary/20">
          <div className="text-body text-neutral-black text-center space-y-xs">
            <p>以上</p>
            <p className="mt-lg">制定年月日　2023年7月20日</p>
            <p>最終改正年月日　2023年7月20日</p>
            <p className="mt-md font-bold">株式会社Reaplus</p>
            <p>代表取締役 松元　詞音</p>
          </div>
        </div>
      </main>
    </div>
  );
}

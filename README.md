# kaku-tail mail

Google App Script を使って、Google フォームに来た参加表明をもとに、スプレッドシートの最終行を見て通し番号を割り振り、メールを送信します。
また、ついでにDiscordに通知を行います。

## how to use

1. nodejs, yarn をインストールし `yarn` を実行します。
2. `config.sample.yml` を `config.yml` に変更して、内容を修正します。
3. `yarn run build` を実行してビルド済みファイルを作成します。
4. `./build/index.js` をGASに書き込みます。
5. `execute` を割り当てます。
6. 相当する列の1行目を `0` にします。

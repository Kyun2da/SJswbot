const puppeteer = require('puppeteer');

require('dotenv').config();

const ID = process.env.KAKAO_ID;
const PW = process.env.KAKAO_PW;
const loginURL = 'https://accounts.kakao.com/login/kakaobusiness?continue=https://i.kakao.com/';

const knowledgePlusURL = 'https://i.kakao.com/openbuilder/bot/5ef87cc02ca48c0001201fb5/knowledge';
const deployURL = 'https://i.kakao.com/openbuilder/bot/5ef87cc02ca48c0001201fb5/publish';

const enrolltoKakaoKnowledgePlus = async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  });
  // 로그인창 접속
  await page.goto(loginURL, { waitUntil: 'networkidle0' });
  // 아이디 입력
  await page.type('#id_email_2', ID);
  // 비밀번호 입력
  await page.type('#id_password_3', PW);
  // 로그인 후에 페이지 네비게이션 기다리기
  await Promise.all([
    page.click('.btn_g.btn_confirm.submit'),
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
  ]);
  // 지식 + 페이지 이동
  await page.goto(knowledgePlusURL, { waitUntil: 'networkidle0' });
  // 동기화 버튼 클릭
  await page.click('.ico_bot.ico_check');
  // 저장 버튼 클릭 후 페이지 네비게이션 기다리기
  await page.click('#mArticle > div > div > knowledge-header > div > button');
  await page.waitForTimeout(20000);
  // 배포 사이트로 이동
  await page.goto(deployURL, { waitUntil: 'networkidle0' });
  // 배포 텍스트 입력
  await page.type('#tfDeploy', '지식+ 자동화 업데이트2');
  // 배포 버튼 클릭
  await page.click('#mArticle > div > div > app-publish > div:nth-child(1) > div > div > button');
  await page.waitForTimeout(1000);
  await page.click(
    '#mat-dialog-0 > publish-confirm-dialog > div > div.layer_foot > div > button.btn_g.btn_g2',
  );
  await page.waitForTimeout(10000);
  await browser.close();
};

module.exports = {
  enrolltoKakaoKnowledgePlus,
};

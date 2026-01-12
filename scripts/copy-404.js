import { copyFileSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const distPath = join(__dirname, '..', 'dist');
const indexHtml = join(distPath, 'index.html');
const notFoundHtml = join(distPath, '404.html');

if (existsSync(indexHtml)) {
  copyFileSync(indexHtml, notFoundHtml);
  console.log('✅ 404.html 파일이 생성되었습니다.');
} else {
  console.error('❌ dist/index.html 파일을 찾을 수 없습니다. 먼저 빌드를 실행하세요.');
  process.exit(1);
}

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, 'src', 'assets');
const files = fs.readdirSync(dir);

async function optimizeImages() {
  for (const file of files) {
    if (file.endsWith('.jpg') || file.endsWith('.png')) {
      const filePath = path.join(dir, file);
      const tempPath = path.join(dir, 'temp_' + file);
      
      const stat = fs.statSync(filePath);
      
      try {
        if (file.endsWith('.jpg')) {
          await sharp(filePath)
            .resize({ width: 1920, withoutEnlargement: true })
            .jpeg({ quality: 75, mozjpeg: true })
            .toFile(tempPath);
        } else if (file.endsWith('.png')) {
          await sharp(filePath)
            .resize({ width: 1920, withoutEnlargement: true })
            .png({ quality: 80, compressionLevel: 8 })
            .toFile(tempPath);
        }
        
        const newStat = fs.statSync(tempPath);
        if (newStat.size < stat.size) {
            fs.renameSync(tempPath, filePath);
            console.log(`Optimized ${file}: ${(stat.size/1024/1024).toFixed(2)}MB -> ${(newStat.size/1024/1024).toFixed(2)}MB`);
        } else {
            fs.unlinkSync(tempPath);
            console.log(`Skipped ${file} (no size improvement)`);
        }
      } catch (err) {
        console.error(`Error optimizing ${file}:`, err);
      }
    }
  }
}

optimizeImages();

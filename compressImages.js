import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

// 目标目录
const activityDir = path.join('src', 'assets', 'team')
const maxSizeKB = 500
const maxSizeBytes = maxSizeKB * 1024

// 获取目录中的所有图片文件
async function getImageFiles(dir) {
  try {
    const files = await fs.promises.readdir(dir)
    // 过滤出常见的图片格式
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif']
    return files.filter((file) => imageExtensions.some((ext) => file.toLowerCase().endsWith(ext)))
  } catch (error) {
    console.error('读取目录失败:', error)
    return []
  }
}

// 获取文件大小
async function getFileSize(filePath) {
  try {
    const stats = await fs.promises.stat(filePath)
    return stats.size
  } catch (error) {
    console.error(`获取文件大小失败 ${filePath}:`, error)
    return 0
  }
}

// 压缩图片
async function compressImage(inputPath, outputPath, targetSizeBytes) {
  try {
    // 先获取原始图片大小
    const originalSize = await getFileSize(inputPath)
    console.log(`原始图片 ${inputPath} 大小: ${(originalSize / 1024).toFixed(2)}KB`)

    // 如果已经小于目标大小，不需要压缩
    if (originalSize <= targetSizeBytes) {
      console.log(`图片 ${inputPath} 已经小于 ${maxSizeKB}KB，不需要压缩`)
      return false
    }

    // 使用sharp压缩图片
    // 先获取图片信息
    let imageInfo
    try {
      imageInfo = await sharp(inputPath).metadata()
    } catch (err) {
      console.error(`获取图片信息失败 ${inputPath}:`, err)
      return false
    }

    // 创建一个临时文件用于测试压缩
    const tempPath = path.join(path.dirname(inputPath), `temp_${path.basename(inputPath)}`)

    // 首先尝试通过降低质量压缩
    let quality = 80 // 初始质量设置
    let compressedSize = originalSize
    let attempts = 0
    const maxAttempts = 10

    // 根据文件扩展名选择合适的输出格式
    const isPNG = inputPath.toLowerCase().endsWith('.png')

    // 循环调整质量直到达到目标大小或尝试次数上限
    while (compressedSize > targetSizeBytes && attempts < maxAttempts) {
      attempts++

      try {
        if (isPNG) {
          // PNG压缩
          await sharp(inputPath)
            .png({ quality: Math.max(quality, 1) })
            .toFile(tempPath)
        } else {
          // JPG压缩
          await sharp(inputPath)
            .jpeg({ quality: Math.max(quality, 1) })
            .toFile(tempPath)
        }

        // 获取压缩后的大小
        compressedSize = await getFileSize(tempPath)

        // 如果还没达到目标大小，降低质量
        if (compressedSize > targetSizeBytes) {
          quality -= 5 // 每次降低5%
          console.log(`尝试质量 ${quality}%，压缩后大小: ${(compressedSize / 1024).toFixed(2)}KB`)
        }
      } catch (err) {
        console.error(`压缩图片 ${inputPath} 失败:`, err)
        break
      }
    }

    // 如果降低质量后仍未达到目标大小，尝试调整分辨率
    if (compressedSize > targetSizeBytes && imageInfo.width && imageInfo.height) {
      console.log(`尝试调整分辨率...`)

      // 计算需要缩小的比例
      // 假设文件大小与分辨率的平方成正比
      const sizeRatio = Math.sqrt(targetSizeBytes / compressedSize)
      const newWidth = Math.floor(imageInfo.width * sizeRatio * 0.9) // 额外缩小10%以确保达到目标大小
      const newHeight = Math.floor(imageInfo.height * sizeRatio * 0.9)

      console.log(`调整分辨率: ${imageInfo.width}x${imageInfo.height} -> ${newWidth}x${newHeight}`)

      try {
        if (isPNG) {
          await sharp(inputPath)
            .resize(newWidth, newHeight, { fit: 'inside' })
            .png({ quality: Math.max(quality, 1) })
            .toFile(tempPath)
        } else {
          await sharp(inputPath)
            .resize(newWidth, newHeight, { fit: 'inside' })
            .jpeg({ quality: Math.max(quality, 1) })
            .toFile(tempPath)
        }

        // 获取调整分辨率后的大小
        compressedSize = await getFileSize(tempPath)
        console.log(`调整分辨率后大小: ${(compressedSize / 1024).toFixed(2)}KB`)
      } catch (err) {
        console.error(`调整分辨率失败 ${inputPath}:`, err)
      }
    }

    // 如果压缩成功，将临时文件重命名为原文件名
    if (compressedSize <= targetSizeBytes) {
      // 删除原文件
      await fs.promises.unlink(inputPath)
      // 重命名临时文件
      await fs.promises.rename(tempPath, inputPath)
      console.log(`图片 ${inputPath} 压缩成功！新大小: ${(compressedSize / 1024).toFixed(2)}KB`)
      return true
    } else {
      // 压缩失败，删除临时文件
      if (fs.existsSync(tempPath)) {
        await fs.promises.unlink(tempPath)
      }
      console.log(`图片 ${inputPath} 压缩失败，即使尝试了降低质量和调整分辨率`)
      return false
    }
  } catch (error) {
    console.error(`压缩图片 ${inputPath} 时发生错误:`, error)
    return false
  }
}

// 主函数
async function main() {
  console.log('开始压缩activity目录下的图片...')

  try {
    const imageFiles = await getImageFiles(activityDir)
    console.log(`找到 ${imageFiles.length} 张图片需要处理`)

    let compressedCount = 0
    for (const file of imageFiles) {
      const filePath = path.join(activityDir, file)
      const success = await compressImage(filePath, filePath, maxSizeBytes)
      if (success) {
        compressedCount++
      }
    }

    console.log(`图片压缩完成！成功压缩了 ${compressedCount} 张图片`)
  } catch (error) {
    console.error('处理图片时发生错误:', error)
  }
}

// 执行主函数
main().catch(console.error)

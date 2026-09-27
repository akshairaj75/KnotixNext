import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function storeFile(file: File, folder = 'products'): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Generate safe filename with UUID prefix matching Spring Boot FileStorageService
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const fileName = `${uuidv4()}_${sanitizedName}`;

  // Store in public/uploads/folder
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);
  await fs.mkdir(uploadDir, { recursive: true });

  const filePath = path.join(uploadDir, fileName);
  await fs.writeFile(filePath, buffer);

  // Return standard web path
  return `/uploads/${folder}/${fileName}`;
}

export async function deleteFile(fileUrl: string): Promise<void> {
  if (!fileUrl) return;

  try {
    const cleanPath = fileUrl.startsWith('/') ? fileUrl.substring(1) : fileUrl;
    const filePath = path.join(process.cwd(), 'public', cleanPath);
    await fs.unlink(filePath);
  } catch (error) {
    console.warn(`Could not delete file ${fileUrl}:`, error);
  }
}

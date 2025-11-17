import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname, join } from "path";

@Controller("upload")

export class UploadController {
    @Post("single")
    @UseInterceptors(
        FileInterceptor("file", {
            storage: diskStorage({
                destination: join(process.cwd(), 'uploads'),
                filename(req, file, cb) {
                    const uniqueSuffiex = file?.fieldname + "_" + Date.now()
                    const ext = extname(file.originalname)
                    cb(null, `${uniqueSuffiex}${ext}`)
                },
            })
        })
    )
    singleFileUpload(@UploadedFile() file: Express.Multer.File) {
        return {
            message: "Succuessfully uploaded!",
            upload_url: `http://localhost:3000/${file.filename}`
        }
    }

    @Post("multiple")
    @UseInterceptors(
        FilesInterceptor("files", 10, {
            storage: diskStorage({
                destination: join(process.cwd(), 'uploads'),
                filename(req, file, cb) {
                    const uniqueSuffiex = file?.fieldname + "_" + Date.now()
                    const ext = extname(file.originalname)
                    cb(null, `${uniqueSuffiex}${ext}`)
                },
            })
        })
    )
    multipleFileUpload(@UploadedFiles() files: Express.Multer.File[]) {
        let result: string[] = []
        for (let file of files) {
            result.push(`http://localhost:3000/uploads/${file.filename}`)
        }
        return {
            message: "Succuessfully uploaded!",
            upload_url: result
        }
    }
}